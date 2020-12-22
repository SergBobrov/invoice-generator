const currentDate = () => {
    let date = new Date();
    let month = date.getMonth() + 1;
    month = (month < 10 ? '0' + month : month);
    let day = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());
    return day + '.' + month + '.' + date.getFullYear();
}

module.exports = currentDate