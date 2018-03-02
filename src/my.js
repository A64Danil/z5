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
    addListeners(newDiv);
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

function addListeners(target) {
    //target.addEventListener('click', clrCnhg);
    target.addEventListener('mousedown', dnd);

    function clrCnhg(e) {

        //console.log(e.currentTarget.className);
        let rndColor = Math.floor(Math.random()*16777215).toString(16);
        e.currentTarget.style.backgroundColor= '#' + rndColor;
    }

    function dnd(e) {
        console.log("DND" + e.currentTarget.className);

        e.currentTarget.style.zIndex = uniqueCounter + 1000;

        let shiftX = (e.pageX - 67) - parseInt(target.style.left);
        let shiftY = (e.pageY - 182) - parseInt(target.style.top);

        console.log("Сдвиг мыши по Х" + shiftX);
        console.log("Сдвиг мыши по Y" + shiftY);

        function moveTo(e) {
            target.style.left = e.pageX - 67 - shiftX + 'px';
            target.style.top = e.pageY - 182 - shiftY + 'px';
            //console.log("мышь по X" + e.clientX);
            //console.log("мышь по Y" + e.clientY);


        }

        document.body.addEventListener('mousemove', moveTo);

        document.body.addEventListener('mouseup', function(e) {
            document.body.removeEventListener('mousemove', moveTo);
            console.warn("Отпустили мыш");
            //target.style.zIndex -= 1000;
            //ball.onmouseup = null;
        });



    }


}