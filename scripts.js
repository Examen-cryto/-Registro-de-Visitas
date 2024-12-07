const listaVisitas = document.getElementById('listaVisitas');
const nombreInput = document.getElementById('nombre');
const motivoInput = document.getElementById('motivo');
const horaInput = document.getElementById('hora');

// Función para cargar visitas guardadas
function cargarVisitas() {
    const visitasGuardadas = JSON.parse(localStorage.getItem('visitas')) || [];
    visitasGuardadas.forEach(visita => {
        agregarFila(visita.nombre, visita.motivo, visita.hora);
    });
}

// Función para guardar visitas en LocalStorage
function guardarVisitas() {
    const filas = document.querySelectorAll('#listaVisitas tr');
    const visitas = Array.from(filas).map(fila => {
        const columnas = fila.querySelectorAll('td');
        return {
            nombre: columnas[0].textContent,
            motivo: columnas[1].textContent,
            hora: columnas[2].textContent,
        };
    });
    localStorage.setItem('visitas', JSON.stringify(visitas));
}

// Función para agregar una fila
function agregarFila(nombre, motivo, hora) {
    const fila = document.createElement('tr');
    fila.innerHTML = `
        <td>${nombre}</td>
        <td>${motivo}</td>
        <td>${hora}</td>
        <td><button class="eliminar">Eliminar</button></td>
    `;
    listaVisitas.appendChild(fila);

    // Agregar evento al botón de eliminar
    fila.querySelector('.eliminar').addEventListener('click', () => {
        listaVisitas.removeChild(fila);
        guardarVisitas();
    });
}

// Evento para registrar una visita
document.getElementById('registrar').addEventListener('click', () => {
    const nombre = nombreInput.value.trim();
    const motivo = motivoInput.value.trim();
    const hora = horaInput.value;

    if (nombre && motivo && hora) {
        agregarFila(nombre, motivo, hora);
        guardarVisitas();

        // Limpiar campos
        nombreInput.value = '';
        motivoInput.value = '';
        horaInput.value = '';
    } else {
        alert('Por favor completa todos los campos antes de registrar.');
    }
});

// Cargar visitas al iniciar la página
cargarVisitas();
