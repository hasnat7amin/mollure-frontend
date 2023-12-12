export function jsonHeader (token) {
    return {
        "Content-Type": "application/json",
        "X-CSRF-TOKEN": document.head
            .querySelector('meta[name="csrf-token"]')
            ?.getAttribute("content"),
        Authorization: `Bearer ${token}`,
    };
}


export function multiFormHeader (token) {
    return {
        "Content-Type": "multipart/form-data;",
        "X-CSRF-TOKEN": document.head
            .querySelector('meta[name="csrf-token"]')
            ?.getAttribute("content"),
        Authorization: `Bearer ${token}`,
    };
}

export function multiFormHeaderWithoutToken () {
    return {
        "Content-Type": "multipart/form-data;",
        "X-CSRF-TOKEN": document.head
            .querySelector('meta[name="csrf-token"]')
            ?.getAttribute("content"),
        
    };
}


export function jsonHeaderWithoutToken () {
    return {
        "Content-Type": "application/json",
        "X-CSRF-TOKEN": document.head
            .querySelector('meta[name="csrf-token"]')
            ?.getAttribute("content"),
        
    };
}