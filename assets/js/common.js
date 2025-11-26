// common.js - دوال مشتركة للتخزين والتنسيق

const STORAGE_KEYS = {               //يحط اسماء ثابته للمفاتيح اللي بنستخدمها 
    TRANSACTIONS: 'simple_budget_transactions',   // نخزن في قائمة المعاملات
    CATEGORIES: 'simple_budget_categories',     // نخزن فيه قائمة الفئات 
    BUDGET: 'simple_budget_limit'   // نخزن فيه حد الميزانيه الشهري 
};

function loadTransactions() {        // تحميل وحفظ المعاملات 
    const raw = localStorage.getItem(STORAGE_KEYS.TRANSACTIONS);
    try {
        return raw ? JSON.parse(raw) : [];
    } catch {
        return [];  
    }
}

function saveTransactions(list) {
    localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(list || []));
}

function loadCategories() {
    const raw = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
    if (raw) {
        try {
            return JSON.parse(raw);
        } catch {
            return getDefaultCategories();
        }
    }
    const defaults = getDefaultCategories();
    saveCategories(defaults);
    return defaults;
}

function saveCategories(list) {
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(list || []));
}

function getDefaultCategories() {
    return [
        'طعام',
        'مواصلات',
        'فواتير',
        'تسوق',
        'أخرى'
    ];
}

function loadBudgetLimit() {   // حد الميزانيه
    const raw = localStorage.getItem(STORAGE_KEYS.BUDGET);
    const num = Number(raw);
    return isNaN(num) ? 0 : num; 
}

function saveBudgetLimit(limit) {
    const num = Number(limit);
    localStorage.setItem(STORAGE_KEYS.BUDGET, isNaN(num) ? 0 : num);
}

function generateId() {   // توليد id
    return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

function formatCurrency(value) {  // تنسيق العملة
    const num = Number(value) || 0;
    return num.toFixed(2) + 'ر.ي';
}

function formatDate(dateString) {  //تنسيق التاريخ 
    try {
        const d = new Date(dateString);
        return d.toLocaleDateString('ar-EG');
    } catch {
        return dateString || '';
    }
}

function showNotification(message, type = 'info') { // الاشعارات 
    const container = document.getElementById('notification-container');
    if (!container) return;

    const div = document.createElement('div');
    div.className = 'notification ' + type;
    div.textContent = message;
    container.appendChild(div);

    requestAnimationFrame(() => {
        div.classList.add('show');
    });

    setTimeout(() => {
        div.classList.remove('show');
        setTimeout(() => div.remove(), 200);
    }, 2500);
}
