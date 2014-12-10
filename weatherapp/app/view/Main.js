Ext.define('weatherapp.view.Main', {
    extend: 'Ext.container.Container',
    requires:[
        'Ext.tab.Panel',
        'Ext.layout.container.Border',
		'weatherapp.view.Ciudades',
		'weatherapp.view.TabHoras',
		'weatherapp.view.TabDias',
        'weatherapp.view.TabMaps'
    ],

    xtype: 'app-main',

    layout: {
        type: 'border'
    },

    items: [{
        region: 'north',
        xtype: 'container',
        cls: 'weatherapp-header-panel',
		layout: 'fit',
        height: 130,
		html: 'WeatherApp'
    },{
        region: 'west',
        xtype: 'weatherAppCiudades',
        title: 'Ciudades',
		collapsible: false,
		split: true,
        width: 250,
		maxWidth: 250,
		minWidth: 150
    },{
        region: 'center',
        xtype: 'tabpanel',
        deferredRender: false,
        items:[{
            title: 'Mapas',
			xtype: 'weatherAppMapas'
        }, {
            title: 'Próximas horas',
			xtype: 'weatherAppHoras'
        }, {
            title: 'Proximos días',
			xtype: 'weatherAppDias'
		}]
    }]
});
