// Основной файл JavaScript для проекта "Защита от фосфатов"

// Конфигурация проекта
const CONFIG = {
    sounds: true,
    animations: true,
    darkMode: false,
    vibration: true
};

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    initProject();
});

// Основная функция инициализации
function initProject() {
    // Скрыть прелоадер
    hidePreloader();
    
    // Инициализировать компоненты
    initNavigation();
    initAnimations();
    initParticles();
    initQuiz();
    initSimulator();
    initLab();
    initCounters();
    initTheme();
    initSounds();
    
    // Запустить демо-анимации
    startDemoAnimations();
    
    // Установить обработчики событий
    setupEventListeners();
}

// ============ ПРЕЛОАДЕР ============
function hidePreloader() {
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.style.opacity = '0';
        preloader.style.visibility = 'hidden';
        
        // Воспроизвести звук загрузки
        if (CONFIG.sounds) {
            playSound('success');
        }
        
        // Показать уведомление
        showNotification('Добро пожаловать в исследование фосфатов!');
    }, 2000);
}

// ============ НАВИГАЦИЯ ============
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const menuToggle = document.getElementById('menuToggle');
    const closeMenu = document.getElementById('closeMenu');
    const mobileMenu = document.getElementById('mobileMenu');
    
    // Плавная прокрутка для навигации
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Закрыть мобильное меню
                mobileMenu.classList.remove('active');
                
                // Прокрутить к секции
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Активировать ссылку
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
                
                // Воспроизвести звук
                if (CONFIG.sounds) {
                    playSound('click');
                }
            }
        });
    });
    
    // Открыть/закрыть мобильное меню
    menuToggle.addEventListener('click', function() {
        mobileMenu.classList.add('active');
        playSound('click');
    });
    
    closeMenu.addEventListener('click', function() {
        mobileMenu.classList.remove('active');
        playSound('click');
    });
    
    // Закрыть меню при клике снаружи
    document.addEventListener('click', function(e) {
        if (!mobileMenu.contains(e.target) && !menuToggle.contains(e.target)) {
            mobileMenu.classList.remove('active');
        }
    });
    
    // Изменение навигации при скролле
    window.addEventListener('scroll', function() {
        const navbar = document.getElementById('navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
        
        // Обновить активную секцию
        updateActiveSection();
    });
}

function updateActiveSection() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// ============ АНИМАЦИИ ============
function initAnimations() {
    // Анимация молекулы в герое
    initMoleculeAnimation();
    
    // Анимация при скролле
    initScrollAnimations();
    
    // Анимация пульсации
    initPulseAnimations();
    
    // Анимация индикаторов
    initIndicatorAnimations();
}

function initMoleculeAnimation() {
    const molecule = document.getElementById('moleculeAnimation');
    if (!molecule) return;
    
    // Создать анимацию молекулы
    const atoms = ['P', 'O', 'O', 'O', 'O'];
    const bonds = 8;
    
    molecule.innerHTML = '';
    
    // Создать атомы
    atoms.forEach((atom, index) => {
        const atomElement = document.createElement('div');
        atomElement.className = `atom atom-${index}`;
        atomElement.innerHTML = `<span>${atom}</span>`;
        atomElement.style.setProperty('--delay', `${index * 0.2}s`);
        molecule.appendChild(atomElement);
    });
    
    // Создать связи
    for (let i = 0; i < bonds; i++) {
        const bond = document.createElement('div');
        bond.className = `bond bond-${i}`;
        bond.style.setProperty('--angle', `${(i * 45)}deg`);
        molecule.appendChild(bond);
    }
}

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                
                // Запустить анимацию для дочерних элементов
                const animatedElements = entry.target.querySelectorAll('[data-delay]');
                animatedElements.forEach((el, index) => {
                    const delay = parseFloat(el.getAttribute('data-delay')) || 0;
                    setTimeout(() => {
                        el.style.animation = 'fadeInUp 0.5s forwards';
                    }, delay * 1000);
                });
            }
        });
    }, observerOptions);
    
    // Наблюдать за всеми элементами с анимацией
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
}

function initPulseAnimations() {
    const pulseElements = document.querySelectorAll('.card-pulse, .area-pulse');
    pulseElements.forEach(el => {
        el.style.animation = 'pulse 2s infinite';
    });
}

