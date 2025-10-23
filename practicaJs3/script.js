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



document.addEventListener('keydown', function(e) {

    if(isNaN(e.key)){
        if (e.shiftKey && e.key === '*') {
            e.preventDefault();
            manejarOperador('*');
            
        }
        if(e.key==='+' || e.key==='/' || e.key==='-' || e.key==='*'){
            let op = e.key;
            manejarOperador(op);
        }
        if(e.key==='=' || e.key ==='Enter'){
            e.preventDefault();
            calcular();
            
        }
        if (e.key === 'Escape' || e.key === 'Backspace') {
            numeroActual = numeroActual.slice(0, -1); 
            actualizar();
        }
        if(e.key ==='.')
            manejarNumero(e.key)
    }
    else{
        manejarNumero(e.key)
    }
    
});

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

    if (!operador || numeroAnterior === '') return;

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
    if(resultado.toString()==='Error'){
        numeroActual = resultado.toString();
        actualizar();
        numeroActual='';
        return;
    }
    else{
        concatenarOp(num1,num2,operador,resultado);
        numeroActual = resultado.toString();
        numeroAnterior = '';
        operador = '';
        actualizar();
    }
    
    
}

function dividir (a, b){
    if(b===0){
        operador='';
        return 'Error';
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
