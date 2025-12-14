const cardsData = [
    { name: "The Fool", image: "images/the_fool.jpg", meaning: "Новый старт, беззаботность." },
    { name: "The Magician", image: "images/the_magician.jpg", meaning: "Власть, способности." },
    { name: "The High Priestess", image: "images/the_high_priestess.jpg", meaning: "Интуиция, тайны." },
    { name: "The Empress", image: "images/the_empress.jpg", meaning: "Творчество, любовь." },
    { name: "The Emperor", image: "images/the_emperor.jpg", meaning: "Контроль, структура." },
    { name: "The Hierophant", image: "images/the_hierophant.jpg", meaning: "Традиции, учение." },
    { name: "The Lovers", image: "images/the_lovers.jpg", meaning: "Выбор, любовь." },
    { name: "The Chariot", image: "images/the_chariot.jpg", meaning: "Победа, движение." },
    { name: "Strength", image: "images/strength.jpg", meaning: "Сила, терпение." },
    { name: "The Hermit", image: "images/the_hermit.jpg", meaning: "Уединение, мудрость." },
    { name: "Wheel of Fortune", image: "images/wheel_of_fortune.jpg", meaning: "Перемены, судьба." },
    { name: "Justice", image: "images/justice.jpg", meaning: "Честность, баланс." },
    { name: "The Hanged Man", image: "images/the_hanged_man.jpg", meaning: "Жертва, переоценка." },
    { name: "Death", image: "images/death.jpg", meaning: "Конец, трансформация." },
    { name: "Temperance", image: "images/temperance.jpg", meaning: "Баланс, гармония." },
    { name: "The Devil", image: "images/the_devil.jpg", meaning: "Зависимость, страх." },
    { name: "The Tower", image: "images/the_tower.jpg", meaning: "Разрушение, пробуждение." },
    { name: "The Star", image: "images/the_star.jpg", meaning: "Надежда, исцеление." },
    { name: "The Moon", image: "images/the_moon.jpg", meaning: "Иллюзии, подсознание." },
    { name: "The Sun", image: "images/the_sun.jpg", meaning: "Радость, успех." },
    { name: "Judgement", image: "images/judgement.jpg", meaning: "Пробуждение, возрождение." },
    { name: "The World", image: "images/the_world.jpg", meaning: "Завершение, целостность." }
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
        cardElement.innerHTML = `
            <div class="card-inner">
                <div class="card-front">
                    <img src="${card.image}" alt="${card.name}">
                    <div class="name">${card.name}</div>
                </div>
                <div class="card-back">
                    <div class="name">${card.name}</div>
                    <div class="meaning">${card.meaning}</div>
                </div>
            </div>
        `;
        cardElement.addEventListener('click', () => flipCard(cardElement, index));
        cardsContainer.appendChild(cardElement);
    });
}

function flipCard(cardElement, index) {
    cardElement.classList.toggle('flipped');
}

function revealAllCards() {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.classList.add('flipped');
    });
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
