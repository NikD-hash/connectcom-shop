function initMobileMenu() {
    const menuButton = document.createElement('button');
    menuButton.className = 'mobile-menu-btn';
    menuButton.innerHTML = '<i class="fas fa-bars"></i>';
    menuButton.style.cssText = `
        display: none;
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
    `;
    
    const header = document.querySelector('.header-container');
    const menu = document.querySelector('.menu');
    
    if (window.innerWidth <= 768) {
        menu.style.display = 'none';
        menuButton.style.display = 'block';
        header?.appendChild(menuButton);
        
        menuButton.addEventListener('click', () => {
            if (menu.style.display === 'none') {
                menu.style.display = 'flex';
                menu.style.flexDirection = 'column';
                menu.style.position = 'absolute';
                menu.style.top = '100%';
                menu.style.left = '0';
                menu.style.width = '100%';
                menu.style.backgroundColor = '#1E2A47';
                menu.style.padding = '1rem';
                menu.style.zIndex = '1000';
            } else {
                menu.style.display = 'none';
            }
        });
    }
}

function highlightActiveMenu() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const menuLinks = document.querySelectorAll('.menu a');
    
    menuLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (linkPath === currentPath) {
            link.style.color = '#00C8B4';
        }
    });
}

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

document.addEventListener('DOMContentLoaded', function() {
    highlightActiveMenu();
    initSmoothScroll();
    initLazyLoading();
    
    window.addEventListener('resize', () => {
        const menuButton = document.querySelector('.mobile-menu-btn');
        const menu = document.querySelector('.menu');
        
        if (window.innerWidth > 768) {
            if (menuButton) menuButton.remove();
            if (menu) {
                menu.style.display = 'flex';
                menu.style.flexDirection = 'row';
                menu.style.position = 'static';
                menu.style.width = 'auto';
                menu.style.backgroundColor = 'transparent';
                menu.style.padding = '0';
            }
        } else {
            if (!menuButton && menu) {
                initMobileMenu();
            }
        }
    });
});

window.addEventListener('scroll', function() {
    const elements = document.querySelectorAll('.advantage-card, .product-card, .category-card');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        
        if (elementTop < window.innerHeight && elementBottom > 0) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
});