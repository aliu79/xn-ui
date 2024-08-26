const OSS = require('ali-oss');
import $dayjs from '@/utils/dayjs';
const { v4: uuidv4 } = require('uuid');

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

        const isQuotedString = /^".*"$/.test(_token);
        try {
            if (isQuotedString) {
                return _token.slice(1, -1);
            } else {
                return JSON.parse(_token);
            }
        } catch (error) {
            console.error('Failed to parse token:', error);
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

    getFileNameUUID() {
        return uuidv4();
    }

    async getStsToken(file) {
        if (!this.stsUrl) {
            console.error('获取临时凭证地址不能为空');
            file.onError();
            return Promise.reject('获取临时凭证地址不能为空');
        }

        try {
            const response = await fetch(this.stsUrl + '?xnToken=' + this.getToken());
            const res = await response.json();
            const { accessKeyId, accessKeySecret, securityToken: stsToken, uploadHost, bucket, region } = res.data;
            this.uploadHost = uploadHost;
            this.oss = new OSS({
                accessKeyId,
                accessKeySecret,
                stsToken,
                bucket,
                region
            });
            return this;
        } catch (err) {
            console.error('获取临时凭证失败:', err);
            file.onError();
            return Promise.reject(err);
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
            console.error('设置文件ID失败:', err);
            return Promise.reject(err);
        }
    }

    upload(file, headers = {}) {
        // eslint-disable-next-line no-async-promise-executor
        return new Promise(async (resolve, reject) => {
            const currentFile = file.file;
            const fileName = currentFile.name;
            const newFileName = this.getFileNameUUID() + '.' + this.getExt(currentFile);
            const path = `accessory/${$dayjs().format('YYYY/MM/DD')}/`;

            try {
                await this.getStsToken(file);
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
                    imgFlag: Number(this.isImg(currentFile)),
                    isAV: Number(this.isAV(currentFile)),
                    url: this.uploadHost + res.name,
                    accessoryName: fileName,
                    accessorySize: currentFile.size
                };

                const fileIdResponse = await this.setFileId(fileObj);
                file.onSuccess();
                resolve({ ...fileObj, fileId: fileIdResponse.fileId, file: currentFile });
            } catch (err) {
                console.error('上传文件失败:', err);
                file.onError();
                reject({ file, fileName, err });
            }
        });
    }
}

export default Client;