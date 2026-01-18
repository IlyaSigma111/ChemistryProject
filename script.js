// Основные переменные
let currentTheme = 'light';
let quizData = [];
let currentQuestion = 0;
let score = 0;
let simulationInterval;

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    initTheme();
    initConcentrationSlider();
    initQuiz();
    initEventListeners();
    updateMoleculeAnimation();
});

// Инициализация темы (как у тебя)
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    
    document.getElementById('themeToggle').addEventListener('click', function() {
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    });
}

function setTheme(theme) {
    currentTheme = theme;
    document.body.className = theme === 'dark' ? 'dark-theme' : '';
    const icon = document.querySelector('#themeToggle i');
    icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

// Слайдер концентрации (аналогично твоему слайдеру частоты)
function initConcentrationSlider() {
    const slider = document.getElementById('concentrationSlider');
    const currentValue = document.getElementById('currentConcentration');
    
    slider.addEventListener('input', function() {
        const value = parseInt(this.value);
        currentValue.textContent = value + '%';
        
        // Обновляем цвет в зависимости от значения
        if (value < 30) {
            currentValue.style.color = '#27ae60'; // зеленый
        } else if (value < 70) {
            currentValue.style.color = '#f39c12'; // оранжевый
        } else {
            currentValue.style.color = '#e74c3c'; // красный
        }
    });
}

function updateMoleculeAnimation() {
    const atoms = document.querySelectorAll('.atom');
    
    atoms.forEach((atom, index) => {
        const speed = 3 + index * 0.5;
        atom.style.animationDuration = `${speed}s`;
    });
}

// Инициализация викторины (аналогично твоей)
function initQuiz() {
    quizData = [
        {
            question: "Где чаще всего содержатся фосфаты?",
            options: [
                "В натуральных фруктах",
                "В бытовой химии",
                "В чистой воде",
                "В минералах"
            ],
            correct: 1
        },
        {
            question: "Какой основной вред от фосфатов для экологии?",
            options: [
                "Укрепление почвы",
                "Цветение водоемов",
                "Очищение воздуха",
                "Увеличение урожая"
            ],
            correct: 1
        },
        {
            question: "Как обозначаются фосфаты в составе средств?",
            options: [
                "E100-E199",
                "Sodium Tripolyphosphate",
                "Aqua",
                "Parfum"
            ],
            correct: 1
        },
        {
            question: "Какая натуральная альтернатива моющим средствам?",
            options: [
                "Мыльные орехи",
                "Хлор",
                "Формальдегид",
                "Асбест"
            ],
            correct: 0
        },
        {
            question: "Почему фосфаты опасны для кожи?",
            options: [
                "Питают кожу",
                "Усиливают проникновение ПАВ",
                "Увлажняют",
                "Защищают от солнца"
            ],
            correct: 1
        }
    ];
    
    displayQuestion();
}

function displayQuestion() {
    const quizContainer = document.getElementById('quizContainer');
    const question = quizData[currentQuestion];
    
    quizContainer.innerHTML = `
        <div class="question">
            <h3>Вопрос ${currentQuestion + 1} из ${quizData.length}</h3>
            <p>${question.question}</p>
            <div class="options">
                ${question.options.map((option, index) => `
                    <div class="option" data-index="${index}">
                        ${option}
                    </div>
                `).join('')}
            </div>
            <button id="nextQuestion" class="cta-button" style="margin-top: 1rem;">
                ${currentQuestion === quizData.length - 1 ? 'Завершить викторину' : 'Следующий вопрос'}
            </button>
        </div>
    `;
    
    // Добавляем обработчики для вариантов ответа
    document.querySelectorAll('.option').forEach(option => {
        option.addEventListener('click', function() {
            document.querySelectorAll('.option').forEach(opt => {
                opt.classList.remove('selected');
            });
            this.classList.add('selected');
        });
    });
    
    // Обработчик для кнопки "Далее"
    document.getElementById('nextQuestion').addEventListener('click', checkAnswer);
}

function checkAnswer() {
    const selectedOption = document.querySelector('.option.selected');
    
    if (!selectedOption) {
        alert('Выберите ответ!');
        return;
    }
    
    const selectedIndex = parseInt(selectedOption.dataset.index);
    const correctIndex = quizData[currentQuestion].correct;
    
    // Показываем правильный/неправильный ответ
    document.querySelectorAll('.option').forEach((option, index) => {
        if (index === correctIndex) {
            option.classList.add('correct');
        } else if (index === selectedIndex && index !== correctIndex) {
            option.classList.add('wrong');
        }
        option.style.pointerEvents = 'none';
    });
    
    // Увеличиваем счет если ответ правильный
    if (selectedIndex === correctIndex) {
        score++;
    }
    
    // Переходим к следующему вопросу или показываем результаты
    setTimeout(() => {
        if (currentQuestion < quizData.length - 1) {
            currentQuestion++;
            displayQuestion();
        } else {
            showResults();
        }
    }, 2000);
}

function showResults() {
    const quizContainer = document.getElementById('quizContainer');
    const resultsContainer = document.getElementById('quizResults');
    const scoreElement = document.getElementById('score');
    const messageElement = document.getElementById('resultMessage');
    
    quizContainer.style.display = 'none';
    resultsContainer.style.display = 'block';
    
    scoreElement.textContent = score;
    
    // Генерируем сообщение в зависимости от результата
    let message = '';
    if (score === 5) {
        message = 'Отлично! Ты настоящий эксперт по фосфатам!';
    } else if (score >= 3) {
        message = 'Хорошо! Ты хорошо разбираешься в теме!';
    } else {
        message = 'Неплохо, но есть куда расти! Попробуй ещё раз.';
    }
    
    messageElement.textContent = message;
    
    // Обработчик для кнопки "Попробовать ещё раз"
    document.getElementById('retryQuiz').addEventListener('click', function() {
        currentQuestion = 0;
        score = 0;
        resultsContainer.style.display = 'none';
        quizContainer.style.display = 'block';
        displayQuestion();
    });
}

// Симуляция загрязнения воды (аналогично твоей симуляции эхолокации)
function initEventListeners() {
    // Кнопка "Начать исследование"
    document.getElementById('startJourney').addEventListener('click', function() {
        document.querySelector('#info').scrollIntoView({ 
            behavior: 'smooth' 
        });
    });
    
    // Кнопки симуляции
    document.querySelectorAll('.simulate-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const example = this.dataset.example;
            openSimulationModal(example);
        });
    });
    
    // Детектор фосфатов
    document.getElementById('scanProduct').addEventListener('click', scanProduct);
    
    // Закрытие модального окна
    document.getElementById('closeModal').addEventListener('click', closeModal);
    
    // Клик вне модального окна
    window.addEventListener('click', function(event) {
        const modal = document.getElementById('simulationModal');
        if (event.target === modal) {
            closeModal();
        }
    });
    
    // Версия для печати (как у тебя)
    document.getElementById('printBtn').addEventListener('click', function() {
        window.print();
    });
}

