Ext.define("weatherapp.view.Ciudades", {
    extend: 'Ext.panel.Panel',
    requires: [
        'Ext.form.field.Trigger',
        'Ext.grid.Panel',
        'Ext.grid.column.Template'
    ],
	alias: 'widget.weatherAppCiudades',
	layout: {
		type: 'vbox',
		align: 'stretch'
	},
    tbar: [
        {
            xtype: 'triggerfield',
            itemId: 'txtCiudad',
            emptyText: 'texto a buscar',
            triggerCls: 'x-form-search-trigger',
            onTriggerClick: function() {
                if (this.getRawValue().length < 4) {
                    Ext.Msg.alert('Error', 'Escribe al menos 4 caracteres!');
                } else {
                    this.fireEvent("ontxtciudadclick", this.getRawValue());
                }
            }
        }
    ],
    items: [
		{
			xtype: 'gridpanel',
			itemId: 'lstCiudades',
            emptyText: 'No hay resultados',
			flex: 2,
			store: 'Ciudades',
			forceFit: true,
			hideHeaders: true,
			autoScroll: true,
			scroll: 'vertical',
			columns: [
				{text: 'Ciudad',  dataIndex:'name'},
				{text: 'País',  xtype: 'templatecolumn', tpl: '{sys.country}', width: 30}
			]
		},
		{
			xtype: 'component',
			itemId: 'infoCiudad',
			flex: 3,
			autoScroll: true,
			scroll: 'vertical',
			padding: 10,
			style: {
				'border-top-width': '5px',
				'border-top-style': 'solid',
				'border-top-color': '#157fcc'
			},
			tpl: [
				"<h2>{name}, {sys.country}</h2>",
				"<h1><img src='http://openweathermap.org/img/w/{[values.weather[0].icon]}.png' style='vertical-align: middle'>{main.temp} ºC</h1>",
				"<h3>{[values.weather[0].description]}</h3>",
				"<p><b>Presión:</b> {main.pressure} hPa</p>",
				"<p><b>Humedad:</b> {main.humidity}%</p>",
				"<p><b>Nubosidad:</b> {clouds.all}%</p>",
				"<p><b>Viento:</b> {wind.speed} mps, dirección {wind.deg}º</p>"
			]
		}
	]
});
