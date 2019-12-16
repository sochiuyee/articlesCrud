function dateFormat(time){
    let date = new Date(time)
    let Y = date.getFullYear() + '-';
    let M = date.getMonth()+1<10?'0'+(date.getMonth()+1):date.getMonth()+1+'-';
    let D = date.getDate()+' ';
    let H = date.getHours()+':';
    let Min = date.getMinutes()<10?'0'+date.getMinutes()+':':date.getMinutes()+':';
    let S = date.getSeconds();
    return Y+M+D+H+Min+S
}

module.exports = { dateFormat }