function openSimulationModal(type) {
    const modal = document.getElementById('simulationModal');
    const modalTitle = document.getElementById('modalTitle');
    const description = document.getElementById('simulationDescription');
    
    if (type === 'health') {
        modalTitle.textContent = 'Симуляция воздействия на организм';
        description.textContent = 'Показывает, как фосфаты проникают через кожу и накапливаются в органах.';
    } else {
        modalTitle.textContent = 'Симуляция загрязнения водоема';
        description.textContent = 'Демонстрирует процесс эвтрофикации водоема под воздействием фосфатов.';
    }
    
    modal.style.display = 'flex';
    
    // Инициализируем канвас для симуляции
    initSimulationCanvas(type);
}

function closeModal() {
    document.getElementById('simulationModal').style.display = 'none';
    if (simulationInterval) {
        clearInterval(simulationInterval);
    }
}

function initSimulationCanvas(type) {
    const canvas = document.getElementById('simulationCanvas');
    const ctx = canvas.getContext('2d');
    
    // Очищаем канвас
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Рисуем фон в зависимости от типа симуляции
    if (type === 'health') {
        drawHealthSimulation(ctx);
    } else {
        drawEcologySimulation(ctx);
    }
    
    // Обработчики для кнопок управления симуляцией
    document.getElementById('startSimulation').addEventListener('click', function() {
        startSimulation(type);
    });
    
    document.getElementById('resetSimulation').addEventListener('click', function() {
        initSimulationCanvas(type);
    });
}

