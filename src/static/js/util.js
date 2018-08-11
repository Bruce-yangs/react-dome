export function getRedirectPath({type, avatar}) {
    //根据用户信息 返回跳转地址
    //user.type /1 /2
    //user.avatar /bossinfo / geniusinfo
    let url = (type === 2) ? '/boss' : '/genius'
    if (!avatar) {
        url += 'info'
    }
    return url;
}