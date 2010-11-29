// draw vertical line
function vertical_hand_drawing_line_to(context, fromX, fromY, toY) {
    var controlX,controlY;
    var offsetX = 3;
    var offsetY = 3;
    controlX = fromX + offsetX * (Math.random() - 0.5);
    var tmpToY = fromY + 200;
    if (tmpToY > toY) tmpToY = toY;

    controlY = fromY / 2 + tmpToY / 2 + offsetY * (Math.random() - 0.5);
    context.quadraticCurveTo(controlX, controlY, fromX, tmpToY);
    if (toY > tmpToY)
        vertical_hand_drawing_line_to(context, fromX, tmpToY, toY);
}

// draw horizontal line
function horizontal_hand_drawing_line_to(context, fromX, fromY, toX) {
    var controlX,controlY;
    var offsetX = 3;
    var offsetY = 3;
    controlY = fromY + offsetY * (Math.random() - 0.5);
    if (toX > fromX) {
        var tmpToX = fromX + 20;
        if (tmpToX > toX) tmpToX = toX;
    } else {
        var tmpToX = fromX - 20;
        if (tmpToX < toX) tmpToX = toX;
    }

    controlX = fromX / 2 + tmpToX / 2 + offsetX * (Math.random() - 0.5);
    context.quadraticCurveTo(controlX, controlY, tmpToX, fromY);
    if ((toX > fromX && toX > tmpToX) || (toX < fromX && toX < tmpToX))
        horizontal_hand_drawing_line_to(context, tmpToX, fromY, toX);
}

function hand_drawing_rect(context, left, top, width, height, radius) {
    context.moveTo(left + radius, top);
    horizontal_hand_drawing_line_to(context, left + radius, top, left + width - radius);
    context.quadraticCurveTo(left + width, top, left + width, top + radius);
    vertical_hand_drawing_line_to(context, left + width, top + radius, top + height - radius);
    context.quadraticCurveTo(left + width, top + height, left + width - radius, top + height);
    horizontal_hand_drawing_line_to(context, left + width - radius, top + height, left + radius);
    context.quadraticCurveTo(left, top + height, left, top + height - radius);
    context.lineTo(left, top + radius);
    context.quadraticCurveTo(left, top, left + radius, top);
}
