export const BASE_URL = 'http://localhost:3000';

export async function getBooks() {
    const res = await fetch (`${BASE_URL}/books`);
    return res.json();
}

export async function getBookById(bookId) {
    const res = await fetch (`${BASE_URL}/books?id=${bookId}`);
    // Solo devuelve el primer libro encontrado
    const books = await res.json();
    return books.length > 0 ? books[0] : null;
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

export async function updateBookQuantity(bookId, newQuantity) {
    const res = await fetch (`${BASE_URL}/books/${bookId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ availableCopies: newQuantity })
    });
    return res.json();
}

export async function deleteBook(bookId) {
    const res = await fetch (`${BASE_URL}/books/${bookId}`, {
        method: 'DELETE'
    });
    return res.json();
}

// ===== Users API =====
export async function getUsers() {
    const res = await fetch(`${BASE_URL}/users`);
    return res.json();
}

export async function getUserById(userId) {
    const res = await fetch(`${BASE_URL}/users?id=${encodeURIComponent(userId)}`);
    const users = await res.json();
    return users.length > 0 ? users[0] : null;
}

export async function getUserByEmail(email) {
    const res = await fetch(`${BASE_URL}/users?email=${encodeURIComponent(email)}`);
    const users = await res.json();
    return users.length > 0 ? users[0] : null;
}

export async function createUser(userData) {
    const res = await fetch(`${BASE_URL}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
    });
    if (!res.ok) {
        throw new Error('Failed to create user');
    }
    return res.json();
}

// Loans

export async function getLoans(userId = null) {
    const url = userId ? `${BASE_URL}/loans?userId=${userId}` : `${BASE_URL}/loans`;
    const res = await fetch (url);
    return res.json();
}

async function getLoanById(loanId) {
    const res = await fetch (`${BASE_URL}/loans?id=${loanId}`);
    const loans = await res.json();
    return loans.length > 0 ? loans[0] : null;
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
    try {
        const loan = await getLoanById(loanId);
        if (!loan) {
            throw new Error('Loan not found');
        }
        const res = await fetch (`${BASE_URL}/loans/${loanId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ status: false })
        });

        if (!res.ok) {
            throw new Error('Failed to return loan');
        }

        const book = await getBookById(loan.bookId);
        if (!book) {
            throw new Error('Book not found');
        }

        await updateBookQuantity(book.id, book.availableCopies + 1);

        return res.json();

    } catch (error) {
        console.error('Error returning loan:', error);
        throw error;
    }
}
