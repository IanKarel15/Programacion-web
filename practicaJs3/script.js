const display = document.getElementById('display');
const botones = document.querySelectorAll('.container-buttons button');
const displayOp = document.getElementById('display-operaciones');

let numeroActual = '';
let numeroAnterior = '';
let operador = '';
let operaciones = [];

function concatenarOp(num1,num2,op,resul){
    if (isNaN(num1) || isNaN(num2) || resul === undefined || resul === "Error") {
    return;
    }
    const operacion = num1+op+num2+'='+resul;
    operaciones.push(operacion);
    actualizarOperaciones();
}
function actualizar (){
    display.textContent = numeroActual || '0';
}

function eliminarOp(){
    operaciones.length=0;
    actualizarOperaciones();
}

function manejarNumero(num){
    numeroActual += num; 
    actualizar();
}

function limpiar(){
    numeroActual = '';
    numeroAnterior = '';
    operador = '';
    display.textContent = '0';
}

function actualizarOperaciones (){
    displayOp.innerHTML = operaciones.join("<br>");
}

function calcular (){
    let resultado = '';
    const num1 = parseFloat(numeroAnterior);
    const num2 = parseFloat(numeroActual);

    switch (operador) {
        case '+': resultado = num1+num2;break;
        case '*': resultado = num1*num2;break;
        case '-': resultado = num1-num2;break;
        case '/': resultado = dividir(num1,num2);break;
        default:
            break;
    }
    concatenarOp(num1,num2,operador,resultado);
    numeroActual = resultado.toString();
    numeroAnterior = '';
    operador = '';
    actualizar();


}

function dividir (a, b){
    if(b===0){
       return 'Error';
       operador='';
    }
    return a/b;
}


function manejarOperador(op){
  if (numeroActual === '') return; 
  if (numeroAnterior !== '') {
    calcular();
  }
  operador = op;
  numeroAnterior = numeroActual;
  numeroActual = '';
}

botones.forEach(boton => {
    boton.addEventListener('click', () => {
        const valor = boton.textContent;

        if (!isNaN(valor)) {
            manejarNumero(valor);
        } else if (valor === 'C') {
            limpiar();
        } else if (valor === '=') {
            calcular();
        } else { 
            manejarOperador(valor);
        }
    });
});
