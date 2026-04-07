const headphonesProducts = [
    {
        id: 101,
        name: 'JBL Tune 230NC TWS',
        price: 8990,
        brand: 'jbl',
        type: 'tws',
        image: 'https://doctorhead.ru/upload/dev2fun.imagecompress/webp/resize_cache/iblock/327/edb3mafhoud8b4yg7t150p6urlq1ce7e/688_688_1/jbl_tune_230nc_tws_black_4.webp',
        specs: ['Шумоподавление: Активное', 'Время работы: 40 часов', 'Bluetooth 5.2', 'Быстрая зарядка'],
        link: 'product-jbl-tune230.html'
    },
    {
        id: 102,
        name: 'JBL Flip 6',
        price: 11040,
        brand: 'jbl',
        type: 'overear',
        image: 'https://images.unsplash.com/photo-1605464315542-bda3e2f4e605?w=300&h=200&fit=crop',
        specs: ['Мощность: 30 Вт', 'Защита: IP67', 'Вес: 550 г', 'Аккумулятор: 12 часов'],
        link: 'product-jbl-flip6.html'
    },
    {
        id: 103,
        name: 'Apple AirPods Pro 2',
        price: 24990,
        brand: 'apple',
        type: 'tws',
        image: 'https://avatars.mds.yandex.net/get-mpic/3922047/2a000001941c0efbaf5164d9303143dcc58f/orig',
        specs: ['Чип H2', 'Шумоподавление', 'Пространственное аудио', 'Адаптивный эквалайзер'],
        link: 'product-airpods-pro2.html'
    },
    {
        id: 104,
        name: 'Apple AirPods 3',
        price: 17990,
        brand: 'apple',
        type: 'tws',
        image: 'https://pcdn.goldapple.ru/p/p/19000484674/web/696d674d61696e5f61666435383630356666643434306334383565373937353837316465386136328de3dfe3327e59e.jpg',
        specs: ['Адаптивный эквалайзер', 'Пространственное аудио', 'Влагозащита IPX4', 'До 30 часов'],
        link: 'product-airpods-3.html'
    },
    {
        id: 105,
        name: 'Sony WH-1000XM5',
        price: 34990,
        brand: 'sony',
        type: 'overear',
        image: 'https://cdn.mtscdn.ru/upload/iblock/05d/3.jpg',
        specs: ['Шумоподавление: Лучшее на рынке', 'Время работы: 30 часов', 'Быстрая зарядка', 'Hi-Res Audio'],
        link: 'product-sony-xm5.html'
    }
];

let filteredHeadphones = [...headphonesProducts];

function displayHeadphones(products) {
    const grid = document.getElementById('productGrid');
    const countSpan = document.getElementById('productCount');
    
    if (!grid) return;
    
    if (products.length === 0) {
        grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center;">Товары не найдены</p>';
        if (countSpan) countSpan.textContent = '0';
        return;
    }
    
    grid.innerHTML = products.map(product => `
        <div class="product-card" data-id="${product.id}">
            <a href="${product.link}" style="text-decoration: none; color: inherit;">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
                <div class="product-info">
                    <h3 class="product-title">${product.name}</h3>
                    <p class="product-price">${product.price.toLocaleString()} ₽</p>
                    <ul class="product-specs">
                        ${product.specs.map(spec => `<li><i class="fas fa-music"></i> ${spec}</li>`).join('')}
                    </ul>
                </div>
            </a>
            <button class="btn add-to-cart" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}">В корзину</button>
        </div>
    `).join('');
    
    if (countSpan) countSpan.textContent = products.length;
}

function filterHeadphones() {
    const minPrice = parseInt(document.getElementById('minPrice')?.value || 0);
    const maxPrice = parseInt(document.getElementById('maxPrice')?.value || 50000);
    
    const selectedBrands = Array.from(document.querySelectorAll('.brand-filter:checked')).map(cb => cb.value);
    const selectedTypes = Array.from(document.querySelectorAll('.type-filter:checked')).map(cb => cb.value);
    
    filteredHeadphones = headphonesProducts.filter(product => {
        if (product.price < minPrice || product.price > maxPrice) return false;
        if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) return false;
        if (selectedTypes.length > 0 && !selectedTypes.includes(product.type)) return false;
        return true;
    });
    
    const sortValue = document.getElementById('sortSelect')?.value || 'default';
    sortHeadphones(sortValue);
}

function sortHeadphones(sortType) {
    let sorted = [...filteredHeadphones];
    
    switch(sortType) {
        case 'priceAsc':
            sorted.sort((a, b) => a.price - b.price);
            break;
        case 'priceDesc':
            sorted.sort((a, b) => b.price - a.price);
            break;
        case 'nameAsc':
            sorted.sort((a, b) => a.name.localeCompare(b.name));
            break;
        default:
            sorted.sort((a, b) => a.id - b.id);
    }
    
    displayHeadphones(sorted);
}

function resetHeadphonesFilters() {
    document.querySelectorAll('.brand-filter, .type-filter').forEach(cb => {
        cb.checked = true;
    });
    
    const minInput = document.getElementById('minPrice');
    const maxInput = document.getElementById('maxPrice');
    if (minInput) minInput.value = 0;
    if (maxInput) maxInput.value = 50000;
    
    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) sortSelect.value = 'default';
    
    filteredHeadphones = [...headphonesProducts];
    displayHeadphones(headphonesProducts);
}

document.addEventListener('DOMContentLoaded', function() {
    displayHeadphones(headphonesProducts);
    
    const applyBtn = document.getElementById('applyFilters');
    const resetBtn = document.getElementById('resetFilters');
    const sortSelect = document.getElementById('sortSelect');
    
    if (applyBtn) applyBtn.addEventListener('click', filterHeadphones);
    if (resetBtn) resetBtn.addEventListener('click', resetHeadphonesFilters);
    if (sortSelect) sortSelect.addEventListener('change', (e) => sortHeadphones(e.target.value));
});