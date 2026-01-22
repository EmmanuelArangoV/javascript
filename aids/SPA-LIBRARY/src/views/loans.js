import { LoanItem } from '../components/LoanItem.js';

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

    const loansData = [
        { id: 'L-001', userName: 'María Pérez', bookTitle: 'JavaScript Moderno', date: '2025-01-10', status: 'Active', bookId: 'B-101' },
        { id: 'L-002', userName: 'Carlos Gómez', bookTitle: 'Node.js en Producción', date: '2024-12-22', status: 'Returned', bookId: 'B-102' },
        { id: 'L-003', userName: 'Lucía Torres', bookTitle: 'Aprendiendo React', date: '2025-01-05', status: 'Returned', bookId: 'B-103' },
        { id: 'L-004', userName: 'Andrea Ruiz', bookTitle: 'CSS Avanzado', date: '2024-11-30', status: 'Active', bookId: 'B-104' }
    ];

    renderLoansTable(loansData);

    function renderLoansTable(list) {
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
                    <th>Usuario</th>
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

    return section;
}

