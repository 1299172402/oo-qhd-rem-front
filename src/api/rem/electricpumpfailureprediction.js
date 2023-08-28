import request from '@/utils/request'
export function send(data) {
    return request({
        url: `/message-service/message/mail/send/ipmEmail`,
        method: "post",
        data
    });
}
