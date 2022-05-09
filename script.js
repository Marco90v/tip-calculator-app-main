
const bill = document.querySelector("#bill");
const selectTip = document.querySelector(".selectTip");
const custom = document.querySelector("#Custom");
const numberOfPeople = document.querySelector("#numberOfPeople");
const montoTip = document.querySelector("#montoTip");
const montoTotal = document.querySelector("#montoTotal");
const reset = document.querySelector("#reset");

let tip = 0;
let numPerson = 1;

function removeClassActiveButtom(){
    const botones = selectTip.querySelectorAll("button");
    botones.forEach(({classList})=> classList.remove("active"));
    numberOfPeople.classList.remove("error")
}

function porcentaje(num){
    return (num / 100) * tip;
}

function calculo(){
    const mTip = porcentaje(bill.value) / numPerson;
    const temp = bill.value / numPerson;
    const mTotal = temp + porcentaje(temp);

    montoTip.innerHTML = `$${mTip.toFixed(2)}`;
    montoTotal.innerHTML = `$${mTotal.toFixed(2)}`;
}

function handlerTip(e){
    e.preventDefault();
    const {target} = e;
    if(target.tagName === "BUTTON"){
        removeClassActiveButtom();
        target.classList.toggle("active");
        tip = Number(target.id);
        custom.value = "";
    }
    numPerson > 0 && calculo();
}

function handlerCustom({target}){
    tip = Number(target.value);
    removeClassActiveButtom();
    numPerson > 0 && calculo();
}

function handlerNumberPeople({target}){
    numPerson = Number(target.value);
    if(numPerson <= 0){
        target.classList.add("error");
    }else{
        target.classList.remove("error")
        calculo();
    }
}

function handlerReset(){
    removeClassActiveButtom();
    tip = 0;
    numPerson = 1;
    montoTip.innerHTML = "$0.00";
    montoTotal.innerHTML = "$0.00";
}

selectTip.addEventListener("click",handlerTip);
custom.addEventListener("input",handlerCustom);
numberOfPeople.addEventListener("input",handlerNumberPeople);
reset.addEventListener("click",handlerReset);