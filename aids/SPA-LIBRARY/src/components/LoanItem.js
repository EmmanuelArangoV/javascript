export function LoanItem(loan) {
    const tr = document.createElement('tr');
    tr.dataset.id = loan.id || '';

    const statusClass = loan.status === 'Active' ? 'badge-warning'
        : loan.status === 'Returned' ? 'badge-success' : 'badge-danger';

    tr.innerHTML = `
        <td>${loan.userName || '-'}</td>
        <td>${loan.bookTitle || '-'}</td>
        <td>${loan.date || '-'}</td>
        <td><span class="badge ${statusClass}">${loan.status || '-'}</span></td>
        <td>
            <button type="button" class="navbar__button navbar__button--primary btn-sm btn-return">Devolver</button>
        </td>
    `;

    return tr;
}
