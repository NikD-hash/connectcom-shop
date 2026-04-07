const tabletsProducts = [
    {
        id: 301,
        name: 'Apple iPad Pro 11" M2',
        price: 89990,
        brand: 'apple',
        screenSize: 'medium',
        image: 'https://istudio-ufa.ru/upload/iblock/cc2/yjnzweimhuvgwphh2z50ibaypz5dm0qv.png',
        specs: ['Чип M2', 'Экран: 11" Liquid Retina', '8 ГБ ОЗУ', 'Face ID', 'USB-C'],
        link: 'product-ipad-pro-11.html'
    },
    {
        id: 302,
        name: 'Apple iPad Pro 12.9" M2',
        price: 119990,
        brand: 'apple',
        screenSize: 'large',
        image: 'https://avatars.mds.yandex.net/get-mpic/6382710/2a00000193879e6036db3d3536952231786e/orig',
        specs: ['Чип M2', 'Экран: 12.9" XDR', '16 ГБ ОЗУ', 'Liquid Retina', 'Face ID'],
        link: 'product-ipad-pro-129.html'
    },
    {
        id: 303,
        name: 'Apple iPad 10.9" 10-го поколения',
        price: 44990,
        brand: 'apple',
        screenSize: 'medium',
        image: 'https://ir.ozone.ru/s3/multimedia-i/6869423970.jpg',
        specs: ['Чип A14 Bionic', 'Экран: 10.9"', 'USB-C', 'Touch ID', 'Поддержка Apple Pencil'],
        link: 'product-ipad-10.html'
    },
    {
        id: 304,
        name: 'Apple iPad mini 6',
        price: 49990,
        brand: 'apple',
        screenSize: 'small',
        image: 'https://hi-stores.ru/upload/iblock/7d2/7d235afb372c30a64a92fab900fcaf29.jpg',
        specs: ['Чип A15 Bionic', 'Экран: 8.3"', 'Поддержка Apple Pencil 2', 'USB-C', 'Touch ID'],
        link: 'product-ipad-mini6.html'
    },
    {
        id: 305,
        name: 'Samsung Galaxy Tab S9 Ultra',
        price: 129990,
        brand: 'samsung',
        screenSize: 'large',
        image: 'https://avatars.mds.yandex.net/get-mpic/16488168/2a000001997ca81982484a435944cb564813/orig',
        specs: ['Экран: 14.6" Dynamic AMOLED', 'S Pen в комплекте', 'IP68', 'Snapdragon 8 Gen 2'],
        link: 'product-tab-s9-ultra.html'
    }
];

let filteredTablets = [...tabletsProducts];

function displayTablets(products) {
    const grid = document.getElementById('productGrid');
    const countSpan = document.getElementById('productCount');
    
    if (!grid) return;
    
    if (products.length === 0) {
        grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center;">Товары не найдены</p>';
        if (countSpan) countSpan.textContent = '0';
        return;
    }
    
    grid.innerHTML = products.map(product => `
        <div class="product-card">
            <a href="${product.link}" style="text-decoration: none; color: inherit;">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
                <div class="product-info">
                    <h3 class="product-title">${product.name}</h3>
                    <p class="product-price">${product.price.toLocaleString()} ₽</p>
                    <ul class="product-specs">
                        ${product.specs.map(spec => `<li><i class="fas fa-tablet-alt"></i> ${spec}</li>`).join('')}
                    </ul>
                </div>
            </a>
            <button class="btn add-to-cart" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}">В корзину</button>
        </div>
    `).join('');
    
    if (countSpan) countSpan.textContent = products.length;
}

function filterTablets() {
    const minPrice = parseInt(document.getElementById('minPrice')?.value || 0);
    const maxPrice = parseInt(document.getElementById('maxPrice')?.value || 200000);
    
    const selectedBrands = Array.from(document.querySelectorAll('.brand-filter:checked')).map(cb => cb.value);
    const selectedSizes = Array.from(document.querySelectorAll('.size-filter:checked')).map(cb => cb.value);
    
    filteredTablets = tabletsProducts.filter(product => {
        if (product.price < minPrice || product.price > maxPrice) return false;
        if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) return false;
        if (selectedSizes.length > 0 && !selectedSizes.includes(product.screenSize)) return false;
        return true;
    });
    
    const sortValue = document.getElementById('sortSelect')?.value || 'default';
    sortTablets(sortValue);
}

function sortTablets(sortType) {
    let sorted = [...filteredTablets];
    
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
    
    displayTablets(sorted);
}

function resetTabletsFilters() {
    document.querySelectorAll('.brand-filter, .size-filter').forEach(cb => {
        cb.checked = true;
    });
    
    const minInput = document.getElementById('minPrice');
    const maxInput = document.getElementById('maxPrice');
    if (minInput) minInput.value = 0;
    if (maxInput) maxInput.value = 200000;
    
    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) sortSelect.value = 'default';
    
    filteredTablets = [...tabletsProducts];
    displayTablets(tabletsProducts);
}

document.addEventListener('DOMContentLoaded', function() {
    displayTablets(tabletsProducts);
    
    const applyBtn = document.getElementById('applyFilters');
    const resetBtn = document.getElementById('resetFilters');
    const sortSelect = document.getElementById('sortSelect');
    
    if (applyBtn) applyBtn.addEventListener('click', filterTablets);
    if (resetBtn) resetBtn.addEventListener('click', resetTabletsFilters);
    if (sortSelect) sortSelect.addEventListener('change', (e) => sortTablets(e.target.value));
});