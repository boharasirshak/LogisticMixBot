const monthNames = [
    "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
    "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
];

export const formatDate = (inputDate: string) => {
    try {
        const date = new Date(inputDate);
        return `${date.getDate()} ${monthNames[date.getMonth()]} ${date.getFullYear()}`;
    } catch {
        // if the input is not a date, return the input as is
        return inputDate;
    }
}