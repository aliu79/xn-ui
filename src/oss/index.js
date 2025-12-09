const OSS = require('ali-oss');
import $dayjs from '@/utils/dayjs';

class Client {
    constructor(params = {}) {
        this.uploadHost = null;
        this.stsUrl = params.stsUrl || '';
        this.setFileIdUrl = params.setFileIdUrl || '';
        this.oss = null;
    }

    getToken() {
        const _token = localStorage.getItem('xnToken');
        if (!_token) return '';

        try {
            return JSON.parse(_token);
        } catch (error) {
            return _token;
        }
    }

    getExt(file) {
        return file.name.split('.').pop().toLowerCase();
    }

    isImg(file) {
        return file.type.startsWith('image');
    }

    isAV(file) {
        return file.type.startsWith('audio') || file.type.startsWith('video');
    }

    generateFileName(originalName) {
        const random = Math.random().toString(36).substring(2, 8);
        const ext = this.getExt({ name: originalName });
        const nameWithoutExt = originalName.substring(0, originalName.lastIndexOf('.'));
        // 清理文件名中的特殊字符，保留中文、字母、数字、下划线和连字符
        const cleanName = nameWithoutExt.replace(/[^\u4e00-\u9fa5a-zA-Z0-9_-]/g, '_');
        return `${cleanName}_${random}.${ext}`;
    }

    async getStsToken() {
        if (!this.stsUrl) {
            const error = new Error('获取临时凭证地址不能为空');
            // eslint-disable-next-line no-console
            console.error(error.message);
            throw error;
        }

        try {
            const response = await fetch(this.stsUrl, {
                headers: {
                    'xnToken': this.getToken()
                }
            });
            const res = await response.json();
            const { accessKeyId, accessKeySecret, securityToken: stsToken, uploadHost, bucket, region } = res.data;
            this.uploadHost = uploadHost;
            
            // 保存当前的凭证信息，用于自动刷新
            this.currentCredentials = { accessKeyId, accessKeySecret, stsToken, bucket, region };
            
            this.oss = new OSS({
                accessKeyId,
                accessKeySecret,
                stsToken,
                bucket,
                region,
                // 配置自动刷新STS Token
                refreshSTSToken: async () => {
                    try {
                        const response = await fetch(this.stsUrl, {
                            headers: {
                                'xnToken': this.getToken()
                            }
                        });
                        const res = await response.json();
                        const { accessKeyId, accessKeySecret, securityToken: stsToken } = res.data;
                        return {
                            accessKeyId,
                            accessKeySecret,
                            stsToken
                        };
                    } catch (err) {
                        // eslint-disable-next-line no-console
                        console.error('刷新STS Token失败:', err);
                        throw err;
                    }
                },
                // STS Token刷新间隔（毫秒），默认在过期前5分钟刷新
                refreshSTSTokenInterval: 300000  // 5分钟
            });
            return this;
        } catch (err) {
            const error = new Error(`获取临时凭证失败: ${err.message}`);
            // eslint-disable-next-line no-console
            console.error(error.message, err);
            throw error;
        }
    }

    async setFileId(params) {
        try {
            const response = await fetch(this.setFileIdUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'xnToken': this.getToken()
                },
                body: JSON.stringify(params)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const { data } = await response.json();
            return data;
        } catch (err) {
            const error = new Error(`设置文件ID失败: ${err.message}`);
            // eslint-disable-next-line no-console
            console.error(error.message, err);
            throw error;
        }
    }

    async upload(file, headers = {}) {
        const currentFile = file.file;
        const fileName = currentFile.name;
        const newFileName = this.generateFileName(fileName);
        const path = `accessory/${$dayjs().format('YYYY/MM/DD')}/`;

        try {
            await this.getStsToken();
            const res = await this.oss.multipartUpload(path + newFileName, currentFile, {
                ...headers,
                progress: (p) => {
                    const _progress = parseFloat(p * 100);
                    file.onProgress({ percent: _progress });
                }
            });

            const fileObj = {
                name: fileName,
                size: currentFile.size,
                ext: this.getExt(currentFile),
                imgFlag: this.isImg(currentFile) ? 1 : 0,
                isAV: this.isAV(currentFile) ? 1 : 0,
                url: this.uploadHost + res.name,
                accessoryName: fileName,
                accessorySize: currentFile.size
            };

            const fileIdResponse = await this.setFileId(fileObj);
            file.onSuccess();
            return { ...fileObj, fileId: fileIdResponse.fileId, file: currentFile };
        } catch (err) {
            // eslint-disable-next-line no-console
            console.error('上传文件失败:', err);
            // 不调用 file.onError()，避免文件被 Element UI 移除，在组件层面处理失败状态
            throw { file, fileName, err, message: err.message || '上传失败' };
        }
    }
}

export default Client;