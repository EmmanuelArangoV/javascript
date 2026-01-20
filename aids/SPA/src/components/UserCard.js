export function UserCard({ name, email }) {
    const card = document.createElement('div');
    card.className = 'user-card';

    card.innerHTML = `
        <h3 class="user-name">${name}</h3>
        <p class="user-email">${email}</p>
    `;

    return card;
}