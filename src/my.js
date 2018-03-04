/**
 * Created by Danil on 27.02.2018.
 */
console.log("NODE JS are working. Русские символы 4");

var divCreator = document.body.querySelector('.divCreator')
var divCrasher = document.body.querySelector('.divCrasher')
var divPool = document.body.querySelector('.divPool')
var divPoolStyles = getComputedStyle(divPool, null)
var opacityChekBox = document.body.querySelector('.opacityChange');
var borderChekBox = document.body.querySelector('.borderToggle');


console.log(getOffset(divPool));

var divPoolOffsetTop = getOffset(divPool).top;
var divPoolOffsetLeft = getOffset(divPool).left;


var border = parseInt(divPoolStyles.getPropertyValue('border-width'));

console.log(border);

console.log("Top: " + divPoolOffsetTop + ", Left: " + divPoolOffsetLeft);

var uniqueCounter = 1;

divCreator.addEventListener('click', createDiv)
divCrasher.addEventListener('click', crashDiv)
borderChekBox.addEventListener('click', toggleBorders)


document.body.querySelector('.hints').addEventListener('click', function() {
    if (document.body.querySelector('.hintsList').className == 'hintsList hiddenCollapsed') {
        removeClass(document.body.querySelector('.hintsList'), 'hiddenCollapsed');
    } else addClass(document.body.querySelector('.hintsList'), 'hiddenCollapsed');

})

document.body.querySelector('.settings').addEventListener('click', function() {
    if (document.body.querySelector('.settingsList').className == 'settingsList hiddenCollapsed') {
        removeClass(document.body.querySelector('.settingsList'), 'hiddenCollapsed');
    } else addClass(document.body.querySelector('.settingsList'), 'hiddenCollapsed');

})

window.onload = toggleBorders();

function toggleBorders() {
    if (borderChekBox.checked) {
        addClass(divPool, 'without-border');
    }
    else removeClass(divPool, 'without-border');
}

function createDiv(e) {

    var rndWidth = Math.floor(Math.random() * (300 - 100 + 1)) + 100;
    var rndHeight = Math.floor(Math.random() * (300 - 100 + 1)) + 100;
    var rndColor = Math.floor(Math.random()*16777215).toString(16);

    var maxX = (divPool.offsetWidth - rndWidth - border*2); // дальше этой позиции объект помещать не будем
    var maxY = (divPool.offsetHeight - rndHeight - border*2); // дальше этой позиции объект помещать не будем

    var rndXpos = Math.floor(Math.random() * (maxX - 10 + 1)) + 10;
    var rndYpos = Math.floor(Math.random() * (maxY - 10 + 1)) + 10;

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
    target.addEventListener('mousedown', clrCnhg); // color Change
    target.addEventListener('contextmenu', function (e) {
        e.preventDefault();
    });
    target.addEventListener('mousedown', dnd); // Drag and Drop
    const oldZind = parseInt(target.style.zIndex);

    const elemWidth = target.offsetWidth;
    const elemHeight = target.offsetHeight;


    function clrCnhg(e) {
        if (e.which == 3) {
            let rndColor = Math.floor(Math.random()*16777215).toString(16);
            target.style.backgroundColor= '#' + rndColor;
            target.querySelector('.color').textContent = 'Цвет #' + rndColor;

        }
    }

    function dnd(e) {
        //console.log("DND: " + e.currentTarget.className);
        let newZind = oldZind + 1000;
        //let shiftX = (e.pageX - divPoolOffsetLeft) - elemLeft; //console.log("Сдвиг мыши по Х" + shiftX);
        //let shiftY = (e.pageY - divPoolOffsetTop) - elemTop;  //console.log("Сдвиг мыши по Y" + shiftY);

        function moveTo(e) {
            if (opacityChekBox.checked) {
                addClass(target, 'active');
                addClass(divPool, 'dragging');
            }
            let newMaxX = (divPool.offsetWidth - elemWidth - border*2); // дальше этой позиции объект помещать не будем
            let newMaxY = (divPool.offsetHeight - elemHeight - border*2); // дальше этой позиции объект помещать не будем

            target.style.left = (parseInt(target.style.left) + e.movementX) + 'px';
            target.style.top = (parseInt(target.style.top) + e.movementY) + 'px';

            if (newMaxX < parseInt(target.style.left)) {
                target.style.left = newMaxX + 'px';
            } else if (parseInt(target.style.left) < 0) {
                target.style.left = 0 + 'px';
            }
            if (newMaxY < parseInt(target.style.top)) {
                target.style.top = newMaxY + 'px';
            } else if (parseInt(target.style.top) < 0) {
                target.style.top = 0 + 'px';
            }

            target.style.zIndex = newZind;
        }

        document.body.addEventListener('mousemove', moveTo);

        document.body.addEventListener('mouseup', function(e) {
            document.body.removeEventListener('mousemove', moveTo);
            removeClass( target, 'active');
            removeClass(divPool, 'dragging');

            //console.warn("Отпустили мыш");
            target.style.zIndex = oldZind;
        });



    }


}
function addClass(o, c){
    var re = new RegExp("(^|\\s)" + c + "(\\s|$)", "g")
    if (re.test(o.className)) return
    o.className = (o.className + " " + c).replace(/\s+/g, " ").replace(/(^ | $)/g, "")
}

function removeClass(o, c){
    var re = new RegExp("(^|\\s)" + c + "(\\s|$)", "g")
    o.className = o.className.replace(re, "$1").replace(/\s+/g, " ").replace(/(^ | $)/g, "")
}



function getOffset(elem) {
    if (elem.getBoundingClientRect) {
        // "правильный" вариант
        return getOffsetRect(elem)
    } else {
        // пусть работает хоть как-то
        return getOffsetSum(elem)
    }
}

function getOffsetRect(elem) {
    // (1)
    var box = elem.getBoundingClientRect()

    // (2)
    var body = document.body
    var docElem = document.documentElement

    // (3)
    var scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop
    var scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft

    // (4)
    var clientTop = docElem.clientTop || body.clientTop || 0
    var clientLeft = docElem.clientLeft || body.clientLeft || 0

    // (5)
    var top  = box.top +  scrollTop - clientTop
    var left = box.left + scrollLeft - clientLeft

    return { top: Math.round(top), left: Math.round(left) }
}

function getOffsetSum(elem) {
    var top=0, left=0
    while(elem) {
        top = top + parseFloat(elem.offsetTop)
        left = left + parseFloat(elem.offsetLeft)
        elem = elem.offsetParent
    }

    return {top: Math.round(top), left: Math.round(left)}
}
