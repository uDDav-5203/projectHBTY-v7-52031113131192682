// Трекер стороны открытки для эластичного переворота (false - Лист 1, true - Лист 2)
let isFlipped = false; 

// 1. Открытие конверта и увеличение изображения из центра
function openEnvelope() {
    const envelope = document.getElementById('envelope');
    const envelopeImg = document.getElementById('envelope-img');
    const flipContainer = document.getElementById('flip-container');
    const flipBtn = document.getElementById('global-flip-btn');

    // Останавливаем покачивание и открываем конверт
    envelope.classList.remove('envelope-animated');
    envelopeImg.src = 'envelope_open.png';

    // Из центра открытого конверта плавно вылетает и увеличивается твоя открытка
    setTimeout(() => {
        flipContainer.classList.add('active');
        if (flipBtn) flipBtn.classList.remove('hidden'); // Кнопка плавно вцветает внизу холста
        
        envelope.style.transform = 'translate(-50%, -50%) scale(0.7) translateY(111px)'; // Сдвигаем конверт вниз
        envelope.style.opacity = '0.3';
    }, 550);
}

// 2. Функция бесконечного ЭЛАСТИЧНОГО 3D-переворота карточки по кругу (Лист 1 <-> Лист 2)
function toggleFlip(event) {
    event.stopPropagation(); // Защита от багов тач-скрина на телефонах
    const flexLayer = document.getElementById('card-flex-layer');
    
    // Временно блокируем кнопку на время анимации, чтобы избежать хаотичных кликов
    event.target.disabled = true;

    if (!isFlipped) {
        // ЭТАП 1: Имитируем натяжение бумаги — нижний правый угол пошел вперед, лист прогибается
        flexLayer.classList.add('bending');
        
        // ЭТАП 2: Через 180мс лист срывается, опирается на левое ребро и делает красивый 3D-оборот
        setTimeout(() => {
            flexLayer.classList.remove('bending');
            flexLayer.classList.add('turned');
            isFlipped = true;
        }, 150);
    } else {
        // ЭЛАСТИЧНЫЙ ПЕРЕВОРОТ ОБРАТНО (с Листа 2 на Лист 1)
        flexLayer.classList.add('bending');
        // Изменяем наклон 3D матрицы для реалистичного обратного хода за угол
        flexLayer.style.transform = "rotateY(-162deg) rotateX(7deg) skewY(6deg) translateX(-100%)";
        
        setTimeout(() => {
            flexLayer.style.transform = ""; // Сбрасываем временные стили наклона
            flexLayer.classList.remove('bending');
            flexLayer.classList.remove('turned');
            isFlipped = false;
        }, 180);
    }

    // Разблокируем кнопку после завершения полного пружинящего переворота (через 950мс)
    setTimeout(() => {
        event.target.disabled = false;
    }, 475);
}