function initIndicatorAnimations() {
    // Анимация индикатора экологического вреда
    const ecoIndicator = document.getElementById('ecoIndicator');
    if (ecoIndicator) {
        let value = 0;
        const interval = setInterval(() => {
            value += 2;
            if (value > 85) {
                clearInterval(interval);
                value = 85;
            }
            
            ecoIndicator.style.left = `${value}%`;
            ecoIndicator.querySelector('.indicator-value').textContent = `${value}%`;
        }, 50);
    }
}

// ============ ЧАСТИЦЫ ============
function initParticles() {
    const canvas = document.getElementById('particleCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId;
    
    // Установить размеры canvas
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    // Создать частицы
    function createParticles() {
        particles = [];
        const particleCount = Math.floor((canvas.width * canvas.height) / 10000);
        
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 3 + 1,
                speedX: Math.random() * 0.5 - 0.25,
                speedY: Math.random() * 0.5 - 0.25,
                color: `rgba(${Math.floor(Math.random() * 100 + 155)}, ${Math.floor(Math.random() * 100 + 155)}, 255, ${Math.random() * 0.3 + 0.1})`
            });
        }
    }
    
    // Анимация частиц
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            // Обновить позицию
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            
            // Отскок от границ
            if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
            if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;
            
            // Нарисовать частицу
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fillStyle = particle.color;
            ctx.fill();
            
            // Нарисовать соединения
            particles.forEach(otherParticle => {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(155, 89, 182, ${0.2 * (1 - distance / 100)})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(otherParticle.x, otherParticle.y);
                    ctx.stroke();
                }
            });
        });
        
        animationId = requestAnimationFrame(animateParticles);
    }
    
    // Инициализация
    resizeCanvas();
    createParticles();
    animateParticles();
    
    // Обработчик изменения размера окна
    window.addEventListener('resize', () => {
        resizeCanvas();
        createParticles();
    });
}

// ============ СЧЕТЧИКИ ============
function initCounters() {
    const counters = document.querySelectorAll('.stat-number, .counter-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000; // 2 секунды
        const step = target / (duration / 16); // 60fps
        let current = 0;
        
        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.floor(current);
                setTimeout(updateCounter, 16);
            } else {
                counter.textContent = target;
            }
        };
        
        // Запустить счетчик при появлении в поле зрения
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                updateCounter();
                observer.unobserve(counter);
            }
        });
        
        observer.observe(counter);
    });
}

// ============ ТЕМА ============
function initTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const icon = themeToggle.querySelector('i');
    
    // Проверить сохраненную тему
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        icon.className = 'fas fa-sun';
    }
    
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-theme');
        
        if (document.body.classList.contains('dark-theme')) {
            icon.className = 'fas fa-sun';
            localStorage.setItem('theme', 'dark');
        } else {
            icon.className = 'fas fa-moon';
            localStorage.setItem('theme', 'light');
        }
        
        playSound('click');
    });
}

// ============ ЗВУКИ ============
function initSounds() {
    const soundToggle = document.getElementById('soundToggle');
    const icon = soundToggle.querySelector('i');
    
    soundToggle.addEventListener('click', function() {
        CONFIG.sounds = !CONFIG.sounds;
        icon.className = CONFIG.sounds ? 'fas fa-volume-up' : 'fas fa-volume-mute';
        playSound('click');
    });
}

function playSound(type) {
    if (!CONFIG.sounds) return;
    
    const audio = document.getElementById(`${type}Sound`);
    if (audio) {
        audio.currentTime = 0;
        audio.play().catch(e => console.log('Audio play failed:', e));
    }
}

