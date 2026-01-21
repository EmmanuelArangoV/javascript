const STORAGE_KEY = 'library_session';

const state = {
    user: null,
    books: [],
    loans: []
}

export function initStore() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
            const data = JSON.parse(raw);
            state.user = data?.user || null;
        }
    } catch {
        localStorage.removeItem(STORAGE_KEY);
    }
}

export function getStore() {
    return state;
}

export function logout() {
    state.user = null;
    state.books = [];
    state.loans = [];
    localStorage.removeItem(STORAGE_KEY);
}

export function isAuth() {
    return !!state.user;
}

export function getRole() {
    return state.user?.role || null;
}

export function isLibrarian() {
    return getRole() === 'librarian';
}

export function isVisitor() {
    return getRole() === 'visitor';
}

export function setBooks(books) {
    state.books = Array.isArray(books) ? books : [];
}

export function setLoans(loans) {
    state.loans = Array.isArray(loans) ? loans : [];
}