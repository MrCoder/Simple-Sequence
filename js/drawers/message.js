function MessageDrawer(context, message, left, top, length) {
    this.draw = function() {
        new HorizontalArrowDrawer(context, left, top, length).draw();
        new LabelDrawer(context, message, left, length, top).draw();
    }
}