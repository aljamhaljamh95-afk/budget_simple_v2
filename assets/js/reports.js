// reports.js - تقارير بسيطة بدون رسوم بيانية

document.addEventListener('DOMContentLoaded', () => {
    const totalIncomeEl = document.getElementById('rep-total-income');
    const totalExpenseEl = document.getElementById('rep-total-expense');
    const totalBalanceEl = document.getElementById('rep-total-balance');

    const monthIncomeEl = document.getElementById('rep-month-income');
    const monthExpenseEl = document.getElementById('rep-month-expense');
    const budgetLimitEl = document.getElementById('rep-budget-limit');
    const budgetPercentEl = document.getElementById('rep-budget-percent');

    const transactions = loadTransactions();
    const budgetLimit = loadBudgetLimit();

    // ملخص عام
    const totalIncome = transactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);
    const totalExpense = transactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);
    const totalBalance = totalIncome - totalExpense;

    totalIncomeEl.textContent = formatCurrency(totalIncome);
    totalExpenseEl.textContent = formatCurrency(totalExpense);
    totalBalanceEl.textContent = formatCurrency(totalBalance);

    // ملخص الشهر الحالي
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const monthTransactions = transactions.filter(t => {
        const d = new Date(t.date);
        return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
    });

    const monthIncome = monthTransactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);
    const monthExpense = monthTransactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);

    monthIncomeEl.textContent = formatCurrency(monthIncome);
    monthExpenseEl.textContent = formatCurrency(monthExpense);

    if (budgetLimit > 0) {
        budgetLimitEl.textContent = formatCurrency(budgetLimit);
        const percent = (monthExpense / budgetLimit) * 100;
        budgetPercentEl.textContent = percent.toFixed(1) + '%';
    } else {
        budgetLimitEl.textContent = 'غير محدد';
        budgetPercentEl.textContent = '0%';
    }
});
