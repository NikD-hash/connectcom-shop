// Класс для валидации форм
class FormValidator {
    constructor(formId) {
        this.form = document.getElementById(formId);
        if (this.form) {
            this.init();
        }
    }
    
    init() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            if (this.validate()) {
                this.showSuccess();
            }
        });
        
        this.form.querySelectorAll('input, textarea').forEach(field => {
            field.addEventListener('blur', () => {
                this.validateField(field);
            });
        });
    }
    
    validate() {
        let isValid = true;
        const fields = this.form.querySelectorAll('input, textarea');
        
        fields.forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });
        
        return isValid;
    }
    
    validateField(field) {
        const value = field.value.trim();
        let errorMessage = '';
        
        this.removeError(field);
        
        if (field.hasAttribute('required') && !value) {
            errorMessage = 'Это поле обязательно для заполнения';
        }
        
        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                errorMessage = 'Введите корректный email';
            }
        }
        
        if (field.type === 'tel' && value) {
            const phoneDigits = value.replace(/\D/g, '');
            if (phoneDigits.length < 11) {
                errorMessage = 'Телефон должен содержать минимум 11 цифр';
            }
        }
        
        if (field.type === 'checkbox' && field.hasAttribute('required') && !field.checked) {
            errorMessage = 'Необходимо подтвердить согласие';
        }
        
        if (errorMessage) {
            this.showError(field, errorMessage);
            return false;
        }
        
        return true;
    }
    
    showError(field, message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        errorDiv.style.color = '#ff4d4d';
        errorDiv.style.fontSize = '0.85rem';
        errorDiv.style.marginTop = '0.3rem';
        
        field.style.borderColor = '#ff4d4d';
        field.parentNode.appendChild(errorDiv);
    }
    
    removeError(field) {
        field.style.borderColor = '';
        const errorDiv = field.parentNode.querySelector('.error-message');
        if (errorDiv) {
            errorDiv.remove();
        }
    }
    
    showSuccess() {

        const oldSuccess = this.form.querySelector('.success-message');
        if (oldSuccess) oldSuccess.remove();
        
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.textContent = 'Спасибо! Ваше сообщение отправлено.';
        successDiv.style.backgroundColor = '#4CAF50';
        successDiv.style.color = 'white';
        successDiv.style.padding = '1rem';
        successDiv.style.borderRadius = '4px';
        successDiv.style.marginBottom = '1rem';
        
        this.form.prepend(successDiv);
        this.form.reset();
        
        setTimeout(() => {
            successDiv.remove();
        }, 5000);
    }
}

document.addEventListener('DOMContentLoaded', function() {

    new FormValidator('contactForm');
    
    new FormValidator('checkoutForm');
});