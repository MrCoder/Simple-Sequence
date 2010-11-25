function LifeLineDrawer() {
    this.draw = function(context, entityName, left, lifeLength, selected) {
        var top = 20;
        var entityHeight = 30;

        var entityDrawer = new EntityDrawer();
        var entityWidth = entityDrawer.draw(context, entityName, left, top, selected);
        
        var lineDrawer = new LineDrawer(context);
        lineDrawer.draw(left + (entityWidth)/2, top + entityHeight, lifeLength);

        return entityWidth;
    }
}