/** Со звездочкой */
/**
 * Создать страницу с кнопкой
 * При нажатии на кнопку должен создаваться div со случайными размерами, цветом и позицией
 * Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
 * Запрощено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */
var newBut = document.createElement('button');
newBut.id = "addDiv";
newBut.addEventListener('click', listner);

function listner() {

    console.log("кликнули на кнопку");
}
/**
 * homeworkContainer - это контейнер для всех ваших домашних заданий
 * Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер
 *
 * @example
 * homeworkContainer.appendChild(...);
 */
let homeworkContainer = document.querySelector('#homework-container');

homeworkContainer.appendChild(newBut);

/**
 * Функция должна создавать и возвращать новый div с классом draggable-div и случайными размерами/цветом/позицией
 * Функция должна только создавать элемент и задвать ему случайные размер/позицию/цвет
 * Функция НЕ должна добавлять элемент на страницу
 *
 * @return {Element}
 */
function createDiv() {
    var rndWidth = Math.floor(Math.random() * (300 - 100 + 1)) + 100;
    var rndHeight = Math.floor(Math.random() * (300 - 100 + 1)) + 100;
    var rndColor = Math.floor(Math.random()*16777215).toString(16);

    var maxX = (1000 - rndWidth ); // дальше этой позиции объект помещать не будем
    var maxY = (1000 - rndHeight); // дальше этой позиции объект помещать не будем

    var rndXpos = Math.floor(Math.random() * (maxX - 10 + 1)) + 10;
    var rndYpos = Math.floor(Math.random() * (maxY - 10 + 1)) + 10;

    var newDiv = document.createElement('div')

    newDiv.className = 'draggable-div';
    newDiv.style.cssText='width: '+ rndWidth +'px; height: '+ rndHeight +'px;';
    newDiv.style.cssText += 'background-color: #'+ rndColor;
    newDiv.style.cssText += 'top: '+ rndYpos + 'px';
    newDiv.style.cssText += 'left: '+ rndXpos + 'px';


    console.log(newDiv.style.width);

    console.log(newDiv.style.backgroundColor);
    return newDiv;
}

/**
 * Функция должна добавлять обработчики событий для перетаскивания элемента при помощи drag and drop
 *
 * @param {Element} target
 */
function addListeners(target) {
    target.addEventListener('mousedown', dnd);
    const oldZind = parseInt(target.style.zIndex);
    const elemWidth = target.offsetWidth;
    const elemHeight = target.offsetHeight;
    console.log("Высота: " + elemHeight);

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
        function moveTo(e) {

            let elemLeft = parseInt(target.style.left);
            let elemTop = parseInt(target.style.top);

            // Ограничиваем зону перетаскивания по горизонтали
            if (elemLeft > (maxX + 50) || elemLeft < -50) {
                console.warn("Попали в зону запретную зону")
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
                if (elemTop > (maxY + 50)) target.style.top = maxY + 'px';
                else target.style.top = 0 + 'px';
            }
            else if (elemTop > maxY) target.style.top = maxY + 'px';
            else if (elemTop < 0) target.style.top = 0 + 'px';
            else target.style.top = e.pageY - divPoolOffsetTop - shiftY + 'px'; // Перетаскиваем
            console.warn("Перетаскиваем")
            target.style.zIndex = newZind;


            if (target.style.top > maxY) target.style.top = maxY + 'px';
            //
            console.log("мышь по Y" + e.clientY);


        }

        document.body.addEventListener('mousemove', moveTo);

        document.body.addEventListener('mouseup', function(e) {
            document.body.removeEventListener('mousemove', moveTo);
            console.warn("Отпустили мыш");
            target.style.zIndex = oldZind;

            //ball.onmouseup = null;
        });



    }


}


let addDivButton = homeworkContainer.querySelector('#addDiv');

addDivButton.addEventListener('click', function() {
    console.log("вызвали другую фю");
    // создать новый div
    let div = createDiv();

    // добавить на страницу
    homeworkContainer.appendChild(div);
    // назначить обработчики событий мыши для реализации d&d
    addListeners(div);
    // можно не назначать обработчики событий каждому div в отдельности, а использовать делегирование
    // или использовать HTML5 D&D - https://www.html5rocks.com/ru/tutorials/dnd/basics/
});

export {
    createDiv
};
