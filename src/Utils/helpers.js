export function DateToTime(date) {
    let time = new Date(date);
    return `${time.getHours()}:${time.getMinutes()} m`;
}

export function getTime() {
    var today = new Date();
    return `${today.getHours()}:${today.getMinutes()}`;
}
