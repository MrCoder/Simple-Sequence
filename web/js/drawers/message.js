function MessageDrawer() {
    this.draw = function(context, message, left, top, length) {
        new HorizontalArrowDrawer(context).draw(left, top, length);
        new LabelDrawer(context).draw(message, left, length, top);
    }
}