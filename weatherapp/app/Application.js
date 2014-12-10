Ext.define('weatherapp.Application', {
    name: 'weatherapp',

    extend: 'Ext.app.Application',

    requires:[
         'Ext.window.MessageBox'
    ],

    views: [
        'Ciudades',
		'TabHoras',
		'TabDias',
        'TabMaps'
    ],

    controllers: [
        'Main'
    ],

    stores: [
        'Ciudades',
		'Horas',
		'Dias'
    ]
});
