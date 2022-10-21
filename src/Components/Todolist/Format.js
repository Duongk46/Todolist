function formatDate() {
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1;
    let dd = today.getDate();
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    return dd + '/' + mm + '/' + yyyy;
}
function formatTime() {
    const date = new Date();

    const h = `0${date.getHours()}`.slice(-2);
    const s = `0${date.getSeconds()}`.slice(-2);
    const m = `0${date.getMinutes()}`.slice(-2);

    return `${h}:${m}:${s}`;
}

export {formatDate,formatTime};