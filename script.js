// Obtener referencias a los elementos del DOM
const startStopButton = document.getElementById('startStop');
const resetButton = document.getElementById('reset');
const addTopicButton = document.getElementById('addTopic');
const topicsList = document.getElementById('topics');

// Variables para el temporizador
let timer;
let running = false;
let seconds = 0;
let minutes = 0;

// Escuchar eventos de clic en los botones
startStopButton.addEventListener('click', toggleTimer);
resetButton.addEventListener('click', resetTimer);
addTopicButton.addEventListener('click', addTopic);

// Función para iniciar o detener el temporizador
function toggleTimer() {
    if (running) {
        clearInterval(timer);
        startStopButton.textContent = 'Comenzar';
        running = false;
    } else {
        timer = setInterval(updateTimer, 1000);
        startStopButton.textContent = 'Detener';
        running = true;
    }
}

// Función para actualizar el temporizador cada segundo
function updateTimer() {
    seconds++;
    if (seconds === 60) {
        minutes++;
        seconds = 0;
    }
    const formattedTime = formatTime(minutes, seconds);
    document.getElementById('timer').textContent = formattedTime;
}

// Función para formatear el tiempo en minutos y segundos
function formatTime(minutes, seconds) {
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
    return `${formattedMinutes}:${formattedSeconds}`;
}

// Función para reiniciar el temporizador
function resetTimer() {
    clearInterval(timer);
    seconds = 0;
    minutes = 0;
    document.getElementById('timer').textContent = '00:00';
    startStopButton.textContent = 'Comenzar';
    running = false;
}

// Función para agregar un tema a la lista
function addTopic() {
    const topicName = document.getElementById('tema').value.trim();
    if (topicName !== '') {
        const formattedTime = formatTime(minutes, seconds);
        const listItem = document.createElement('li');
        listItem.textContent = `${topicName} - Tiempo: ${formattedTime}`;
        topicsList.appendChild(listItem);
    } else {
        alert('Por favor ingrese un nombre de tema válido.');
    }
}

// Obtener referencia al botón "Copiar"
const copyButton = document.getElementById('copy');

// Escuchar evento de clic en el botón "Copiar"
copyButton.addEventListener('click', copyTopics);

// Función para copiar los temas de la reunión
function copyTopics() {
    const topicsList = document.getElementById('topics');
    const topicsItems = topicsList.getElementsByTagName('li');
    let topicsText = '';

    // Recorrer todos los elementos <li> de la lista de temas
    for (let i = 0; i < topicsItems.length; i++) {
        // Agregar el texto del tema al texto general
        topicsText += topicsItems[i].textContent;

        // Agregar un salto de línea después de cada tema
        topicsText += '\n';
    }

    // Copiar el texto al portapapeles
    navigator.clipboard.writeText(topicsText)
        .then(() => {
            alert('¡Temas copiados al portapapeles!');
        })
        .catch((error) => {
            console.error('Error al copiar los temas:', error);
        });
}
