// Получаем модальное окно по id.
const orderDialog = document.getElementById('order-dialog');

// Получаем все кнопки заказа в карточках товаров.
const orderButtons = document.querySelectorAll('.product-card__button');

// Получаем кнопку закрытия модального окна.
const closeDialogButton = document.getElementById('close-order-dialog');

// Получаем скрытое поле, в которое будет записан выбранный товар.
const selectedProductInput = document.getElementById('selected-product');

// Перебираем все кнопки «Заказать».
orderButtons.forEach((button) => {
  button.addEventListener('click', () => {
    // Получаем название товара из data-атрибута.
    const productName = button.dataset.product;

    // Записываем название товара в скрытое поле формы.
    if (selectedProductInput) {
      selectedProductInput.value = productName;
    }

    // Открываем модальное окно.
    if (orderDialog) {
      orderDialog.showModal();
    }
  });
});

// Закрываем модальное окно по кнопке «Закрыть».
if (closeDialogButton && orderDialog) {
  closeDialogButton.addEventListener('click', () => {
    orderDialog.close();
  });
}

// Получаем форму заявки.
const orderForm = document.getElementById('order-form');

// Получаем сообщение об успешной отправке.
const successMessage = document.getElementById('success-message');

// Обрабатываем отправку формы.
if (orderForm) {
  orderForm.addEventListener('submit', (event) => {
    // Отменяем стандартную отправку формы,
    // потому что backend пока не подключён.
    event.preventDefault();

    // Сбрасываем предыдущие признаки ошибок.
    const formElements = Array.from(orderForm.elements);

    formElements.forEach((element) => {
      if (element.willValidate) {
        element.removeAttribute('aria-invalid');
      }
    });

    // Проверяем встроенные HTML-ограничения формы.
    if (!orderForm.checkValidity()) {
      formElements.forEach((element) => {
        if (element.willValidate && !element.checkValidity()) {
          element.setAttribute('aria-invalid', 'true');
        }
      });

      // Показываем стандартные сообщения браузера.
      orderForm.reportValidity();
      return;
    }

    // Показываем сообщение об успешной отправке.
    if (successMessage) {
      successMessage.hidden = false;
    }

    // Очищаем форму.
    orderForm.reset();

    // Закрываем модальное окно, если оно открыто.
    if (orderDialog && orderDialog.open) {
      orderDialog.close();
    }
  });
}

// Переключение темы.

const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle ? themeToggle.querySelector('.theme-toggle__icon') : null;
const themeText = themeToggle ? themeToggle.querySelector('.theme-toggle__text') : null;

const storedTheme = localStorage.getItem('theme');

if (storedTheme === 'dark') {
  document.documentElement.setAttribute('data-theme', 'dark');
} else if (storedTheme === 'light') {
  document.documentElement.setAttribute('data-theme', 'light');
}

function updateToggleLabel() {
  if (!themeIcon || !themeText) {
    return;
  }

  const current = document.documentElement.getAttribute('data-theme');

  const isDark =
    current === 'dark' ||
    (current !== 'light' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  if (isDark) {
    themeIcon.textContent = '☀️';
    themeText.textContent = 'Светлая тема';
  } else {
    themeIcon.textContent = '🌙';
    themeText.textContent = 'Тёмная тема';
  }
}

if (themeToggle) {
  updateToggleLabel();

  themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');

    const isDark =
      current === 'dark' ||
      (current !== 'light' && window.matchMedia('(prefers-color-scheme: dark)').matches);

    const next = isDark ? 'light' : 'dark';

    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);

    updateToggleLabel();
  });
}