import { LoanItem } from '../components/LoanItem.js';
import { getLoans, getBookById } from "../services/apiService.js";
import { getStore } from "../state/store.js";

export function LoansView() {
    const section = document.createElement('section');
    section.id = 'loans';
    section.className = 'loans-container';

    section.innerHTML = `
        <div class="card shadow">
            <div class="card-body">
                <h2 class="mb-4">
                    <i class="bi bi-journal-bookmark-fill me-2"></i>
                    Préstamos
                </h2>

                <div id="loansContainer">
                    <div class="loader"></div>
                </div>
            </div>
        </div>
    `;

    loansRequest(section).then(r =>
    console.log('Préstamos cargados'));

    return section;
}

async function loansRequest(section) {
    const store = getStore();
    const user = store.user;
    const userId = user.role === 'librarian' ? null : user.id;

    const container = section.querySelector('#loansContainer');
    if (container) container.innerHTML = '<div class="loader"></div>';

    try {
        const loans = await getLoans(userId);
        if (!Array.isArray(loans) || loans.length === 0) {
            renderLoansTable([], section);
            return;
        }

        const transformed = await Promise.all(loans.map(async (loan) => {
            let bookTitle = 'Desconocido';
            try {
                const book = await getBookById(loan.bookId);
                console.log(book);  
                bookTitle = book?.title ?? book?.bookTitle ?? 'Desconocido';
            } catch (err) {
                console.error('Error obteniendo libro', loan.bookId, err);
            }

            return {
                id: loan.id,
                userId: String(loan.userId),
                bookTitle: bookTitle,
                loanDate: loan.loanDate,
                status: loan.status ? 'Active' : 'Returned'
            };
        }));

        renderLoansTable(transformed, section);
    } catch (err) {
        console.error('Error cargando préstamos', err);
        if (container) container.innerHTML = `<div class="text-danger py-3">No se pudieron cargar los préstamos</div>`;
    }
}


function renderLoansTable(list, section) {
    const container = section.querySelector('#loansContainer');
    if (!container) return;

    if (!list || list.length === 0) {
        container.innerHTML = `
                <div class="text-center py-5">
                    <i class="bi bi-inbox" style="font-size: 3rem; color: #ccc;"></i>
                    <p class="text-muted mt-3">No hay préstamos</p>
                </div>
            `;
        return;
    }

    const tableWrapper = document.createElement('div');
    tableWrapper.className = 'table-responsive';
    const table = document.createElement('table');
    table.className = 'table table-hover';
    table.innerHTML = `
            <thead class="table-light">
                <tr>
                    <th>Préstamo id</th>
                    <th>Usuario id</th>
                    <th>Libro</th>
                    <th>Fecha</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody></tbody>
        `;
    tableWrapper.appendChild(table);

    const tbody = table.querySelector('tbody');
    list.forEach(loan => {
        const row = LoanItem(loan);
        tbody.appendChild(row);
    });

    container.innerHTML = '';
    container.appendChild(tableWrapper);
}

