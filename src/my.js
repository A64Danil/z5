/**
 * Created by Danil on 27.02.2018.
 */

console.log("NODE JS are working. Последний апдейт - 10 марта 2018");

/**
 * Main Wrap Func
 * Contain all variables and cuntions to realease DnD
 * @version 0.0.1
 */
(function () {
    console.log('Основная функция запустилась');
    var divPool = document.body.querySelector('.divPool')
    var divPoolStyles = getComputedStyle(divPool, null)

    var divPoolOffsetTop = getOffset(divPool).top;
    var divPoolOffsetLeft = getOffset(divPool).left;


    var border = parseInt(divPoolStyles.getPropertyValue('border-width'));

//console.log(border);
//console.log("Top: " + divPoolOffsetTop + ", Left: " + divPoolOffsetLeft);
    var uniqueCounter = 1;

    var opacityChekBox = document.body.querySelector('.opacityChange');

    document.body.querySelector('.hints').addEventListener('click', function() {
        if (document.body.querySelector('.hintsList').className == 'hintsList hiddenCollapsed') {
            removeClass(document.body.querySelector('.hintsList'), 'hiddenCollapsed');
        } else addClass(document.body.querySelector('.hintsList'), 'hiddenCollapsed');

    });

    document.body.querySelector('.settings').addEventListener('click', function() {
        if (document.body.querySelector('.settingsList').className == 'settingsList hiddenCollapsed') {
            removeClass(document.body.querySelector('.settingsList'), 'hiddenCollapsed');
        } else addClass(document.body.querySelector('.settingsList'), 'hiddenCollapsed');

    });

    /**
     * Setting - Toggle Border
     * Allow to toggle white borders on the blocks
     * @version 0.0.1
     */
    (function () {
        var borderChekBox = document.body.querySelector('.borderToggle');
        borderChekBox.addEventListener('click', toggleBorders);

        function toggleBorders() {
            if (borderChekBox.checked) {
                addClass(divPool, 'without-border');
            }
            else removeClass(divPool, 'without-border');
        }
    })();

    /**
     * Creare DIV
     * Allow to create new div
     * @version 0.0.1
     */
    (function () {
        var divCreator = document.body.querySelector('.divCreator')
        divCreator.addEventListener('click', createDiv)

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
    })();

    /**
     * Crash DIV
     * Allow to destroy last div
     * @version 0.0.2
     */
    (function () {
        var divCrasher = document.body.querySelector('.divCrasher')
        divCrasher.addEventListener('click', crashDiv)

        function crashDiv(e) {
            if (uniqueCounter == 1 ) throw new Error('There is no blocks to destroy');
            let deletedClassName = '.block'+(--uniqueCounter);
            console.log(deletedClassName);
            let deletedDiv = document.body.querySelector(deletedClassName);
            console.log(uniqueCounter);
            divPool.removeChild(deletedDiv);
            deletedDiv = null;
        }

    })();

    /**
     * Drag and Drop Container
     * Allow to move any coloreds div's
     * @version 0.1.0
     */
    (function () {
        document.body.addEventListener('mousedown', dnd, true);

        function dnd(e) {
            //console.log(e.target);
            var block = e.target; // привязываем e.target чтобы мышка работала вне блока

            if (e.target.parentNode.className.match(/\bdraggable-div\b/)) {
                block = e.target.parentNode;
            }

            if (block.parentNode === divPool ) {
                // Запоминаем на один раз постоянные величины
                const oldZind = parseInt(block.style.zIndex);
                const elemWidth = block.offsetWidth;
                const elemHeight = block.offsetHeight;

                let newZind = oldZind + 1000;

                function moveTo(e) {
                    if (opacityChekBox.checked) {
                        addClass(block, 'active');
                        addClass(divPool, 'dragging');
                    }
                    let newMaxX = (divPool.offsetWidth - elemWidth - border*2); // дальше этой позиции объект ...
                    let newMaxY = (divPool.offsetHeight - elemHeight - border*2); // ... помещать не будем

                    // Двигаем, изменяя лефт и топ в зависимости от движения мыши
                    block.style.left = (parseInt(block.style.left) + e.movementX) + 'px';
                    block.style.top = (parseInt(block.style.top) + e.movementY) + 'px';

                    // Ограничиваем передвижение
                    // По левой и правой границам
                    if (newMaxX < parseInt(block.style.left)) block.style.left = newMaxX + 'px';
                    else if (parseInt(block.style.left) < 0) block.style.left = 0 + 'px';
                    // По верхей и нижней границам
                    if (newMaxY < parseInt(block.style.top)) block.style.top = newMaxY + 'px';
                    else if (parseInt(block.style.top) < 0) block.style.top = 0 + 'px';

                    block.style.zIndex = newZind;
                }

                document.body.addEventListener('mousemove', moveTo);

                document.body.addEventListener('mouseup', function(e) {
                    document.body.removeEventListener('mousemove', moveTo);
                    removeClass(block, 'active');
                    removeClass(divPool, 'dragging');
                    block.style.zIndex = oldZind;
                });
            } // -- IF END

        }

    })();

    /**
     * Touch Support
     * @version 0.0.0
     * @todo Create new brunch
     */
    (function () {
        console.log('Здесь будет тач поддержка')
    })();

    function addListeners(target) {
        target.addEventListener('mousedown', clrCnhg); // color Change
        target.addEventListener('contextmenu', function (e) {
            e.preventDefault();
        });

        //target.addEventListener('mousedown', dndInner); // Drag and Drop - ВНИМАНИЕ - ОТКЛЮЧЕН!
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

        // ЭТА ФУНКЦИЯ ОТКЛЮЧЕНА
        function dndInner(e) {
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

})();



// Общие функции

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
