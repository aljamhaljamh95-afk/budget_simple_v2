// main.js - منطق الصفحة الرئيسية

document.addEventListener('DOMContentLoaded', () => {
    const typeEl = document.getElementById('tr-type');
    const amountEl = document.getElementById('tr-amount');
    const categoryEl = document.getElementById('tr-category');
    const descEl = document.getElementById('tr-desc');
    const form = document.getElementById('add-transaction-form');

    const incomeEl = document.getElementById('summary-income');
    const expenseEl = document.getElementById('summary-expense');
    const balanceEl = document.getElementById('summary-balance');
    const latestContainer = document.getElementById('latest-transactions');

    let transactions = loadTransactions();
    let categories = loadCategories();

    // تعبئة الفئات
    function fillCategories() {
        categoryEl.innerHTML = '';
        categories.forEach(cat => {
            const opt = document.createElement('option');
            opt.value = cat;
            opt.textContent = cat;
            categoryEl.appendChild(opt);
        });
    }

    // تحديث الملخص
    function updateSummary() {
        const income = transactions
            .filter(t => t.type === 'income')
            .reduce((sum, t) => sum + t.amount, 0);
        const expense = transactions
            .filter(t => t.type === 'expense')
            .reduce((sum, t) => sum + t.amount, 0);
        const balance = income - expense;

        incomeEl.textContent = formatCurrency(income);
        expenseEl.textContent = formatCurrency(expense);
        balanceEl.textContent = formatCurrency(balance);
    }

    // عرض أحدث المعاملات (آخر 5)
    function renderLatest() {
        latestContainer.innerHTML = '';
        if (!transactions.length) {
            latestContainer.innerHTML = '<p class="muted">لا توجد معاملات حتى الآن.</p>';
            return;
        }

        const latest = [...transactions].slice(-5).reverse();
        latest.forEach(t => {
            const item = document.createElement('div');
            item.className = 'transaction-item ' + (t.type === 'income' ? 'income' : 'expense');

            const left = document.createElement('div');
            left.innerHTML = `
                <div><strong>${t.category}</strong></div>
                <div class="meta">${formatDate(t.date)} - ${t.description || 'لا يوجد وصف'}</div>
            `;

            const right = document.createElement('div');
            right.className = 'amount';
            const sign = t.type === 'income' ? '+' : '-';
            right.textContent = sign + t.amount.toFixed(2) + ' ر.س';

            item.appendChild(left);
            item.appendChild(right);

            latestContainer.appendChild(item);
        });
    }

    // حدث إرسال النموذج
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const type = typeEl.value;
        const amount = Number(amountEl.value);
        const category = categoryEl.value;
        const desc = (descEl.value || '').trim();

        if (!amount || amount <= 0) {
            showNotification('الرجاء إدخال مبلغ صحيح.', 'error');
            return;
        }

        if (!category) {
            showNotification('الرجاء اختيار فئة.', 'error');
            return;
        }

        const tr = {
            id: generateId(),
            type,
            amount,
            category,
            description: desc,
            date: new Date().toISOString()
        };

        transactions.push(tr);
        saveTransactions(transactions);

        amountEl.value = '';
        descEl.value = '';

        updateSummary();
        renderLatest();
        showNotification('تم حفظ المعاملة بنجاح.', 'success');
    });

    fillCategories();
    updateSummary();
    renderLatest();
});
