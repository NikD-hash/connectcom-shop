class Cart {
    constructor() {
        this.items = this.loadCart();
        this.updateCartCount();
    }
    
    loadCart() {
        const savedCart = localStorage.getItem('connectcom-cart');
        return savedCart ? JSON.parse(savedCart) : [];
    }
    
    saveCart() {
        localStorage.setItem('connectcom-cart', JSON.stringify(this.items));
        this.updateCartCount();
    }
    
    addItem(product) {
        const existingItem = this.items.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({
                id: product.id,
                name: product.name,
                price: product.price,
                quantity: 1,
                image: product.image || 'https://via.placeholder.com/80'
            });
        }
        
        this.saveCart();
        this.showNotification(`Товар "${product.name}" добавлен в корзину`);
    }
    
    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveCart();
        this.renderCartPage();
    }
    
    updateQuantity(productId, newQuantity) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            if (newQuantity <= 0) {
                this.removeItem(productId);
            } else {
                item.quantity = newQuantity;
                this.saveCart();
                this.renderCartPage();
            }
        }
    }
    
    clearCart() {
        this.items = [];
        this.saveCart();
        this.renderCartPage();
    }
    
    getTotalPrice() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }
    
    getTotalItems() {
        return this.items.reduce((total, item) => total + item.quantity, 0);
    }
    
    updateCartCount() {
        const counters = document.querySelectorAll('.cart-count');
        const count = this.getTotalItems();
        
        counters.forEach(counter => {
            counter.textContent = count;
        });
    }
    
    showNotification(message) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background-color: #00C8B4;
            color: #1E2A47;
            padding: 15px 25px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            z-index: 1000;
            animation: fadeInUp 0.3s ease;
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
    
    renderCartPage() {
        const cartContainer = document.querySelector('.cart-container');
        if (!cartContainer) return;
        
        if (this.items.length === 0) {
            cartContainer.innerHTML = `
                <div style="grid-column: 1/-1; text-align: center; padding: 3rem;">
                    <i class="fas fa-shopping-cart" style="font-size: 4rem; color: #ccc; margin-bottom: 1rem;"></i>
                    <h2>Корзина пуста</h2>
                    <p>Добавьте товары из каталога</p>
                    <a href="catalog.html" class="btn btn-accent" style="margin-top: 1rem;">Перейти в каталог</a>
                </div>
            `;
            return;
        }
        
        const itemsHtml = this.items.map(item => `
            <div class="cart-item" data-id="${item.id}">
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p class="cart-item-price">${item.price.toLocaleString()} ₽</p>
                </div>
                <div class="cart-quantity">
                    <button class="quantity-minus" data-id="${item.id}">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-plus" data-id="${item.id}">+</button>
                </div>
                <div class="cart-item-total">
                    <strong>${(item.price * item.quantity).toLocaleString()} ₽</strong>
                </div>
                <i class="fas fa-trash remove-item" data-id="${item.id}" style="cursor: pointer;"></i>
            </div>
        `).join('');
        
        const summaryHtml = `
            <div class="cart-summary">
                <h3>Ваш заказ</h3>
                <div class="summary-row">
                    <span>Товаров: ${this.getTotalItems()} шт.</span>
                    <span>${this.getTotalPrice().toLocaleString()} ₽</span>
                </div>
                <div class="summary-row">
                    <span>Доставка</span>
                    <span>Бесплатно</span>
                </div>
                <div class="summary-row total-price">
                    <span>Итого:</span>
                    <span>${this.getTotalPrice().toLocaleString()} ₽</span>
                </div>
                <button class="btn btn-accent" style="width: 100%;" id="checkoutBtn">Оформить заказ</button>
                <button class="btn" style="width: 100%; margin-top: 0.5rem;" id="clearCartBtn">Очистить корзину</button>
            </div>
        `;
        
        cartContainer.innerHTML = `
            <div class="cart-items">
                <h2>Корзина (${this.getTotalItems()})</h2>
                ${itemsHtml}
            </div>
            ${summaryHtml}
        `;
        
        this.addCartEventListeners();
    }
    
    addCartEventListeners() {
        document.querySelectorAll('.quantity-minus').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(e.target.dataset.id);
                const item = this.items.find(i => i.id === id);
                if (item) {
                    this.updateQuantity(id, item.quantity - 1);
                }
            });
        });
        
        document.querySelectorAll('.quantity-plus').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(e.target.dataset.id);
                const item = this.items.find(i => i.id === id);
                if (item) {
                    this.updateQuantity(id, item.quantity + 1);
                }
            });
        });
        
        document.querySelectorAll('.remove-item').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(e.target.dataset.id);
                this.removeItem(id);
            });
        });
        
        const clearBtn = document.getElementById('clearCartBtn');
        if (clearBtn) {
            clearBtn.addEventListener('click', () => {
                if (confirm('Очистить корзину?')) {
                    this.clearCart();
                }
            });
        }
        
        const checkoutBtn = document.getElementById('checkoutBtn');
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', () => {
                alert('Спасибо за заказ! В ближайшее время с вами свяжется менеджер.');
            });
        }
    }
}

const cart = new Cart();

document.addEventListener('click', function(e) {
    if (e.target.classList.contains('add-to-cart')) {
        const button = e.target;
        const product = {
            id: parseInt(button.dataset.id),
            name: button.dataset.name,
            price: parseInt(button.dataset.price),
            image: button.closest('.product-card')?.querySelector('img')?.src || 'https://via.placeholder.com/80'
        };
        
        cart.addItem(product);
        
        button.style.animation = 'pulse 0.5s';
        setTimeout(() => {
            button.style.animation = '';
        }, 500);
    }
});

document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('cart.html')) {
        cart.renderCartPage();
    }
});