// ============ ВИКТОРИНА ============
function initQuiz() {
    const quizData = [
        {
            question: "Где чаще всего содержатся фосфаты?",
            options: [
                "В натуральных фруктах",
                "В бытовой химии",
                "В чистой воде",
                "В минералах"
            ],
            correct: 1,
            explanation: "Правильно! Фосфаты активно добавляют в стиральные порошки, моющие средства и другую бытовую химию."
        },
        {
            question: "Какой основной вред от фосфатов для экологии?",
            options: [
                "Укрепление почвы",
                "Цветение водоемов",
                "Очищение воздуха",
                "Увеличение урожая"
            ],
            correct: 1,
            explanation: "Верно! Фосфаты вызывают эвтрофикацию - бурный рост водорослей, что приводит к гибели рыбы."
        },
        {
            question: "Как обозначаются фосфаты в составе средств?",
            options: [
                "E100-E199",
                "Sodium Tripolyphosphate",
                "Aqua",
                "Parfum"
            ],
            correct: 1,
            explanation: "Правильно! Sodium Tripolyphosphate - одно из распространенных названий фосфатов."
        },
        {
            question: "Какая натуральная альтернатива моющим средствам?",
            options: [
                "Мыльные орехи",
                "Хлор",
                "Формальдегид",
                "Асбест"
            ],
            correct: 0,
            explanation: "Верно! Мыльные орехи - полностью натуральное и безопасное средство для стирки."
        },
        {
            question: "Почему фосфаты опасны для кожи?",
            options: [
                "Питают кожу",
                "Усиливают проникновение ПАВ",
                "Увлажняют",
                "Защищают от солнца"
            ],
            correct: 1,
            explanation: "Правильно! Фосфаты разрушают защитный барьер кожи и усиливают проникновение вредных веществ."
        }
    ];
    
    let currentQuestion = 0;
    let score = 0;
    const totalQuestions = quizData.length;
    
    // Обновить викторину
    function updateQuiz() {
        const question = quizData[currentQuestion];
        document.getElementById('currentQuestion').textContent = currentQuestion + 1;
        document.getElementById('totalQuestions').textContent = totalQuestions;
        document.getElementById('quizProgress').style.width = `${(currentQuestion / totalQuestions) * 100}%`;
        document.getElementById('scoreValue').textContent = score;
        
        // Обновить вопрос
        document.getElementById('quizQuestion').querySelector('h3').textContent = question.question;
        
        // Обновить изображение вопроса
        const questionImage = document.getElementById('questionImage');
        questionImage.innerHTML = `<i class="fas fa-question-circle"></i>`;
        
        // Обновить варианты ответов
        const optionsContainer = document.getElementById('quizOptions');
        optionsContainer.innerHTML = '';
        
        question.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.className = 'quiz-option';
            button.innerHTML = `
                <span>${option}</span>
            `;
            button.onclick = () => selectAnswer(index);
            optionsContainer.appendChild(button);
        });
        
        // Обновить кнопки навигации
        document.getElementById('prevQuestion').disabled = currentQuestion === 0;
        document.getElementById('nextQuestion').style.display = currentQuestion === totalQuestions - 1 ? 'none' : 'flex';
        
        // Скрыть обратную связь
        document.getElementById('quizFeedback').style.display = 'none';
    }
    
    function selectAnswer(selectedIndex) {
        const question = quizData[currentQuestion];
        const options = document.querySelectorAll('.quiz-option');
        const feedback = document.getElementById('quizFeedback');
        
        // Отключить все кнопки
        options.forEach(btn => btn.disabled = true);
        
        // Проверить ответ
        if (selectedIndex === question.correct) {
            options[selectedIndex].classList.add('correct');
            score += 20;
            feedback.innerHTML = `
                <div class="correct-feedback">
                    <i class="fas fa-check-circle"></i>
                    <h4>Правильно!</h4>
                    <p>${question.explanation}</p>
                </div>
            `;
            playSound('success');
            showConfetti();
        } else {
            options[selectedIndex].classList.add('wrong');
            options[question.correct].classList.add('correct');
            feedback.innerHTML = `
                <div class="wrong-feedback">
                    <i class="fas fa-times-circle"></i>
                    <h4>Неверно!</h4>
                    <p>${question.explanation}</p>
                </div>
            `;
            playSound('error');
        }
        
        feedback.style.display = 'block';
        document.getElementById('scoreValue').textContent = score;
        
        // Показать кнопку "Далее" или завершить викторину
        if (currentQuestion === totalQuestions - 1) {
            setTimeout(showQuizResults, 1500);
        } else {
            document.getElementById('nextQuestion').style.display = 'flex';
        }
    }
    
    window.prevQuestion = function() {
        if (currentQuestion > 0) {
            currentQuestion--;
            updateQuiz();
            playSound('click');
        }
    };
    
    window.nextQuizQuestion = function() {
        if (currentQuestion < totalQuestions - 1) {
            currentQuestion++;
            updateQuiz();
            playSound('click');
        }
    };
    
    function showQuizResults() {
        const percentage = (score / 100) * 100;
        let message, icon, color;
        
        if (percentage >= 80) {
            message = 'Отличный результат! Вы эксперт по фосфатам!';
            icon = 'fas fa-trophy';
            color = 'var(--success)';
        } else if (percentage >= 60) {
            message = 'Хороший результат! Вы много знаете о фосфатах!';
            icon = 'fas fa-star';
            color = 'var(--warning)';
        } else {
            message = 'Попробуйте еще раз! Изучите информацию на сайте.';
            icon = 'fas fa-redo';
            color = 'var(--danger)';
        }
        
        const resultsHTML = `
            <div class="quiz-results-content">
                <i class="${icon}" style="font-size: 4rem; color: ${color};"></i>
                <h3>Викторина завершена!</h3>
                <div class="final-score">
                    <div class="score-circle">
                        <span>${score}</span>
                        <small>баллов</small>
                    </div>
                    <div class="score-percentage">${percentage}%</div>
                </div>
                <p>${message}</p>
                <button class="btn-primary" onclick="restartQuiz()">
                    <i class="fas fa-redo"></i>
                    <span>Пройти еще раз</span>
                </button>
            </div>
        `;
        
        document.getElementById('quizResults').innerHTML = resultsHTML;
        document.getElementById('quizResults').style.display = 'block';
        document.getElementById('quizContent').style.display = 'none';
        
        // Обновить таблицу лидеров
        updateLeaderboard(score);
    }
    
    window.restartQuiz = function() {
        currentQuestion = 0;
        score = 0;
        document.getElementById('quizResults').style.display = 'none';
        document.getElementById('quizContent').style.display = 'block';
        updateQuiz();
        playSound('click');
    };
    
    function updateLeaderboard(score) {
        const leaderboard = document.getElementById('leaderboard');
        const scores = JSON.parse(localStorage.getItem('quizScores') || '[]');
        
        // Добавить новый результат
        scores.push({
            score: score,
            date: new Date().toLocaleDateString(),
            time: new Date().toLocaleTimeString()
        });
        
        // Отсортировать по убыванию
        scores.sort((a, b) => b.score - a.score);
        
        // Сохранить только топ-5
        const topScores = scores.slice(0, 5);
        localStorage.setItem('quizScores', JSON.stringify(topScores));
        
        // Обновить отображение
        leaderboard.innerHTML = topScores.map((item, index) => `
            <div class="leaderboard-item ${index === 0 ? 'first' : ''}">
                <div class="rank">${index + 1}</div>
                <div class="score">${item.score} баллов</div>
                <div class="date">${item.date}</div>
            </div>
        `).join('');
    }
    
    // Инициализировать таблицу лидеров
    updateLeaderboard(0);
    
    // Инициализировать викторину
    updateQuiz();
}

