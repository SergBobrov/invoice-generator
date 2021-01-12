const currentDate = () => {
    let date = new Date();
    let month = date.getMonth() + 1;
    month = (month < 10 ? '0' + month : month);
    let day = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());
    let minutes = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());
    let hours = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours());

    return day + '.' + month + '.' + date.getFullYear() + ' ' + hours + ':' + minutes;
}

module.exports = currentDate