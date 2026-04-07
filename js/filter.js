const products = [
    {
        id: 1,
        name: 'Apple iPhone 15',
        price: 89990,
        brand: 'apple',
        storage: 128,
        image: 'https://www.renderhub.com/frezzy/apple-iphone-15-plus/apple-iphone-15-plus-01.jpg',
        specs: ['Экран: 6.1" Super Retina XDR', 'Память: 128 ГБ', 'Цвет: Черный', 'Чип A16 Bionic'],
        link: 'product-iphone15.html'
    },
    {
        id: 2,
        name: 'Apple iPhone 15 Pro',
        price: 119990,
        brand: 'apple',
        storage: 256,
        image: 'https://ir.ozone.ru/s3/multimedia-1-u/6970022958.jpg',
        specs: ['Экран: 6.1" ProMotion 120Гц', 'Память: 256 ГБ', 'Цвет: Синий', 'Титан'],
        link: 'product-iphone15pro.html'
    },
    {
        id: 3,
        name: 'Samsung Galaxy S23',
        price: 74990,
        brand: 'samsung',
        storage: 256,
        image: 'https://avatars.mds.yandex.net/get-mpic/5272194/img_id5762543328245193156.jpeg/orig',
        specs: ['Экран: 6.1" Dynamic AMOLED 2X', 'Память: 256 ГБ', 'Цвет: Зеленый', 'Snapdragon 8 Gen 2'],
        link: 'product-samsung-s23.html'
    },
    {
        id: 4,
        name: 'Samsung Galaxy S23 Ultra',
        price: 109990,
        brand: 'samsung',
        storage: 512,
        image: 'https://avatars.mds.yandex.net/get-mpic/11918242/2a0000018f1438efad9faa94009921e6c999/orig',
        specs: ['Экран: 6.8" Dynamic AMOLED 2X', 'Память: 512 ГБ', 'Камера: 200 МП', 'S Pen'],
        link: 'product-samsung-s23ultra.html'
    },
    {
        id: 5,
        name: 'Xiaomi Redmi Note 12',
        price: 24990,
        brand: 'xiaomi',
        storage: 128,
        image: 'https://astmarket.com/upload/iblock/397/nr0zzed6r3ltevfhvh00dlx9ns5gs603/d2d2ecea_5b7f_11ee_9f13_005056b72201.jpg',
        specs: ['Экран: 6.67" AMOLED 120Гц', 'Память: 4/128 ГБ', 'Цвет: Серый', 'Камера 50 МП'],
        link: 'product-xiaomi-note12.html'
    },
    {
        id: 6,
        name: 'Xiaomi 13T Pro',
        price: 69990,
        brand: 'xiaomi',
        storage: 256,
        image: 'https://images.satom.ru/i3/firms/28/6023/6023370/pic_6e2f58067d39ade_1024x3000.webp.jpg',
        specs: ['Экран: 6.67" AMOLED 144Гц', 'Память: 12/256 ГБ', 'Камера: Leica', 'Dimensity 9200+'],
        link: 'product-xiaomi-13tpro.html'
    },
    {
        id: 7,
        name: 'Honor 90',
        price: 39990,
        brand: 'honor',
        storage: 256,
        image: 'https://hi-stores.ru/upload/iblock/bdb/1i6i8szw6zdb5gd2xqlrsfhwmiinlig9.jpg',
        specs: ['Экран: 6.7" AMOLED 120Гц', 'Память: 8/256 ГБ', 'Камера: 200 МП', 'Snapdragon 7 Gen 1'],
        link: 'product-honor-90.html'
    },
    {
        id: 8,
        name: 'Honor Magic 5 Pro',
        price: 89990,
        brand: 'honor',
        storage: 512,
        image: 'https://wishmaster.me/upload/resize_cache/webp/iblock/d2e/crrhah38mupphd6kyw6ccm3fxvj5892i.webp',
        specs: ['Экран: 6.81" LTPO 120Гц', 'Память: 12/512 ГБ', 'Защита: IP68', 'Snapdragon 8 Gen 2'],
        link: 'product-honor-magic5.html'
    },
    {
        id: 9,
        name: 'Apple iPhone 14',
        price: 69990,
        brand: 'apple',
        storage: 128,
        image: 'https://2cent.ru/storage/photo/resized/xy_1500x1500/g/zolmiely70zsmp0_c4f1ce19.jpg.webp',
        specs: ['Экран: 6.1" Super Retina XDR', 'Память: 128 ГБ', 'Цвет: Фиолетовый', 'Чип A15 Bionic'],
        link: 'product-iphone14.html'
    }
];

// Остальной код filter.js...
let filteredProducts = [...products];

function displayProducts(productsToShow) {
    const grid = document.getElementById('productGrid');
    const countSpan = document.getElementById('productCount');
    
    if (!grid) return;
    
    if (productsToShow.length === 0) {
        grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center;">Товары не найдены</p>';
        if (countSpan) countSpan.textContent = '0';
        return;
    }
    
    grid.innerHTML = productsToShow.map(product => `
        <div class="product-card" data-id="${product.id}" data-brand="${product.brand}" data-price="${product.price}" data-storage="${product.storage}">
            <a href="${product.link}" style="text-decoration: none; color: inherit;">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
                <div class="product-info">
                    <h3 class="product-title">${product.name}</h3>
                    <p class="product-price">${product.price.toLocaleString()} ₽</p>
                    <ul class="product-specs">
                        ${product.specs.map(spec => `<li><i class="fas fa-microchip"></i> ${spec}</li>`).join('')}
                    </ul>
                </div>
            </a>
            <button class="btn add-to-cart" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}">В корзину</button>
        </div>
    `).join('');
    
    if (countSpan) countSpan.textContent = productsToShow.length;
}

function filterProducts() {
    const minPrice = parseInt(document.getElementById('minPrice')?.value || 0);
    const maxPrice = parseInt(document.getElementById('maxPrice')?.value || 200000);
    
    const selectedBrands = Array.from(document.querySelectorAll('.brand-filter:checked')).map(cb => cb.value);
    const selectedStorage = Array.from(document.querySelectorAll('.storage-filter:checked')).map(cb => parseInt(cb.value));
    
    filteredProducts = products.filter(product => {
        if (product.price < minPrice || product.price > maxPrice) return false;
        if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) return false;
        if (selectedStorage.length > 0 && !selectedStorage.includes(product.storage)) return false;
        return true;
    });
    
    const sortValue = document.getElementById('sortSelect')?.value || 'default';
    sortProducts(sortValue);
}

function sortProducts(sortType) {
    let sorted = [...filteredProducts];
    
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
    
    displayProducts(sorted);
}

function resetFilters() {
    document.querySelectorAll('.brand-filter, .storage-filter').forEach(cb => {
        cb.checked = true;
    });
    
    const minInput = document.getElementById('minPrice');
    const maxInput = document.getElementById('maxPrice');
    if (minInput) minInput.value = 0;
    if (maxInput) maxInput.value = 200000;
    
    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) sortSelect.value = 'default';
    
    filteredProducts = [...products];
    displayProducts(products);
}

document.addEventListener('DOMContentLoaded', function() {
    displayProducts(products);
    
    const applyBtn = document.getElementById('applyFilters');
    const resetBtn = document.getElementById('resetFilters');
    const sortSelect = document.getElementById('sortSelect');
    
    if (applyBtn) applyBtn.addEventListener('click', filterProducts);
    if (resetBtn) resetBtn.addEventListener('click', resetFilters);
    if (sortSelect) sortSelect.addEventListener('change', function(e) {
        sortProducts(e.target.value);
    });
});