// ============ СИМУЛЯТОР ============
function initSimulator() {
    const phosphateSlider = document.getElementById('phosphateLevel');
    const phosphateValue = document.getElementById('phosphateValue');
    const waterLevel = document.getElementById('waterLevel');
    const phosphates = document.getElementById('phosphates');
    const algae = document.getElementById('algae');
    const fish = document.getElementById('fish');
    const timeDisplay = document.getElementById('timeDisplay');
    
    let simulationTime = 60;
    let isSimulating = false;
    
    // Обновить значение фосфатов
    phosphateSlider.addEventListener('input', function() {
        const value = this.value;
        phosphateValue.textContent = `${value}%`;
        
        if (!isSimulating) {
            updateSimulationVisuals(value, simulationTime);
        }
    });
    
    window.changeTime = function(seconds) {
        simulationTime = Math.max(10, Math.min(300, simulationTime + seconds));
        timeDisplay.textContent = `${simulationTime} сек`;
        
        if (!isSimulating) {
            updateSimulationVisuals(phosphateSlider.value, simulationTime);
        }
    };
    
    window.startSimulation = function() {
        if (isSimulating) return;
        
        isSimulating = true;
        playSound('click');
        
        const phosphateLevel = parseInt(phosphateSlider.value);
        const process = document.querySelector('.toggle-btn.active').getAttribute('data-process');
        
        // Анимация симуляции
        let progress = 0;
        const interval = setInterval(() => {
            progress += 2;
            
            // Обновить визуализацию
            const currentPhosphates = phosphateLevel * (1 - progress / 100 * getProcessEffect(process));
            updateSimulationVisuals(currentPhosphates, simulationTime);
            
            // Обновить индикаторы
            updateSimulationIndicators(currentPhosphates, process);
            
            if (progress >= 100) {
                clearInterval(interval);
                isSimulating = false;
                
                // Показать результаты
                showSimulationResults(phosphateLevel, currentPhosphates, process);
                playSound('success');
                showConfetti();
            }
        }, 50);
    };
    
    function getProcessEffect(process) {
        switch(process) {
            case 'rinse': return 0.5; // 50% удаления
            case 'eco': return 0.8; // 80% удаления
            default: return 0; // Без обработки
        }
    }
    
    function updateSimulationVisuals(phosphateLevel, time) {
        // Обновить уровень воды (обратно пропорционально фосфатам)
        waterLevel.style.height = `${100 - phosphateLevel * 0.3}%`;
        
        // Обновить видимость фосфатов
        phosphates.style.opacity = phosphateLevel / 100;
        
        // Обновить водоросли (зависит от фосфатов и времени)
        const algaeGrowth = Math.min(100, phosphateLevel * 1.5 * (time / 60));
        algae.style.opacity = algaeGrowth / 100;
        
        // Обновить рыбу (обратно пропорционально водорослям)
        const fishSurvival = Math.max(0, 100 - algaeGrowth * 0.8);
        fish.style.opacity = fishSurvival / 100;
        
        // Обновить числовые индикаторы
        document.getElementById('phosphateCount').textContent = `${Math.round(phosphateLevel * 10)} мг/л`;
        document.getElementById('algaeCount').textContent = `${Math.round(algaeGrowth)}%`;
        document.getElementById('fishCount').textContent = `${Math.round(fishSurvival)}%`;
    }
    
    function updateSimulationIndicators(phosphateLevel, process) {
        // Обновить график
        updateSimulationGraph(phosphateLevel, process);
    }
    
    function updateSimulationGraph(phosphateLevel, process) {
        const canvas = document.getElementById('simulationGraph');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;
        
        // Очистить canvas
        ctx.clearRect(0, 0, width, height);
        
        // Нарисовать график
        ctx.beginPath();
        ctx.moveTo(0, height);
        ctx.bezierCurveTo(
            width * 0.3, height * (1 - phosphateLevel / 100),
            width * 0.7, height * (0.5 - phosphateLevel / 200),
            width, height * (0.3 - phosphateLevel / 150)
        );
        ctx.strokeStyle = process === 'eco' ? 'var(--success)' : 
                         process === 'rinse' ? 'var(--warning)' : 'var(--danger)';
        ctx.lineWidth = 3;
        ctx.stroke();
    }
    
    function showSimulationResults(initialPhosphates, finalPhosphates, process) {
        const reduction = initialPhosphates - finalPhosphates;
        const reductionPercent = Math.round((reduction / initialPhosphates) * 100);
        
        const resultsHTML = `
            <div class="result-card">
                <h4><i class="fas fa-vial"></i> Начальный уровень</h4>
                <div class="result-value">${initialPhosphates}%</div>
            </div>
            <div class="result-card">
                <h4><i class="fas fa-filter"></i> Обработка</h4>
                <div class="result-value">${getProcessName(process)}</div>
            </div>
            <div class="result-card">
                <h4><i class="fas fa-arrow-down"></i> Снижение</h4>
                <div class="result-value">${reductionPercent}%</div>
            </div>
            <div class="result-card">
                <h4><i class="fas fa-check-circle"></i> Результат</h4>
                <div class="result-value ${finalPhosphates < 30 ? 'good' : finalPhosphates < 60 ? 'medium' : 'bad'}">
                    ${getResultMessage(finalPhosphates)}
                </div>
            </div>
        `;
        
        document.getElementById('simulationResults').innerHTML = resultsHTML;
    }
    
    function getProcessName(process) {
        switch(process) {
            case 'rinse': return 'Полоскание';
            case 'eco': return 'Эко-средство';
            default: return 'Без обработки';
        }
    }
    
    function getResultMessage(level) {
        if (level < 30) return 'Отлично!';
        if (level < 60) return 'Нормально';
        return 'Опасно!';
    }
    
    // Инициализация
    updateSimulationVisuals(50, 60);
}

