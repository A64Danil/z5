/**
 * Owl Carousel v2.2.1
 * Copyright 2013-2017 David Deutsch
 * Licensed under  ()
 */

/**
 * Owl carousel
 * @version 2.1.6
 * @author Bartosz Wojciechowski
 * @author David Deutsch
 * @license The MIT License (MIT)
 * @todo Lazy Load Icon
 * @todo prevent animationend bubling
 * @todo itemsScaleUp
 * @todo Test Zepto
 * @todo stagePadding calculate wrong active classes
 */

for (var i = 0; i < touches.length; i++) {

    if (e.target.parentNode.className.match(/\bdraggable-div\b/)) {
        block = e.target.parentNode;
        //alert('draggable-div');
    }

    if (block.parentNode === divPool ) {
        // Запоминаем на один раз постоянные величины
        const oldZind = parseInt(block.style.zIndex);
        const elemWidth = block.offsetWidth;
        const elemHeight = block.offsetHeight;

        let newZind = oldZind + 1000;

        let newMaxX = (divPool.offsetWidth - elemWidth - border*2); // дальше этой позиции объект ...
        let newMaxY = (divPool.offsetHeight - elemHeight - border*2); // ... помещать не будем

        // Двигаем, изменяя лефт и топ в зависимости от движения мыши
        //block.style.left = touch.pageX - divPoolOffsetLeft - shiftX + 'px';
        //block.style.top = touch.pageY - divPoolOffsetTop - shiftY + 'px';
        block.style.left = touch.pageX + 'px';
        block.style.top = touch.pageY + 'px';

        // Ограничиваем передвижение
        // По левой и правой границам
        /*
         if (newMaxX < parseInt(block.style.left)) block.style.left = newMaxX + 'px';
         else if (parseInt(block.style.left) < 0) block.style.left = 0 + 'px';
         */
        // По верхей и нижней границам
        /*
         if (newMaxY < parseInt(block.style.top)) block.style.top = newMaxY + 'px';
         else if (parseInt(block.style.top) < 0) block.style.top = 0 + 'px';
         */


        // statusdiv.innerHTML = 'block.style.left: ' + block.style.left +
        // ' block.style.top: ' + block.style.top;


        //statusdiv.innerHTML = 'shiftX: ' + shiftX + ' shiftY: ' + shiftY;

        if (opacityChekBox.checked) {
            addClass(block, 'active');
            addClass(divPool, 'dragging');
        }

        block.style.zIndex = newZind;
    } // END OF --if block == div--

    // divPool.textContent += "Палец " + touches[i] + "; ";
    //alert('палец ' + touches[i].identifier);
    if (touches.length > 3) {
        alert('пальцев:' + touches.length);
    }
    //var idx = ongoingTouchIndexById(touches[i].identifier);


} // END OF -for-