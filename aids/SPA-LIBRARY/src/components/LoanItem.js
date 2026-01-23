import { returnLoan } from "../services/apiService.js";

export function LoanItem(loan) {
    const tr = document.createElement('tr');
    tr.dataset.id = loan.id || '';

    const statusClass = loan.status === 'Active' ? 'badge-warning'
        : loan.status === 'Returned' ? 'badge-success' : 'badge-danger';

    const returnButton = loan.status === 'Active'
        ? `<button type="button" class="navbar__button navbar__button--primary btn-sm btn-return">Devolver</button>`
        : `<button type="button" class="navbar__button navbar__button--secondary btn-sm" disabled>Devolver</button>`;

    tr.innerHTML = `
        <td>${loan.id || '-'}</td>
        <td>${loan.userId|| '-'}</td>
        <td>${loan.bookTitle || '-'}</td>
        <td>${loan.loanDate || '-'}</td>
        <td><span class="badge ${statusClass}">${loan.status || '-'}</span></td>
        <td>
            ${returnButton}
        </td>
    `;


    const btnReturn = tr.querySelector('.btn-return');
    if (btnReturn) {
        btnReturn.addEventListener('click', async () => {
            const originalText = btnReturn.textContent;
            btnReturn.disabled = true;
            btnReturn.textContent = 'Procesando...';
            btnReturn.setAttribute('aria-busy', 'true');

            try {
                const updatedLoan = await returnLoan(loan.id); // espera objeto actualizado

                // actualizar badge
                const badgeEl = tr.querySelector('.badge');
                if (badgeEl) {
                    const newStatus = updatedLoan.status || 'Returned';
                    badgeEl.textContent = newStatus;
                    badgeEl.classList.remove('badge-warning', 'badge-success', 'badge-danger');
                    badgeEl.classList.add(newStatus === 'Active' ? 'badge-warning' : 'badge-success');
                }

                // reemplazar acciones por botón deshabilitado (sin recargar)
                const actionsCell = tr.querySelector('td:last-child');
                if (actionsCell) {
                    actionsCell.innerHTML = `<button type="button" class="navbar__button navbar__button--secondary btn-sm" disabled>Devolver</button>`;
                }

                // emitir evento para que componente padre actualice contadores/listas
                tr.dispatchEvent(new CustomEvent('loan:returned', { detail: { loan: updatedLoan }, bubbles: true }));
            } catch (err) {
                console.error('Error devolviendo préstamo', err);
                btnReturn.disabled = false;
                btnReturn.textContent = originalText || 'Devolver';
            } finally {
                btnReturn.removeAttribute('aria-busy');
            }
        });
    }


    return tr;
}