// ============ ЛАБОРАТОРИЯ ============
function initLab() {
    let pollutionLevel = 50;
    let currentReagent = 'detergent';
    
    window.addReagent = function() {
        playSound('click');
        
        // Анимация добавления реагента
        const dropper = document.getElementById('dropper');
        const beakerLiquid = document.getElementById('beakerLiquid');
        
        dropper.style.animation = 'moveDown 0.5s forwards';
        
        setTimeout(() => {
            dropper.style.animation = 'moveUp 0.5s forwards';
            
            // Обновить уровень загрязнения
            switch(currentReagent) {
                case 'detergent':
                    pollutionLevel = Math.min(100, pollutionLevel + 20);
                    beakerLiquid.style.backgroundColor = '#e74c3c';
                    break;
                case 'eco':
                    pollutionLevel = Math.max(0, pollutionLevel - 30);
                    beakerLiquid.style.backgroundColor = '#27ae60';
                    break;
                case 'water':
                    pollutionLevel = Math.max(0, pollutionLevel - 10);
                    beakerLiquid.style.backgroundColor = '#3498db';
                    break;
            }
            
            updateLabResults();
        }, 500);
    };
    
    window.mixSolution = function() {
        playSound('click');
        
        const beakerLiquid = document.getElementById('beakerLiquid');
        beakerLiquid.style.animation = 'shake 0.5s ease';
        
        setTimeout(() => {
            beakerLiquid.style.animation = '';
            
            // Обновить описание
            const description = pollutionLevel < 30 ? 'Раствор стал чистым! Эко-средство эффективно нейтрализует фосфаты.' :
                             pollutionLevel < 70 ? 'Раствор мутный. Обычное моющее средство лишь частично очищает воду.' :
                             'Раствор сильно загрязнен. Химические средства увеличивают концентрацию фосфатов.';
            
            document.getElementById('resultDesc').textContent = description;
        }, 500);
    };
    
    window.resetExperiment = function() {
        playSound('click');
        
        pollutionLevel = 50;
        const beakerLiquid = document.getElementById('beakerLiquid');
        beakerLiquid.style.backgroundColor = '#4fc3f7';
        beakerLiquid.style.animation = 'reset 0.5s ease';
        
        setTimeout(() => {
            beakerLiquid.style.animation = '';
            updateLabResults();
            document.getElementById('resultDesc').textContent = 'Добавьте реагент для начала эксперимента';
        }, 500);
    };
    
    function updateLabResults() {
        const pollutionBar = document.getElementById('pollutionLevel');
        const pollutionValue = document.getElementById('pollutionValue');
        
        pollutionBar.style.width = `${pollutionLevel}%`;
        pollutionValue.textContent = `${pollutionLevel}%`;
        
        // Обновить цвет индикатора
        if (pollutionLevel < 30) {
            pollutionBar.style.background = 'var(--success)';
        } else if (pollutionLevel < 70) {
            pollutionBar.style.background = 'var(--warning)';
        } else {
            pollutionBar.style.background = 'var(--danger)';
        }
    }
    
    // Установить обработчики для выбора реагента
    document.querySelectorAll('.reagent-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.reagent-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentReagent = this.getAttribute('data-reagent');
            playSound('hover');
        });
    });
    
    // Инициализация
    updateLabResults();
}

