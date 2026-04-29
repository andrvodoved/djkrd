// Номер телефона для звонков
const PHONE_NUMBER = '+79649273341'; // ЗАМЕНИ НА СВОЙ НОМЕР
const PHONE_DISPLAY = '+7 (964) 927-33-41'; // Форматированный номер для отображения

document.addEventListener('DOMContentLoaded', () => {
    // Обработка кнопок "Позвонить"
    document.querySelectorAll('.cta-button').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            handleCallButton();
        });
    });

    // Функция обработки кнопки звонка
    function handleCallButton() {
        const isMobile = /iPhone|iPad|iPod|Android|webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        
        if (isMobile) {
            // На мобильных устройствах инициируем звонок
            window.location.href = `tel:${PHONE_NUMBER}`;
        } else {
            // На десктопе показываем модальное окно с номером
            showPhoneModal();
        }
    }

    // Функция для показа модального окна с номером
    function showPhoneModal() {
        // Проверяем, есть ли уже модальное окно
        let modal = document.getElementById('phone-modal');
        
        if (!modal) {
            // Создаем модальное окно
            modal = document.createElement('div');
            modal.id = 'phone-modal';
            modal.className = 'phone-modal';
            modal.innerHTML = `
                <div class="phone-modal-content">
                    <button class="phone-modal-close">&times;</button>
                    <h2>Позвоните нам</h2>
                    <p>Номер телефона:</p>
                    <a href="tel:${PHONE_NUMBER}" class="phone-link">${PHONE_DISPLAY}</a>
                    <p class="phone-hint">Нажмите на номер, чтобы позвонить</p>
                </div>
            `;
            document.body.appendChild(modal);
            
            // Обработка закрытия модального окна
            modal.querySelector('.phone-modal-close').addEventListener('click', () => {
                modal.style.display = 'none';
            });
            
            // Закрытие при клике вне окна
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.style.display = 'none';
                }
            });
        }
        
        modal.style.display = 'flex';
    }

    // Плавная прокрутка для ссылок
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Анимация появления элементов при прокрутке
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.8s ease-out';
        observer.observe(section);
    });
});
