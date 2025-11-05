class Producto {
    constructor(codigo, nombre,precio,fecha) {
        this.codigo = codigo;
        this.nombre = nombre;
        this.precio = precio;
        this.fecha = fecha;
    } 
}

window.addEventListener('DOMContentLoaded', () => {
    cargarDesdeLocalStorage();
});
const inputPrecio = document.getElementById('precio');
const inputCodigo = document.getElementById('codigo');
const inputNombre = document.getElementById('nombre');
const mensajeError = document.getElementById('msj-error');

let productos = [];

function limpiarInputs(){
    inputPrecio.classList.remove("error");
    inputCodigo.classList.remove("error");
    inputNombre.classList.remove("error");
    mensajeError.classList.remove("activo");
}

function mostrarError(input) {
    input.classList.add('error');
    mensajeError.textContent = 'Por favor, llena todos los campos';
    mensajeError.classList.add('activo');
}

const botonAñadir = document.getElementById('btn-añadir')
botonAñadir.addEventListener('click', (event) => {

    limpiarInputs();
    let errorDato  = false;

    const codigo = document.getElementById('codigo').value;
    const precio = parseFloat(document.getElementById('precio').value);
    const nombre = document.getElementById('nombre').value.trim();

    if(codigo===''){
        mostrarError(inputCodigo);
        errorDato = true;
    }
    if(nombre===''){
        mostrarError(inputNombre);
        errorDato = true;
    }
    if (isNaN(precio) || precio <= 0) {
        mostrarError(inputPrecio);
        errorDato = true;
    }

    if(errorDato){
        return;
    }

    const nuevoProducto = crearProducto(codigo, nombre, precio, new Date());
    agregarFila(nuevoProducto, productos.length - 1);


    document.getElementById('codigo').value = '';
    document.getElementById('nombre').value = '';
    document.getElementById('precio').value = '';
    
});

function crearProducto(codigo, nombre, precio, fecha) {
    const productoObj = new Producto(codigo, nombre, precio, fecha);
    productos.push(productoObj);
    localStorage.setItem('productos', JSON.stringify(productos));
    return productoObj; 
}

function agregarFila(producto, index) {
    const tbody = document.querySelector("#tablaProductos tbody");
    const fila = document.createElement("tr");
    const fechaFormateada = new Date(producto.fecha).toLocaleString();

    fila.innerHTML = `
        <td>${producto.codigo}</td>
        <td>${producto.nombre}</td>
        <td>$${parseFloat(producto.precio)}</td>
        <td>${fechaFormateada}</td>
    `;

    const celdaEditar = document.createElement("td");
    const btnEditar = document.createElement("button");
    btnEditar.textContent = "Editar";
    btnEditar.classList.add("btn-editar");

    btnEditar.addEventListener('click', () => {
        editarProducto(index,fila);
    });

    celdaEditar.appendChild(btnEditar);
    fila.appendChild(celdaEditar);
    tbody.appendChild(fila);

    const celdaEliminar = document.createElement("td");
    const btnEliminar = document.createElement("button");
    btnEliminar.textContent = "Eliminar";
    btnEliminar.classList.add("btn-eliminar");
    btnEliminar.addEventListener('click', () => {
        eliminarFila(index, fila);
    });
    celdaEliminar.appendChild(btnEliminar);
    fila.appendChild(celdaEliminar);

    tbody.appendChild(fila);
}
function mostrarTabla() {
    const tbody = document.querySelector("#tablaProductos tbody");
    tbody.innerHTML = ""; 
    productos.forEach((producto, index) => {
        agregarFila(producto, index, tbody);
    });
}

function editarFila(index,fila){
    const producto = productos.splice(index, 1);
    inputPrecio.textContent(producto.precio);
}

function eliminarFila(index,fila) {
    swal.fire({
        title: 'Seguro que deseas eliminar le producto? ',
        showCancelButton: true,
        icon:'warning',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Confirmar',
        confirmButtonColor: '#2a37cbff',
        cancelButtonColor: '#d33',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            productos.splice(index, 1);
            localStorage.setItem('productos', JSON.stringify(productos));
            fila.remove();
        }
    });
}
function cargarDesdeLocalStorage() {
    const data = JSON.parse(localStorage.getItem('productos')) || [];
    data.forEach((p, i) => {
        const productoObj = new Producto(p.codigo, p.nombre, p.precio, p.fecha);
        productos.push(productoObj);
        agregarFila(productoObj, i);
    });
}


function limpiarTabla(){
    if(productos.length>0){
        swal.fire({
        title: 'Seguro que deseas eliminar los registros? ',
        showCancelButton: true,
        icon:'warning',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Confirmar',
        confirmButtonColor: '#2a37cbff',
        cancelButtonColor: '#d33',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            productos = []; 
            localStorage.clear();
            mostrarTabla();
            
        }
        
    });
    }
}
    