// ============ УПРАВЛЕНИЕ ШАГАМИ ЗАЩИТЫ ============
let currentStep = 1;
const totalSteps = 4;

window.nextStep = function() {
    if (currentStep < totalSteps) {
        // Анимация перехода
        const currentCard = document.querySelector(`[data-step="${currentStep}"]`);
        const nextCard = document.querySelector(`[data-step="${currentStep + 1}"]`);
        
        currentCard.classList.remove('active');
        currentCard.style.animation = 'slideOutLeft 0.5s forwards';
        
        setTimeout(() => {
            nextCard.classList.add('active');
            nextCard.style.animation = 'slideInRight 0.5s forwards';
            currentStep++;
            
            // Обновить прогресс
            document.getElementById('stepProgress').style.width = `${(currentStep - 1) / (totalSteps - 1) * 100}%`;
            
            playSound('click');
        }, 300);
    }
};

window.completeProtection = function() {
    // Анимация завершения
    showNotification('Поздравляем! Вы освоили все шаги защиты!');
    showConfetti();
    playSound('success');
    
    // Активировать чеклист
    document.querySelectorAll('.check-item').forEach(checkbox => {
        checkbox.checked = true;
    });
};

window.checkChecklist = function() {
    const checkedItems = document.querySelectorAll('.check-item:checked').length;
    const totalItems = document.querySelectorAll('.check-item').length;
    
    if (checkedItems === totalItems) {
        showNotification('Отлично! Вы полностью готовы к защите!');
        showConfetti();
        playSound('success');
    } else {
        showNotification(`Завершено ${checkedItems} из ${totalItems} пунктов. Продолжайте!`);
        playSound('hover');
    }
};

