// Плавная прокрутка
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    section.scrollIntoView({ behavior: 'smooth' });
}

// Данные викторины
const quizData = [
    {
        question: "Где чаще всего содержатся фосфаты?",
        options: ["Во фруктах", "В бытовой химии", "В воде", "В воздухе"],
        correct: 1,
        explanation: "Правильно! Фосфаты активно добавляют в стиральные порошки, моющие средства и другую бытовую химию."
    },
    {
        question: "Какой основной вред от фосфатов для экологии?",
        options: ["Укрепление почвы", "Цветение водоемов", "Очищение воздуха", "Увеличение урожая"],
        correct: 1,
        explanation: "Верно! Фосфаты вызывают эвтрофикацию - бурный рост водорослей, что приводит к гибели рыбы."
    },
    {
        question: "Как обозначаются фосфаты в составе средств?",
        options: ["E100-E199", "Sodium Tripolyphosphate", "Aqua", "Parfum"],
        correct: 1,
        explanation: "Правильно! Sodium Tripolyphosphate - одно из распространенных названий фосфатов."
    },
    {
        question: "Какая натуральная альтернатива моющим средствам?",
        options: ["Мыльные орехи", "Хлор", "Формальдегид", "Асбест"],
        correct: 0,
        explanation: "Верно! Мыльные орехи - полностью натуральное и безопасное средство для стирки."
    },
    {
        question: "Почему фосфаты опасны для кожи?",
        options: ["Питают кожу", "Усиливают проникновение ПАВ", "Увлажняют", "Защищают от солнца"],
        correct: 1,
        explanation: "Правильно! Фосфаты разрушают защитный барьер кожи и усиливают проникновение вредных веществ."
    }
];

// Переменные викторины
let currentQuestion = 0;
let score = 0;
let quizCompleted = false;

// Инициализация
document.addEventListener('DOMContentLoaded', function() {
    loadQuestion();
    setupOrganHover();
});

// Органы тела
function setupOrganHover() {
    const organs = document.querySelectorAll('.organ');
    const organInfo = {
        'легкие': 'Фосфаты вызывают раздражение слизистых, могут спровоцировать астму и бронхиты.',
        'сердце': 'Нарушают обмен веществ, повышают риск сердечно-сосудистых заболеваний.',
        'кожа': 'Вызывают аллергии, дерматиты, разрушают защитный барьер кожи.',
        'почки': 'Создают дополнительную нагрузку на почки, нарушают их функцию.'
    };
    
    organs.forEach(organ => {
        organ.addEventListener('mouseenter', function() {
            const organName = this.getAttribute('data-organ');
            this.setAttribute('title', organInfo[organName]);
        });
        
        organ.addEventListener('click', function() {
            const organName = this.getAttribute('data-organ');
            alert(`${organName.toUpperCase()}: ${organInfo[organName]}`);
        });
    });
}

// Викторина
function loadQuestion() {
    if (currentQuestion >= quizData.length) {
        showResults();
        return;
    }
    
    const question = quizData[currentQuestion];
    document.getElementById('question').textContent = question.question;
    
    const options = document.querySelectorAll('.option');
    options.forEach((option, index) => {
        option.textContent = question.options[index];
        option.className = 'option';
        option.disabled = false;
    });
    
    document.getElementById('feedback').style.display = 'none';
    document.getElementById('nextBtn').style.display = 'none';
}

function checkAnswer(selectedIndex) {
    const question = quizData[currentQuestion];
    const options = document.querySelectorAll('.option');
    const feedback = document.getElementById('feedback');
    
    // Отключить все кнопки
    options.forEach(opt => opt.disabled = true);
    
    if (selectedIndex === question.correct) {
        options[selectedIndex].classList.add('correct');
        score++;
        feedback.innerHTML = `<span style="color: green;">✓ ${question.explanation}</span>`;
    } else {
        options[selectedIndex].classList.add('wrong');
        options[question.correct].classList.add('correct');
        feedback.innerHTML = `<span style="color: red;">✗ ${question.explanation}</span>`;
    }
    
    feedback.style.display = 'block';
    document.getElementById('nextBtn').style.display = 'block';
    updateScore();
}

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < quizData.length) {
        loadQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    const percentage = (score / quizData.length) * 100;
    let message = '';
    
    if (percentage === 100) {
        message = '🎉 Отлично! Ты эксперт по фосфатам!';
    } else if (percentage >= 70) {
        message = '👍 Хорошо! Ты много знаешь о фосфатах!';
    } else {
        message = '📚 Неплохо, но есть куда расти!';
    }
    
    document.querySelector('.quiz-content').innerHTML = `
        <h3>Викторина завершена!</h3>
        <p>${message}</p>
        <p>Твой результат: <strong>${score} из ${quizData.length}</strong></p>
        <p>Это <strong>${percentage}%</strong> правильных ответов!</p>
        <button class="next-btn" onclick="restartQuiz()">Пройти еще раз</button>
    `;
    
    quizCompleted = true;
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    quizCompleted = false;
    document.querySelector('.quiz-content').innerHTML = `
        <h3 id="question"></h3>
        <div class="options">
            <button class="option" onclick="checkAnswer(0)"></button>
            <button class="option" onclick="checkAnswer(1)"></button>
            <button class="option" onclick="checkAnswer(2)"></button>
            <button class="option" onclick="checkAnswer(3)"></button>
        </div>
        <div class="quiz-feedback" id="feedback"></div>
        <button class="next-btn" onclick="nextQuestion()" id="nextBtn">Далее</button>
    `;
    loadQuestion();
    updateScore();
}

function updateScore() {
    document.querySelector('.score').textContent = `${score}/${quizData.length}`;
}

// Факты
const facts = [
    "В Европе фосфаты в бытовой химии запрещены с 2013 года!",
    "Один грамм фосфатов стимулирует рост 5-10 кг водорослей!",
    "Детская одежда, постиранная порошком с фосфатами, может вызывать аллергию у 80% детей.",
    "Фосфаты могут накапливаться в организме и вызывать нарушения обмена кальция.",
    "Производители добавляют фосфаты, потому что это самый дешевый способ смягчения воды."
];

function changeFact() {
    const randomIndex = Math.floor(Math.random() * facts.length);
    document.getElementById('fact').textContent = facts[randomIndex];
}

// Поделиться проектом
function shareProject() {
    if (navigator.share) {
        navigator.share({
            title: 'Фосфаты: Защита для 9 класса',
            text: 'Интересный проект о защите от фосфатов!',
            url: window.location.href
        });
    } else {
        navigator.clipboard.writeText(window.location.href);
        alert('Ссылка скопирована в буфер обмена!');
    }
}

// Навигация
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        scrollToSection(targetId.substring(1));
    });
});

// Мобильное меню
document.querySelector('.menu-btn').addEventListener('click', function() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
});
