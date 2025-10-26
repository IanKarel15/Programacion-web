class Tarea {

    constructor(nombreTarea, tiempo) {
        this.nombreTarea = nombreTarea;
        this.tiempo = tiempo;
    } 

}

window.addEventListener('DOMContentLoaded', () => {
    cargarDesdeLocalStorage();
});

let tareas = [];

const contenedor = document.querySelector('.Contenedor-tareas')

function añadir(){
    Swal.fire({
    title: 'Nueva tarea',
    input: 'text',
    inputPlaceholder: 'Nombre de la tarea',
    showCancelButton: true,
    cancelButtonText: 'Cancelar',
    confirmButtonText: 'Añadir',
    confirmButtonColor: '#000',
    cancelButtonColor: '#d33',
    reverseButtons: true
}).then((result) => {
    if (result.isConfirmed && result.value) {
        agregarTiempo(result.value);
    }
});
}

function agregarTiempo(nombreTarea){
    Swal.fire({
    title: 'Añade los dias ',
    input: 'number',
    inputPlaceholder: 'Duracion de la tarea',
    showCancelButton: true,
    cancelButtonText: 'Cancelar',
    confirmButtonText: 'Añadir',
    confirmButtonColor: '#000',
    cancelButtonColor: '#d33',
    reverseButtons: true
}).then((result) => {
    if (result.isConfirmed && result.value>0) {
        crearTarea(nombreTarea,result.value)    
    }
});}


function crearTarea(nombreTarea, dias) {
    const tareaObj = new Tarea(nombreTarea, dias);
    tareas.push(tareaObj);
    crearTareaDOM(tareaObj);
    localStorage.setItem('tareas', JSON.stringify(tareas));
}

function crearTareaDOM(tareaObj) {
    const tareaDiv = document.createElement('div');
    tareaDiv.classList.add('tarea');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('checkbox-tarea');
    checkbox.checked = tareaObj.completada || false;

    const texto = document.createElement('span');
    texto.textContent = tareaObj.nombreTarea;

    const spanDias = document.createElement('span');
    spanDias.textContent = `${tareaObj.tiempo} días`;

    if (checkbox.checked) {
        texto.classList.add('tachado');
        spanDias.classList.add('tachado');
    }

    checkbox.addEventListener('change', () => {
        tareaObj.completada = checkbox.checked;
        texto.classList.toggle('tachado', checkbox.checked);
        spanDias.classList.toggle('tachado', checkbox.checked);
        localStorage.setItem('tareas', JSON.stringify(tareas));
    });

    const btnEliminar = document.createElement('button');
    btnEliminar.textContent = 'Eliminar';
    btnEliminar.classList.add('btn-eliminar');
    btnEliminar.addEventListener('click', () => {
        contenedor.removeChild(tareaDiv);
        tareas = tareas.filter(t => t !== tareaObj);
        localStorage.setItem('tareas', JSON.stringify(tareas));
    });

    tareaDiv.appendChild(checkbox);
    tareaDiv.appendChild(texto);
    tareaDiv.appendChild(spanDias);
    tareaDiv.appendChild(btnEliminar);
    contenedor.appendChild(tareaDiv);
}


function cargarDesdeLocalStorage() {
    const data = JSON.parse(localStorage.getItem('tareas')) || [];
    data.forEach(t => {
        const tareaObj = new Tarea(t.nombreTarea, t.tiempo);
        tareaObj.completada = t.completada || false;
        tareas.push(tareaObj);
        crearTareaDOM(tareaObj);
    });
}

