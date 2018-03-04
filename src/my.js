/**
 * Created by Danil on 27.02.2018.
 */
console.log("NODE JS are working. Русские символы 4");

var divCreator = document.body.querySelector('.divCreator')
var divCrasher = document.body.querySelector('.divCrasher')
var divPool = document.body.querySelector('.divPool')
var divPoolStyles = getComputedStyle(divPool, null)

console.log(getOffset(divPool));

var divPoolOffsetTop = getOffset(divPool).top;
var divPoolOffsetLeft = getOffset(divPool).left;

var border = parseInt(divPoolStyles.getPropertyValue('border-width'));

console.log(border);

console.log("Top: " + divPoolOffsetTop + ", Left: " + divPoolOffsetLeft);

var uniqueCounter = 1;

divCreator.addEventListener('click', createDiv)
divCrasher.addEventListener('click', crashDiv)

function createDiv(e) {

    var rndWidth = Math.floor(Math.random() * (300 - 100 + 1)) + 100;
    var rndHeight = Math.floor(Math.random() * (300 - 100 + 1)) + 100;
    var rndColor = Math.floor(Math.random()*16777215).toString(16);

    var maxX = (divPool.offsetWidth - rndWidth - border*2); // дальше этой позиции объект помещать не будем
    var maxY = (divPool.offsetHeight - rndHeight- border*2); // дальше этой позиции объект помещать не будем

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
    //target.addEventListener('click', clrCnhg);
    target.addEventListener('dblclick', clrCnhg);
    target.addEventListener('mousedown', dnd);


    const oldZind = parseInt(target.style.zIndex);


    const elemWidth = target.offsetWidth;
    const elemHeight = target.offsetHeight;
    console.log("Высота: " + elemHeight);


    function clrCnhg(e) {

        //console.log(e.currentTarget.className);
        let rndColor = Math.floor(Math.random()*16777215).toString(16);
        target.style.backgroundColor= '#' + rndColor;
        target.querySelector('.color').textContent = 'Цвет #' + rndColor;

    }

    function dnd(e) {
        console.log("DND" + e.currentTarget.className);
        console.log("oldZind " + oldZind);
        let newZind = oldZind + 1000;

        let elemLeft = parseInt(target.style.left);
        let elemTop = parseInt(target.style.top);

        let shiftX = (e.pageX - divPoolOffsetLeft) - elemLeft;
        let shiftY = (e.pageY - divPoolOffsetTop) - elemTop;


        let maxX = (divPool.offsetWidth - elemWidth - border*2); // дальше этой позиции объект помещать не будем
        let maxY = (divPool.offsetHeight - elemHeight - border*2); // дальше этой позиции объект помещать не будем

        console.log(maxX);
        console.log(maxY);

        //console.log("Сдвиг мыши по Х" + shiftX);
        //console.log("Сдвиг мыши по Y" + shiftY);

        function moveTo(e) {
            addClass(target, 'active');
            var ourDiv = document.getElementsByClassName('draggable-div');
            for (let i = 0; i < ourDiv.length ; i++) {
                addClass(ourDiv[i], 'non-active') ;
            }
           // addClass(document.getElementsByClassName('.draggable-div'), '.non-active');

            let elemLeft = parseInt(target.style.left);
            let elemTop = parseInt(target.style.top);

            // Ограничиваем зону перетаскивания по горизонтали
            if (elemLeft > (maxX + 50) || elemLeft < -50) {
                console.warn("Попали в зону запретную зону")
                alert("Блок должен находится внутри серой зоны")
                document.body.removeEventListener('mousemove', moveTo);
                if (elemLeft > (maxX + 50)) target.style.left = maxX + 'px';
                else target.style.left = 0 + 'px';
            }
            else if (elemLeft > maxX) target.style.left = maxX + 'px';
            else if (elemLeft < 0) target.style.left = 0 + 'px';
            else target.style.left = e.pageX - divPoolOffsetLeft - shiftX + 'px'; // Перетаскиваем

            // Ограничиваем зону перетаскивания по вертикали
            if (elemTop > (maxY + 50) || elemTop < -50) {
                console.warn("Попали в зону запретную зону")
                document.body.removeEventListener('mousemove', moveTo);
                if (elemTop > (maxY + 50)) target.style.top = maxY + 'px';
                else target.style.top = 0 + 'px';
            }
            else if (elemTop > maxY) target.style.top = maxY + 'px';
            else if (elemTop < 0) target.style.top = 0 + 'px';
            else target.style.top = e.pageY - divPoolOffsetTop - shiftY + 'px'; // Перетаскиваем

            target.style.zIndex = newZind;
            //if (target.style.top > maxY) target.style.top = maxY + 'px';
            //console.log("мышь по Y" + e.clientY);
        }

        document.body.addEventListener('mousemove', moveTo);

        document.body.addEventListener('mouseup', function(e) {
            document.body.removeEventListener('mousemove', moveTo);
            removeClass( target, 'active');
            var ourDiv = document.getElementsByClassName('draggable-div');
            for (let i = 0; i < ourDiv.length ; i++) {
                removeClass(ourDiv[i], 'non-active') ;
            }
            console.warn("Отпустили мыш");
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
