export const BASE_URL = 'http://localhost:3000';

export async function getBooks() {
    const res = await fetch (`${BASE_URL}/books`);
    return res.json();
}

export async function getBookById(bookId) {
    const res = await fetch (`${BASE_URL}/books/${bookId}`);
    return res.json();
}

export async function createBook(bookData) {
    const res = await fetch (`${BASE_URL}/books`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bookData)
    });
    return res.json();
}

export async function updateBook(bookId, bookData) {
    const res = await fetch (`${BASE_URL}/books/${bookId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bookData)
    });
    return res.json();
}

export async function deleteBook(bookId) {
    const res = await fetch (`${BASE_URL}/books/${bookId}`, {
        method: 'DELETE'
    });
    return res.json();
}

// Loans

export async function getLoans(userId = null) {
    const url = userId ? `${BASE_URL}/loans?userId=${userId}` : `${BASE_URL}/loans`;
    const res = await fetch (url);
    return res.json();
}

export async function createLoan(loanData) {
    const res = await fetch (`${BASE_URL}/loans`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loanData)
    });
    return res.json();
}

export async function returnLoan(loanId) {
    const res = await fetch (`${BASE_URL}/loans/${loanId}/return`, {
        method: 'DELETE'
    });
    return res.json();
}


