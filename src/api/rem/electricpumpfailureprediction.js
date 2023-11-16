import request from '@/utils/request'

const baseUrl = process.env.NODE_ENV == "production" ? "/rem/api" : "/rem/api"

export function send(data) {
    return request({
        url: `${baseUrl}/message/sendMailIncludePicture`,
        method: "post",
        data
    });
}
