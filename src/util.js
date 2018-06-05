//专门放跳转类的
export function getRedirectPath({type,avatar}){
    //根据用户信息，返回跳转地址
    //user.type /boss /genius
    //user.avatar /bossinfo /geniusinfo
    let url = (type === 'genius') ? '/genius':'/boss'
    //如果没有头像就去完善信息
    if(!avatar) {
        url += 'info'
    }
    return url
}