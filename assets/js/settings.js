// settings.js - إدارة الميزانية والفئات

document.addEventListener('DOMContentLoaded', () => {
    const budgetInput = document.getElementById('budget-input');
    const budgetForm = document.getElementById('budget-form');

    const catForm = document.getElementById('category-form');
    const catInput = document.getElementById('category-input');
    const catList = document.getElementById('categories-list');

    let categories = loadCategories();

    function renderCategories() {
        catList.innerHTML = '';
        if (!categories.length) {
            const li = document.createElement('li');
            li.textContent = 'لا توجد فئات.';
            catList.appendChild(li);
            return;
        }

        categories.forEach(cat => {
            const li = document.createElement('li');
            const span = document.createElement('span');
            span.className = 'category-name';
            span.textContent = cat;

            const btn = document.createElement('button');
            btn.className = 'btn danger';
            btn.textContent = 'حذف';
            btn.addEventListener('click', () => {
                if (confirm('حذف هذه الفئة؟ لن يتم حذف المعاملات القديمة، فقط الفئة من القائمة.')) {
                    categories = categories.filter(c => c !== cat);
                    saveCategories(categories);
                    renderCategories();
                    showNotification('تم حذف الفئة.', 'success');
                }
            });

            li.appendChild(span);
            li.appendChild(btn);
            catList.appendChild(li);
        });
    }

    // تحميل حد الميزانية
    const limit = loadBudgetLimit();
    if (limit > 0) {
        budgetInput.value = limit.toString();
    }

    budgetForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const val = Number(budgetInput.value);
        if (!val || val <= 0) {
            showNotification('الرجاء إدخال حد ميزانية صحيح.', 'error');
            return;
        }
        saveBudgetLimit(val);
        showNotification('تم حفظ حد الميزانية.', 'success');
    });

    catForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = (catInput.value || '').trim();
        if (!name) {
            showNotification('الرجاء إدخال اسم الفئة.', 'error');
            return;
        }
        if (categories.includes(name)) {
            showNotification('هذه الفئة موجودة مسبقاً.', 'error');
            return;
        }
        categories.push(name);
        saveCategories(categories);
        catInput.value = '';
        renderCategories();
        showNotification('تمت إضافة الفئة.', 'success');
    });

    renderCategories();
});
