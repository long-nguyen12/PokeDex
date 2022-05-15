export function normalizeName(name) {
    let array = name.split(" ");
    let norm = "";
    for (let i = 0; i < array.length; i++) {
        let firstCase = array[i].substr(0, 1);
        let others = array[i].substr(1);
        norm += firstCase.toUpperCase() + others + " ";
    }
    return norm.trim();
}
