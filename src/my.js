/**
 * Created by Danil on 27.02.2018.
 */
console.log("NODE JS are working. Русские символы 3");

var divCreator = document.body.querySelector('.divCreator')
var divCrasher = document.body.querySelector('.divCrasher')
var divPool = document.body.querySelector('.divPool')
 console.log(divPool);


var uniqueCounter = 1;


divCreator.addEventListener('click', createDiv)
divCrasher.addEventListener('click', crashDiv)

function createDiv(e) {

    var rndWidth = Math.floor(Math.random() * (500 - 100 + 1)) + 100;
    var rndHeight = Math.floor(Math.random() * (500 - 100 + 1)) + 100;
    var rndColor = Math.floor(Math.random()*16777215).toString(16);


    var rndXpos = Math.floor(Math.random() * (1500 - 20 + 1)) + 20;
    var rndYpos = Math.floor(Math.random() * (600 - 10 + 1)) + 10;

    var newDiv = document.createElement('div')

    newDiv.innerHTML = 'Блок #' + uniqueCounter + '<br>';
    newDiv.innerHTML += '<span class="color">Цвет #' + rndColor+'</span><br>';
    newDiv.innerHTML += '<span class="size">Ширина ' + rndWidth + 'px </span>';
    newDiv.innerHTML += '<span class="size">, высота ' + rndHeight + 'px </span><br>';
    newDiv.className = 'draggable-div';
    newDiv.style.cssText='width: '+ rndWidth +'px; height: '+ rndHeight +'px;';
    newDiv.style.cssText += 'background-color: #'+ rndColor;
    newDiv.style.cssText += 'top: '+ rndYpos + 'px';
    newDiv.style.cssText += 'left: '+ rndXpos + 'px';
    newDiv.style.cssText += 'z-index: '+ uniqueCounter;

    newDiv.className += ' '+'block'+ uniqueCounter;

    divPool.insertBefore(newDiv, divPool.firstChild);
    ++uniqueCounter;
}

function crashDiv(e) {
    let deletedClassName = '.block'+(--uniqueCounter);
    console.log(deletedClassName);
    let deletedDiv = document.body.querySelector(deletedClassName);
    console.log(uniqueCounter);
    divPool.removeChild(deletedDiv);
    deletedDiv = null;
}