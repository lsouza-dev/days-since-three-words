// Função para criar corações
function createHeart() {
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.innerText = '❤️';
    heart.style.fontSize = `${(Math.random() * (6 - 2) + 2).toFixed(2)}rem`
    heart.style.left = Math.random() * 75 + 'dvw';
    heart.style.animationDuration = 2 + Math.random() * 3 + 's';
    document.querySelector('.hearts-container').appendChild(heart);

    setTimeout(() => {
        heart.remove();
    },10000);
}

// Criar corações em intervalos regulares
setInterval(createHeart, 800);


document.addEventListener('DOMContentLoaded', () => {
    const messageElement = document.getElementById('message');
    const surpriseButton = document.getElementById('surpriseButton');
    const fullMessage = "Oi, meu amor!\nTudo bem?\nTenho uma surpresinha pra você...\nEspero que goste! ❤️";
    let currentIndex = 0;

    function typeWriter() {
        if (currentIndex < fullMessage.length) {
            const currentChar = fullMessage.charAt(currentIndex);
            if (currentChar === '\n') {
                messageElement.innerHTML += '<br>'; // Converte quebra de linha para <br>
            } else {
                messageElement.innerHTML += currentChar === ' ' ? '&nbsp;' : currentChar; // Converte espaçamentos
            }
            currentIndex++;
            setTimeout(typeWriter, 50);  // Ajuste a velocidade conforme necessário
        } else {
            surpriseButton.classList.add('show');
        }
    }

    typeWriter();

    surpriseButton.addEventListener('click', function() {
        this.innerText = 'EU TE AMO';
        this.classList.remove('show');
        this.classList.add('animate-expand');

        setTimeout(() => {
            document.getElementById('intro').style.display = 'none';
            document.querySelector('.hearts-container').style.display = 'flex';
            document.getElementById('mainContent').style.display = 'flex';
        }, 1500);
    });
});


// Carrossel de Imagens e Deslizar
let index = 0;
let slides = document.querySelectorAll('.slide');
let dots = document.querySelectorAll('.dot');
let startX = 0;
let isDragging = false;

function showSlide(n) {
    if (n >= slides.length) index = 0;
    if (n < 0) index = slides.length - 1;

    slides.forEach((slide, i) => {
        slide.style.display = i === index ? 'block' : 'none';
    });

    dots.forEach((dot, i) => {
        dot.className = dot.className.replace(' active', '');
        if (i === index) dot.className += ' active';
    });
}

function nextSlide() {
    index++;
    showSlide(index);
}

function prevSlide() {
    index--;
    showSlide(index);
}

function currentSlide(n) {
    index = n;
    showSlide(index);
}

document.querySelector('.next').addEventListener('click', nextSlide);
document.querySelector('.prev').addEventListener('click', prevSlide);

// Eventos de arrastar para toque e mouse
function handleStart(event) {
    isDragging = true;
    startX = event.touches ? event.touches[0].clientX : event.clientX;
}

function handleMove(event) {
    if (!isDragging) return;

    const moveX = event.touches ? event.touches[0].clientX : event.clientX;
    const diffX = startX - moveX;

    if (Math.abs(diffX) > 50) {
        if (diffX > 0) {
            nextSlide();
        } else {
            prevSlide();
        }
        isDragging = false;
    }
}

function handleEnd(event) {
    isDragging = false;
}

const carrosselElement = document.querySelector('.carrossel');

carrosselElement.addEventListener('mousedown', handleStart);
carrosselElement.addEventListener('mousemove', handleMove);
carrosselElement.addEventListener('mouseup', handleEnd);
carrosselElement.addEventListener('mouseleave', handleEnd);

carrosselElement.addEventListener('touchstart', handleStart);
carrosselElement.addEventListener('touchmove', handleMove);
carrosselElement.addEventListener('touchend', handleEnd);

showSlide(index);
setInterval(nextSlide, 5000);

// Tempo Decorrido
function atualizarTempoDecorrido() {
    const dataInicio = new Date('2024-12-31T12:00:00');
    const agora = new Date();
    const diferenca = agora - dataInicio;

    if (diferenca <= 0) {
        document.getElementById('dias').innerText = "0";
        document.getElementById('horas').innerText = "0";
        document.getElementById('minutos').innerText = "0";
        document.getElementById('segundos').innerText = "0";
        return;
    }

    const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferenca % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((diferenca % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((diferenca % (1000 * 60)) / 1000);

    document.getElementById('dias').innerText = dias;
    document.getElementById('horas').innerText = horas;
    document.getElementById('minutos').innerText = minutos;
    document.getElementById('segundos').innerText = segundos;
}

// Chama a função a cada segundo
setInterval(atualizarTempoDecorrido, 1000);
