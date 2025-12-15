const cardsData = [
    { name: "The Fool", name_ru: "Шут", image: "images/the_fool.jpg", meaning: "Новый старт, беззаботность." },
    { name: "The Magician", name_ru: "Маг", image: "images/the_magician.jpg", meaning: "Власть, способности." },
    { name: "The High Priestess", name_ru: "Жрица", image: "images/the_high_priestess.jpg", meaning: "Интуиция, тайны." },
    { name: "The Empress", name_ru: "Императрица", image: "images/the_empress.jpg", meaning: "Творчество, любовь." },
    { name: "The Emperor", name_ru: "Император", image: "images/the_emperor.jpg", meaning: "Контроль, структура." },
    { name: "The Hierophant", name_ru: "Иерофант", image: "images/the_hierophant.jpg", meaning: "Традиции, учение." },
    { name: "The Lovers", name_ru: "Влюблённые", image: "images/the_lovers.jpg", meaning: "Выбор, любовь." },
    { name: "The Chariot", name_ru: "Колесница", image: "images/the_chariot.jpg", meaning: "Победа, движение." },
    { name: "Strength", name_ru: "Сила", image: "images/strength.jpg", meaning: "Сила, терпение." },
    { name: "The Hermit", name_ru: "Отшельник", image: "images/the_hermit.jpg", meaning: "Уединение, мудрость." },
    { name: "Wheel of Fortune", name_ru: "Колесо Фортуны", image: "images/wheel_of_fortune.jpg", meaning: "Перемены, судьба." },
    { name: "Justice", name_ru: "Справедливость", image: "images/justice.jpg", meaning: "Честность, баланс." },
    { name: "The Hanged Man", name_ru: "Повешенный", image: "images/the_hanged_man.jpg", meaning: "Жертва, переоценка." },
    { name: "Death", name_ru: "Смерть", image: "images/death.jpg", meaning: "Конец, трансформация." },
    { name: "Temperance", name_ru: "Умеренность", image: "images/temperance.jpg", meaning: "Баланс, гармония." },
    { name: "The Devil", name_ru: "Дьявол", image: "images/the_devil.jpg", meaning: "Зависимость, страх." },
    { name: "The Tower", name_ru: "Башня", image: "images/the_tower.jpg", meaning: "Разрушение, пробуждение." },
    { name: "The Star", name_ru: "Звезда", image: "images/the_star.jpg", meaning: "Надежда, исцеление." },
    { name: "The Moon", name_ru: "Луна", image: "images/the_moon.jpg", meaning: "Иллюзии, подсознание." },
    { name: "The Sun", name_ru: "Солнце", image: "images/the_sun.jpg", meaning: "Радость, успех." },
    { name: "Judgement", name_ru: "Суд", image: "images/judgement.jpg", meaning: "Пробуждение, возрождение." },
    { name: "The World", name_ru: "Мир", image: "images/the_world.jpg", meaning: "Завершение, целостность." }
];

let selectedSpread = null;
let selectedCards = [];

function startSpread(spreadType) {
    selectedSpread = spreadType;
    document.getElementById('spread-selector').classList.add('hidden');
    document.getElementById('loading').classList.remove('hidden');

    // Имитация загрузки с анимацией
    setTimeout(() => {
        generateCards();
        document.getElementById('loading').classList.add('hidden');
        document.getElementById('cards-container').classList.remove('hidden');
        document.getElementById('spread-title').innerText = `Расклад: ${getSpreadName(spreadType)}`;
        
        // Обновляем счетчик карт
        const cardCount = selectedCards.length;
        document.getElementById('card-count').innerText = `Карты: ${cardCount}`;
    }, 1500);
}

function getSpreadName(type) {
    const names = {
        daily: "Карта дня",
        yes_no: "Да/Нет",
        relations: "Отношения",
        finance: "Финансы",
        month: "Месяц",
        three_months: "3 месяца",
        when: "Когда?"
    };
    return names[type] || type;
}

function generateCards() {
    let count = 1;
    if (selectedSpread === 'yes_no') count = 1;
    else if (['relations', 'finance', 'when'].includes(selectedSpread)) count = 3;
    else if (selectedSpread === 'month') count = 5;
    else if (selectedSpread === 'three_months') count = 7;

    selectedCards = [];
    for (let i = 0; i < count; i++) {
        const randomCard = cardsData[Math.floor(Math.random() * cardsData.length)];
        selectedCards.push(randomCard);
    }

    renderCards();
}

function renderCards() {
    const cardsContainer = document.getElementById('cards');
    cardsContainer.innerHTML = '';

    selectedCards.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.className = 'card';
        
        // Создаем внутреннюю структуру для переворота
        cardElement.innerHTML = `
            <div class="card-inner">
                <!-- Обратная сторона карты -->
                <div class="card-back-side">
                    <div class="back-pattern"></div>
                </div>
                <!-- Лицевая сторона карты -->
                <div class="card-front-side">
                    <div class="card-image-container">
                        <img src="${card.image}" alt="${card.name}" onerror="this.src='https://via.placeholder.com/150?text=Карта'">
                    </div>
                    <div class="card-text-container">
                        <div class="name">${card.name}</div>
                        <div class="name-ru">${card.name_ru || ''}</div>
                    </div>
                </div>
            </div>
        `;
        
        // Добавляем обработчик клика для переворота
        cardElement.addEventListener('click', () => flipCard(cardElement, index));
        cardsContainer.appendChild(cardElement);
    });
}

// Функция для переворота одной карты
function flipCard(cardElement, index) {
    cardElement.classList.toggle('flipped');
}

// Функция для показа всех карт по очереди
function revealAllCards() {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('flipped');
        }, index * 200); // Задержка 200мс между картами
    });
}

// Функция для возврата к выбору раскладов
function goBackToSpreads() {
    // Скрываем контейнер с картами и загрузкой
    document.getElementById('cards-container').classList.add('hidden');
    document.getElementById('loading').classList.add('hidden');
    
    // Показываем селектор раскладов
    document.getElementById('spread-selector').classList.remove('hidden');
    
    // Очищаем текущий расклад
    selectedSpread = null;
    selectedCards = [];
}

// Добавляем анимацию при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Анимация для заголовка
    const header = document.querySelector('.header h1');
    header.style.opacity = '0';
    header.style.transform = 'translateY(-20px)';
    header.style.transition = 'opacity 1s ease, transform 1s ease';
    
    setTimeout(() => {
        header.style.opacity = '1';
        header.style.transform = 'translateY(0)';
    }, 500);
    
    // Анимация для кнопок
    const buttons = document.querySelectorAll('.spread-button');
    buttons.forEach((button, index) => {
        button.style.opacity = '0';
        button.style.transform = 'translateY(20px)';
        button.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
        
        setTimeout(() => {
            button.style.opacity = '1';
            button.style.transform = 'translateY(0)';
        }, 600 + index * 50);
    });
});