// ============ ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ============
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
        playSound('click');
    }
}

function showNotification(message) {
    const notification = document.getElementById('notification');
    const content = notification.querySelector('span');
    
    content.textContent = message;
    notification.classList.add('active');
    
    setTimeout(() => {
        notification.classList.remove('active');
    }, 3000);
}

function showConfetti() {
    const container = document.getElementById('confettiContainer');
    
    // Создать конфетти
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = `${Math.random() * 100}%`;
        confetti.style.backgroundColor = getRandomColor();
        confetti.style.animation = `confettiFall ${Math.random() * 3 + 2}s linear forwards`;
        container.appendChild(confetti);
        
        // Удалить после анимации
        setTimeout(() => {
            confetti.remove();
        }, 5000);
    }
}

function getRandomColor() {
    const colors = ['#e74c3c', '#3498db', '#2ecc71', '#f39c12', '#9b59b6'];
    return colors[Math.floor(Math.random() * colors.length)];
}

function openVideoModal() {
    document.getElementById('videoModal').classList.add('active');
    playSound('click');
}

function closeVideoModal() {
    document.getElementById('videoModal').classList.remove('active');
    playSound('click');
}

function downloadGuide() {
    showNotification('Руководство по защите скачивается...');
    playSound('success');
    
    // Здесь будет реальная загрузка файла
    setTimeout(() => {
        showNotification('Руководство успешно скачано!');
    }, 2000);
}

function shareProject() {
    if (navigator.share) {
        navigator.share({
            title: 'Защита от фосфатов',
            text: 'Узнайте, как защитить себя и близких от опасных фосфатов!',
            url: window.location.href
        });
    } else {
        navigator.clipboard.writeText(window.location.href)
            .then(() => {
                showNotification('Ссылка скопирована в буфер обмена!');
            });
    }
}

