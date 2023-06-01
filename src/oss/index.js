const OSS = require('ali-oss')
import $dayjs from '@/utils/dayjs'
const { v4: uuidv4 } = require('uuid');

class Client {
    constructor(params = {}) {
        this.uploadHost = null
        this.token = localStorage.getItem('xnToken')
        this.stsUrl = params.stsUrl || ''
        this.oss = null
    }
    _getToken() {
        const _token = localStorage.getItem('xnToken')
        let token = ''
        if (_token) {
            try {
                token = JSON.parse(_token)
            } catch (error) {
                token = _token
            }
        }
        return token
    }
    getExt(file) {
        let fileExt = file.name.substring(file.name.lastIndexOf(".") + 1);
        // 判断上传格式
        return `${fileExt}`.toLowerCase();
    }
    isImg(file) {
        return ~~file.type.indexOf('image') > -1
    }
    getFileNameUUID() {
        const uuid = uuidv4()
        return uuid
    }
    getStsToken() {
        return new Promise((resolve, reject) => {
            if (!this.stsUrl) {
                return console.error('获取临时凭证地址不能为空')
            }
            fetch(this.stsUrl + '?xnToken=' + this.token).then(response => response.json()).then((res) => {
                const { data: { accessKeyId, accessKeySecret, securityToken: stsToken, uploadHost, bucket, region } } = res
                const obj = {
                    accessKeyId,
                    accessKeySecret,
                    stsToken,
                    uploadHost,
                    bucket,
                    region
                }
               this.uploadHost = uploadHost
                this.oss = new OSS({
                    ...obj,
                })
                resolve(this)
            }).catch((err) => {
                reject(err)
            })

        })
    }
    upload(file, headers = {}) {
        const currentFile = file.file
        const fileName = currentFile.name
        const newFileName = this.getFileNameUUID() + '.' + this.getExt(currentFile)
        const path = `accessory/${$dayjs().format('YYYY/MM/DD')}/`
        return new Promise((resolve, reject) => {
            this.oss.multipartUpload(path + newFileName, currentFile, {
                ...headers,
                progress(p) {
                    const _progress = parseFloat(p * 100)
                    file.onProgress({ percent: _progress });
                }
            }).then(res => {
                file.onSuccess()
                const obj = {
                    name: fileName,
                    size: currentFile.size,
                    ext: this.getExt(currentFile),
                    imgFlag: this.isImg(currentFile),
                    url: this.uploadHost + res.name,
                }
                resolve(obj)
            }).catch(err => {
                file.onError();
                reject(err)
            })
        })
    }
}


export default Client