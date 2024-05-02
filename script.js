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

        // Crear el botón de eliminar
        const deleteButton = document.createElement('button');
        deleteButton.textContent = '🗑️'; // Icono de tacho de basura
        deleteButton.classList.add('delete-button');

        // Escuchar evento de clic en el botón de eliminar
        deleteButton.addEventListener('click', function() {
            listItem.remove(); // Eliminar el tema al hacer clic en el botón de eliminar
        });

        // Agregar el botón de eliminar al elemento de la lista
        listItem.appendChild(deleteButton);

        // Agregar el tema a la lista
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
        // Clonar el elemento para no modificar el DOM original
        const listItemClone = topicsItems[i].cloneNode(true);
        // Eliminar el ícono de la papelera del clon
        const deleteButton = listItemClone.querySelector('.delete-button');
        if (deleteButton) {
            deleteButton.remove();
        }
        // Agregar el texto del tema al texto general
        topicsText += listItemClone.textContent;

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

// Función para resetear los temas guardados
function resetTopics() {
    const topicsList = document.getElementById('topics');
    topicsList.innerHTML = ''; // Eliminar todos los temas guardados
}

// Obtener referencia al botón "Resetear"
const resetTopicsButton = document.getElementById('resetTopics');

// Escuchar evento de clic en el botón "Resetear"
resetTopicsButton.addEventListener('click', resetTopics);

// Obtener referencia al botón de ayuda y al panel de ayuda
const helpButton = document.getElementById('helpButton');
const helpPanel = document.getElementById('helpPanel');

// Escuchar evento de clic en el botón de ayuda
helpButton.addEventListener('click', toggleHelpPanel);

// Función para mostrar u ocultar el panel de ayuda
function toggleHelpPanel() {
    helpPanel.style.display = helpPanel.style.display === 'block' ? 'none' : 'block';
}

// Obtener referencia al botón de cerrar ayuda
const closeHelpButton = document.getElementById('closeHelp');

// Escuchar evento de clic en el botón de cerrar ayuda
closeHelpButton.addEventListener('click', toggleHelpPanel);