function shareSocial(platform) {
    let url = '';
    const text = 'Защита от фосфатов - важная информация для здоровья!';
    const currentUrl = window.location.href;
    
    switch(platform) {
        case 'vk':
            url = `https://vk.com/share.php?url=${encodeURIComponent(currentUrl)}&title=${encodeURIComponent(text)}`;
            break;
        case 'telegram':
            url = `https://t.me/share/url?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(text)}`;
            break;
        case 'whatsapp':
            url = `https://wa.me/?text=${encodeURIComponent(text + ' ' + currentUrl)}`;
            break;
        case 'twitter':
            url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(currentUrl)}`;
            break;
    }
    
    window.open(url, '_blank');
    playSound('click');
}

function startDemo() {
    showNotification('Запускается демо-версия...');
    playSound('success');
    
    // Автоматически пройти по всем секциям
    setTimeout(() => scrollToSection('info'), 500);
    setTimeout(() => scrollToSection('danger'), 2000);
    setTimeout(() => scrollToSection('protection'), 3500);
    setTimeout(() => scrollToSection('quiz'), 5000);
    setTimeout(() => scrollToSection('simulator'), 6500);
}

function startDemoAnimations() {
    // Запустить демонстрационные анимации
    setTimeout(() => {
        // Анимация молекулы
        const molecule = document.querySelector('.molecule-animation');
        if (molecule) {
            molecule.style.animation = 'rotate 10s linear infinite';
        }
        
        // Анимация индикаторов
        const indicators = document.querySelectorAll('.indicator-dot');
        indicators.forEach(indicator => {
            indicator.style.animation = 'bounce 2s infinite';
        });
    }, 3000);
}

function setupEventListeners() {
    // Обработчики для карточек тела
    document.querySelectorAll('.body-area').forEach(area => {
        area.addEventListener('click', function() {
            const bodyPart = this.getAttribute('data-area');
            const info = getBodyPartInfo(bodyPart);
            
            const infoDisplay = document.getElementById('bodyInfoDisplay');
            infoDisplay.innerHTML = `
                <h4>${info.title}</h4>
                <p>${info.description}</p>
                <div class="effect-level">
                    <span>Уровень воздействия:</span>
                    <div class="level-indicator ${info.level}">${info.levelText}</div>
                </div>
            `;
            
            // Анимация
            this.style.transform = 'scale(1.3)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 300);
            
            playSound('click');
        });
    });
    
    // Обработчики для экологических фактов
    document.querySelectorAll('.eco-fact').forEach(fact => {
        fact.addEventListener('click', function() {
            const factType = this.getAttribute('data-fact');
            const description = getEcoFactDescription(factType);
            
            showNotification(description);
            playSound('hover');
        });
    });
}

function getBodyPartInfo(area) {
    const info = {
        'lungs': {
            title: 'Дыхательная система',
            description: 'Фосфаты вызывают раздражение слизистых, могут спровоцировать астму и бронхиты.',
            level: 'high',
            levelText: 'Высокий'
        },
        'heart': {
            title: 'Сердечно-сосудистая система',
            description: 'Нарушают обмен веществ, повышают риск сердечно-сосудистых заболеваний.',
            level: 'critical',
            levelText: 'Критический'
        },
        'brain': {
            title: 'Нервная система',
            description: 'Могут вызывать головные боли, усталость, нарушение концентрации.',
            level: 'medium',
            levelText: 'Средний'
        },
        'skin': {
            title: 'Кожные покровы',
            description: 'Вызывают аллергические реакции, дерматиты, разрушают защитный барьер кожи.',
            level: 'high',
            levelText: 'Высокий'
        },
        'kidneys': {
            title: 'Почки',
            description: 'Создают дополнительную нагрузку на почки, нарушают их функцию.',
            level: 'medium',
            levelText: 'Средний'
        }
    };
    
    return info[area] || info['lungs'];
}

function getEcoFactDescription(fact) {
    const descriptions = {
        'algae': 'Один грамм фосфатов стимулирует рост 5-10 кг водорослей!',
        'fish': 'Цветение воды приводит к гибели рыбы из-за недостатка кислорода.',
        'soil': 'Фосфаты накапливаются в почве, нарушая естественный баланс.'
    };
    
    return descriptions[fact] || 'Информация о экологических последствиях фосфатов.';
}

// ============ ДОПОЛНИТЕЛЬНЫЕ CSS АНИМАЦИИ ============
const style = document.createElement('style');
style.textContent = `
    @keyframes slideOutLeft {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(-100px); opacity: 0; }
    }
    
    @keyframes slideInRight {
        from { transform: translateX(100px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes moveDown {
        from { transform: translateY(0); }
        to { transform: translateY(100px); }
    }
    
    @keyframes moveUp {
        from { transform: translateY(100px); }
        to { transform: translateY(0); }
    }
    
    @keyframes shake {
        0%, 100% { transform: rotate(0deg); }
        25% { transform: rotate(5deg); }
        75% { transform: rotate(-5deg); }
    }
    
    @keyframes reset {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes rotate {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
    
    @keyframes bounce {
        0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
        40% { transform: translateY(-10px); }
        60% { transform: translateY(-5px); }
    }
    
    @keyframes confettiFall {
        0% {
            transform: translateY(-100px) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
        }
    }
    
    .confetti {
        position: absolute;
        width: 10px;
        height: 20px;
        top: -20px;
        opacity: 0;
    }
    
    .level-indicator {
        display: inline-block;
        padding: 0.3rem 0.8rem;
        border-radius: 20px;
        font-size: 0.9rem;
        font-weight: 600;
        color: white;
        margin-left: 0.5rem;
    }
    
    .level-indicator.low { background: var(--success); }
    .level-indicator.medium { background: var(--warning); }
    .level-indicator.high { background: var(--danger); }
    .level-indicator.critical { background: #c0392b; }
`;

document.head.appendChild(style);

// Экспорт функций для HTML
window.scrollToSection = scrollToSection;
window.openVideoModal = openVideoModal;
window.closeVideoModal = closeVideoModal;
window.downloadGuide = downloadGuide;
window.shareProject = shareProject;
window.shareSocial = shareSocial;
window.startDemo = startDemo;
window.nextStep = nextStep;
window.completeProtection = completeProtection;
window.checkChecklist = checkChecklist;
window.changeTime = changeTime;
window.startSimulation = startSimulation;
window.addReagent = addReagent;
window.mixSolution = mixSolution;
window.resetExperiment = resetExperiment;
window.prevQuestion = prevQuestion;
window.nextQuizQuestion = nextQuizQuestion;
window.restartQuiz = restartQuiz;
