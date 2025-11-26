// transactions.js - عرض وحذف المعاملات

document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.querySelector('#transactions-table tbody');
    const noMsg = document.getElementById('no-transactions-msg');

    let transactions = loadTransactions();

    function renderTable() {
        tableBody.innerHTML = '';

        if (!transactions.length) {
            noMsg.style.display = 'block';
            return;
        } else {
            noMsg.style.display = 'none';
        }

        transactions.forEach((t, index) => {
            const tr = document.createElement('tr');

            const tdIndex = document.createElement('td');
            tdIndex.textContent = index + 1;

            const tdType = document.createElement('td');
            tdType.textContent = t.type === 'income' ? 'دخل' : 'مصروف';

            const tdAmount = document.createElement('td');
            tdAmount.textContent = formatCurrency(t.amount);

            const tdCat = document.createElement('td');
            tdCat.textContent = t.category;

            const tdDesc = document.createElement('td');
            tdDesc.textContent = t.description || '—';

            const tdDate = document.createElement('td');
            tdDate.textContent = formatDate(t.date);

            const tdAction = document.createElement('td');
            const delBtn = document.createElement('button');
            delBtn.className = 'btn danger';
            delBtn.textContent = 'حذف';
            delBtn.addEventListener('click', () => {
                if (confirm('هل أنت متأكد من حذف هذه المعاملة؟')) {
                    transactions = transactions.filter(x => x.id !== t.id);
                    saveTransactions(transactions);
                    renderTable();
                    showNotification('تم حذف المعاملة.', 'success');
                }
            });
            tdAction.appendChild(delBtn);

            tr.appendChild(tdIndex);
            tr.appendChild(tdType);
            tr.appendChild(tdAmount);
            tr.appendChild(tdCat);
            tr.appendChild(tdDesc);
            tr.appendChild(tdDate);
            tr.appendChild(tdAction);

            tableBody.appendChild(tr);
        });
    }

    renderTable();
});
