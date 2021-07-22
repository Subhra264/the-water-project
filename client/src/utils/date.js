
export function parseDate (dateString) {
    const localDate = new Date(dateString);
    return localDate.toDateString();
}