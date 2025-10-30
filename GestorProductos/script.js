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

let productos = [];

const botonAñadir = document.getElementById('btn-añadir')
botonAñadir.addEventListener('click', (event) => {

    const codigo = document.getElementById('codigo').value;
    const precio = document.getElementById('precio').value;
    const nombre = document.getElementById('nombre').value;

    if (codigo === "" || nombre === "" || precio === "") {
            alert("Por favor, llena todos los campos.");
            return;
    }

    crearProducto(codigo, nombre, precio, new Date());
    
    document.getElementById('codigo').value = '';
    document.getElementById('nombre').value = '';
    document.getElementById('precio').value = '';
    
});

function crearProducto(codigo, nombre,precio,fecha) {
    const productoObj = new Producto(codigo, nombre,precio,fecha);
    productos.push(productoObj);
    mostrarTabla();
    localStorage.setItem('productos', JSON.stringify(productos));
}

function eliminarProducto(index) {
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
            mostrarTabla(); 
            localStorage.setItem('productos', JSON.stringify(productos)); 
        }
    });
}

function mostrarTabla() {
    const tbody = document.querySelector("#tablaProductos tbody");
    tbody.innerHTML = ""; 

    productos.forEach((producto, index) => {
        const fila = document.createElement("tr");
        const fechaFormateada = new Date(producto.fecha).toLocaleString();
        fila.innerHTML = `
            <td>${producto.codigo}</td>
            <td>${producto.nombre}</td>
            <td>$${parseFloat(producto.precio)}</td>
            <td>${fechaFormateada}</td>
        `;
        const celdaEliminar = document.createElement("td");
        const btnEliminar = document.createElement("button");
        btnEliminar.textContent = "Eliminar";
        btnEliminar.classList.add("btn-eliminar");

        btnEliminar.addEventListener('click', () => {
            eliminarProducto(index);
        });

        celdaEliminar.appendChild(btnEliminar);
        fila.appendChild(celdaEliminar);
        
        tbody.appendChild(fila);
    });

}

function cargarDesdeLocalStorage() {
    const data = JSON.parse(localStorage.getItem('productos')) || [];
    data.forEach(p => {
        const productoObj = new Producto(p.codigo, p.nombre,p.precio,p.fecha);
        productos.push(productoObj);
        
    });
    mostrarTabla();
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
    else{
        return;
    }
}
    

