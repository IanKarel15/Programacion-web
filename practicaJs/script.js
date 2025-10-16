function sumar (a, b){
    return a+b;
}

function restar (a, b){
    return a-b;
}

function dividir (a, b){
    if(b===0){
        alert("No se puede dividir entre 0");
       return;
    }
    return a/b;}

function multiplicar (a, b){
    return a*b;
}

let a = parseInt(prompt("Ingrese el numero 1","0"));
let b = parseInt(prompt("Ingrese el numero 2","0"));

let x = parseInt(prompt("Ingrese la operacion a realizar:suma(1), resta(2),division(3),multiplicacion(4)","0"));

switch(x){
    case 1:
        alert("Resultado: "+sumar(a,b));
        break;
    case 2:
        alert("Resultado: "+restar(a,b));
        break;
    case 3:
        alert("Resultado: "+dividir(a,b));
        break;
    case 4:
        alert("Resultado: "+multiplicar(a,b));
        break;
    default:
        alert("operacion no valida")
        break;
}