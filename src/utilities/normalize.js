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

export function normalizeString(flavor_text_entries) {
    let text = "";
    let i = 0;
    for (i = 0; i < flavor_text_entries.length; i++) {
        if (flavor_text_entries[i].language.name == "en") {
            break;
        }
    }
    text = flavor_text_entries[i].flavor_text.split("\n");
    let res = "";
    for (let i = 0; i < text.length; i++) {
        text[i] = text[i].replace("\f", " ");
        res += text[i] + " ";
    }
    return res;
}