function drawHealthSimulation(ctx) {
    const canvas = ctx.canvas;
    
    // Рисуем фон
    ctx.fillStyle = '#f8f9fa';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Рисуем схему тела
    ctx.strokeStyle = '#3498db';
    ctx.lineWidth = 2;
    
    // Голова
    ctx.beginPath();
    ctx.arc(400, 100, 40, 0, Math.PI * 2);
    ctx.stroke();
    
    // Тело
    ctx.beginPath();
    ctx.moveTo(400, 140);
    ctx.lineTo(400, 300);
    ctx.stroke();
    
    // Руки
    ctx.beginPath();
    ctx.moveTo(400, 180);
    ctx.lineTo(300, 220);
    ctx.moveTo(400, 180);
    ctx.lineTo(500, 220);
    ctx.stroke();
    
    // Ноги
    ctx.beginPath();
    ctx.moveTo(400, 300);
    ctx.lineTo(350, 380);
    ctx.moveTo(400, 300);
    ctx.lineTo(450, 380);
    ctx.stroke();
    
    // Органы
    const organs = [
        {x: 400, y: 180, r: 25, name: 'Легкие', color: '#e74c3c'},
        {x: 400, y: 230, r: 20, name: 'Сердце', color: '#c0392b'},
        {x: 400, y: 280, r: 30, name: 'Печень', color: '#d35400'},
        {x: 370, y: 270, r: 15, name: 'Почки', color: '#8e44ad'}
    ];
    
    organs.forEach(organ => {
        ctx.fillStyle = organ.color;
        ctx.beginPath();
        ctx.arc(organ.x, organ.y, organ.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
    });
}

function drawEcologySimulation(ctx) {
    const canvas = ctx.canvas;
    
    // Рисуем фон - небо
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#87CEEB');
    gradient.addColorStop(1, '#E0F7FA');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Рисуем солнце
    ctx.fillStyle = '#FFD700';
    ctx.beginPath();
    ctx.arc(700, 80, 40, 0, Math.PI * 2);
    ctx.fill();
    
    // Рисуем водоем
    ctx.fillStyle = '#1E90FF';
    ctx.fillRect(0, canvas.height - 200, canvas.width, 200);
    
    // Рисуем траву
    ctx.fillStyle = '#2E8B57';
    ctx.fillRect(0, canvas.height - 200, canvas.width, 20);
    
    // Рисуем несколько деревьев
    for (let i = 0; i < 5; i++) {
        const x = 100 + i * 150;
        drawTree(ctx, x, canvas.height - 200);
    }
}

function drawTree(ctx, x, y) {
    // Ствол
    ctx.fillStyle = '#8B4513';
    ctx.fillRect(x - 10, y - 80, 20, 80);
    
    // Крона
    ctx.fillStyle = '#228B22';
    ctx.beginPath();
    ctx.arc(x, y - 120, 40, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(x - 25, y - 90, 35, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(x + 25, y - 90, 35, 0, Math.PI * 2);
    ctx.fill();
}

function startSimulation(type) {
    const canvas = document.getElementById('simulationCanvas');
    const ctx = canvas.getContext('2d');
    const speed = parseInt(document.getElementById('simulationSpeed').value);
    
    if (type === 'health') {
        startHealthSimulation(ctx, speed);
    } else {
        startEcologySimulation(ctx, speed);
    }
}

function startHealthSimulation(ctx, speed) {
    const canvas = ctx.canvas;
    let particles = [];
    
    // Создаем частицы фосфатов
    for (let i = 0; i < 50; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: canvas.height + Math.random() * 100,
            size: 2 + Math.random() * 4,
            speed: 1 + Math.random() * 2,
            color: `rgba(52, 152, 219, ${0.5 + Math.random() * 0.5})`,
            targetX: 300 + Math.random() * 200,
            targetY: 100 + Math.random() * 200,
            arrived: false
        });
    }
    
    if (simulationInterval) {
        clearInterval(simulationInterval);
    }
    
    simulationInterval = setInterval(function() {
        // Очищаем канвас
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Перерисовываем фон
        drawHealthSimulation(ctx);
        
        // Обновляем и рисуем частицы
        particles.forEach(particle => {
            if (!particle.arrived) {
                // Двигаем частицу к цели
                const dx = particle.targetX - particle.x;
                const dy = particle.targetY - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance > 5) {
                    particle.x += (dx / distance) * particle.speed * speed;
                    particle.y += (dy / distance) * particle.speed * speed;
                } else {
                    particle.arrived = true;
                }
            }
            
            // Рисуем частицу
            ctx.fillStyle = particle.color;
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fill();
            
            // Добавляем свечение
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(52, 152, 219, 0.2)`;
            ctx.fill();
        });
        
        // Если все частицы прибыли, создаем новые
        if (particles.every(p => p.arrived)) {
            particles.forEach(particle => {
                particle.arrived = false;
                particle.x = Math.random() * canvas.width;
                particle.y = canvas.height + Math.random() * 100;
            });
        }
    }, 50);
}

function startEcologySimulation(ctx, speed) {
    const canvas = ctx.canvas;
    let algae = [];
    let fish = [];
    let pollutionLevel = 0;
    
    // Создаем водоросли
    for (let i = 0; i < 20; i++) {
        algae.push({
            x: Math.random() * canvas.width,
            y: canvas.height - 180 + Math.random() * 160,
            size: 5 + Math.random() * 10,
            growth: 0.5 + Math.random() * 0.5
        });
    }
    
    // Создаем рыб
    for (let i = 0; i < 10; i++) {
        fish.push({
            x: Math.random() * canvas.width,
            y: canvas.height - 180 + Math.random() * 160,
            size: 8 + Math.random() * 6,
            speed: 1 + Math.random() * 2,
            direction: Math.random() * Math.PI * 2,
            alive: true
        });
    }
    
    if (simulationInterval) {
        clearInterval(simulationInterval);
    }
    
    simulationInterval = setInterval(function() {
        // Очищаем канвас
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Перерисовываем фон
        drawEcologySimulation(ctx);
        
        // Увеличиваем уровень загрязнения
        pollutionLevel += 0.01 * speed;
        
        // Обновляем и рисуем водоросли
        algae.forEach(alga => {
            // Водоросли растут быстрее при загрязнении
            alga.size += alga.growth * pollutionLevel * 0.1;
            
            // Рисуем водоросль
            ctx.fillStyle = pollutionLevel > 50 ? '#d4edda' : '#90EE90';
            ctx.beginPath();
            ctx.arc(alga.x, alga.y, alga.size, 0, Math.PI * 2);
            ctx.fill();
            
            // Стебель
            ctx.fillStyle = '#228B22';
            ctx.fillRect(alga.x - 2, alga.y, 4, 20);
        });
        
        // Обновляем и рисуем рыб
        fish.forEach(fish => {
            if (fish.alive) {
                // Рыба двигается
                fish.x += Math.cos(fish.direction) * fish.speed;
                fish.y += Math.sin(fish.direction) * fish.speed;
                
                // Отскок от границ
                if (fish.x < 0 || fish.x > canvas.width) {
                    fish.direction = Math.PI - fish.direction;
                }
                if (fish.y < canvas.height - 200 || fish.y > canvas.height) {
                    fish.direction = -fish.direction;
                }
                
                // Рыба умирает при высоком загрязнении
                if (pollutionLevel > 70 && Math.random() < 0.01) {
                    fish.alive = false;
                }
                
                // Рисуем живую рыбу
                ctx.fillStyle = fish.alive ? '#FFD700' : '#808080';
                ctx.beginPath();
                ctx.ellipse(fish.x, fish.y, fish.size, fish.size / 2, fish.direction, 0, Math.PI * 2);
                ctx.fill();
                
                // Глаз
                ctx.fillStyle = 'white';
                ctx.beginPath();
                ctx.arc(fish.x + fish.size * 0.6, fish.y, 2, 0, Math.PI * 2);
                ctx.fill();
            } else {
                // Рисуем мертвую рыбу
                ctx.fillStyle = '#808080';
                ctx.beginPath();
                ctx.ellipse(fish.x, fish.y, fish.size, fish.size / 2, 0, 0, Math.PI * 2);
                ctx.fill();
            }
        });
        
        // Отображаем уровень загрязнения
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(10, 10, 200, 30);
        ctx.fillStyle = 'white';
        ctx.font = '16px Arial';
        ctx.fillText(`Загрязнение: ${Math.min(100, Math.round(pollutionLevel))}%`, 20, 30);
        
        // Цвет воды становится зеленее при загрязнении
        const waterColor = pollutionLevel > 50 ? '#32CD32' : '#1E90FF';
        ctx.fillStyle = waterColor;
        ctx.globalAlpha = 0.3 + pollutionLevel * 0.007;
        ctx.fillRect(0, canvas.height - 200, canvas.width, 200);
        ctx.globalAlpha = 1.0;
    }, 100);
}

// Симуляция загрязнения воды (упрощенная версия)
function startPollutionSim() {
    const phosValue = parseInt(document.getElementById('phosSlider').value);
    const timeValue = parseInt(document.getElementById('timeDisplay').textContent);
    
    const phosphates = document.getElementById('phosphates');
    const algae = document.getElementById('algae');
    const fish = document.getElementById('fish');
    
    // Очищаем предыдущую анимацию
    phosphates.innerHTML = '';
    algae.innerHTML = '';
    fish.innerHTML = '';
    
    // Создаем частицы фосфатов
    for (let i = 0; i < phosValue / 5; i++) {
        const phos = document.createElement('div');
        phos.className = 'phos-particle';
        phos.style.left = Math.random() * 100 + '%';
        phos.style.bottom = Math.random() * 80 + '%';
        phos.style.width = Math.random() * 10 + 5 + 'px';
        phos.style.height = phos.style.width;
        phos.style.backgroundColor = 'rgba(155, 89, 182, 0.7)';
        phos.style.borderRadius = '50%';
        phos.style.position = 'absolute';
        phosphates.appendChild(phos);
    }
    
    // Водоросли появляются со временем
    setTimeout(() => {
        for (let i = 0; i < phosValue / 10; i++) {
            const alga = document.createElement('div');
            alga.className = 'algae-particle';
            alga.style.left = Math.random() * 100 + '%';
            alga.style.bottom = Math.random() * 60 + '%';
            alga.style.width = Math.random() * 20 + 10 + 'px';
            alga.style.height = Math.random() * 40 + 20 + 'px';
            alga.style.backgroundColor = '#27ae60';
            alga.style.borderRadius = '50% 50% 0 0';
            alga.style.position = 'absolute';
            algae.appendChild(alga);
        }
    }, 1000);
    
    // Рыбы исчезают при высоком загрязнении
    if (phosValue < 60) {
        for (let i = 0; i < 5 - phosValue / 20; i++) {
            const fishElement = document.createElement('div');
            fishElement.className = 'fish-particle';
            fishElement.style.left = Math.random() * 100 + '%';
            fishElement.style.bottom = Math.random() * 70 + '%';
            fishElement.style.width = '30px';
            fishElement.style.height = '15px';
            fishElement.style.backgroundColor = '#f39c12';
            fishElement.style.borderRadius = '50%';
            fishElement.style.position = 'absolute';
            fishElement.style.animation = `swim ${3 + Math.random() * 4}s linear infinite`;
            fish.appendChild(fishElement);
        }
    }
}

function changeTime(delta) {
    const timeDisplay = document.getElementById('timeDisplay');
    let currentTime = parseInt(timeDisplay.textContent);
    currentTime = Math.max(10, Math.min(365, currentTime + delta));
    timeDisplay.textContent = currentTime + ' дней';
}

// Сканирование продукта
function scanProduct() {
    const product = document.getElementById('productSelect').value;
    const screen = document.getElementById('detectorScreen');
    
    screen.innerHTML = '';
    
    // Создаем "сканирующую" линию
    const scanLine = document.createElement('div');
    scanLine.className = 'scan-line';
    screen.appendChild(scanLine);
    
    // Показываем результат через 2 секунды
    setTimeout(() => {
        scanLine.remove();
        
        let result = '';
        let color = '';
        
        switch(product) {
            case 'powder':
                result = '⚠️ Высокое содержание фосфатов: 65%';
                color = '#e74c3c';
                break;
            case 'detergent':
                result = '⚠️ Среднее содержание фосфатов: 45%';
                color = '#f39c12';
                break;
            case 'shampoo':
                result = '⚠️ Низкое содержание фосфатов: 20%';
                color = '#f1c40f';
                break;
            case 'eco':
                result = '✅ Без фосфатов: 0%';
                color = '#27ae60';
                break;
        }
        
        screen.innerHTML = `
            <div style="color: ${color}; font-size: 1.2rem; text-align: center; padding: 2rem;">
                <h3>Результат сканирования</h3>
                <p style="font-size: 1.5rem; margin: 1rem 0;">${result}</p>
                <p style="font-size: 0.9rem; opacity: 0.8;">Рекомендация: ${getRecommendation(product)}</p>
            </div>
        `;
    }, 2000);
}

function getRecommendation(product) {
    switch(product) {
        case 'powder':
            return 'Заменить на эко-порошок';
        case 'detergent':
            return 'Использовать реже или заменить';
        case 'shampoo':
            return 'Приемлемо, но лучше найти альтернативу';
        case 'eco':
            return 'Отличный выбор!';
        default:
            return 'Проверьте состав';
    }
}

// Поделиться проектом
function shareProject() {
    if (navigator.share) {
        navigator.share({
            title: 'Проект: Защита от фосфатов',
            text: 'Интересный школьный проект по химии о защите от фосфатов',
            url: window.location.href
        });
    } else {
        navigator.clipboard.writeText(window.location.href)
            .then(() => alert('Ссылка скопирована в буфер обмена!'))
            .catch(() => alert('Не удалось скопировать ссылку'));
    }
}

// CSS анимации для частиц
const style = document.createElement('style');
style.textContent = `
    @keyframes swim {
        0% { transform: translateX(-100px) rotateY(0); }
        49% { transform: translateX(calc(100vw - 150px)) rotateY(0); }
        50% { transform: translateX(calc(100vw - 150px)) rotateY(180deg); }
        99% { transform: translateX(-100px) rotateY(180deg); }
        100% { transform: translateX(-100px) rotateY(0); }
    }
    
    .phos-particle {
        animation: float-up 3s ease-in infinite;
    }
    
    @keyframes float-up {
        0% { transform: translateY(0); opacity: 0; }
        10% { opacity: 1; }
        90% { opacity: 1; }
        100% { transform: translateY(-100px); opacity: 0; }
    }
`;
document.head.appendChild(style);
