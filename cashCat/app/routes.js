Ext.Router.draw(function(map){
    map.connect('dashboard', {controller: 'home', action: 'index'});

    map.connect(':controller/:action');
    map.connect(':controller/:action/:id');
});