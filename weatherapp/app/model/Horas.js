Ext.define('weatherapp.model.Horas', {
    extend: 'Ext.data.Model',

    fields: [
        { name: 'dt', type: 'int' },
        { name: 'temp', mapping: 'main.temp' },
        { name: 'weather', mapping: 'weather[0].description' },
        { name: 'clouds', mapping: 'clouds.all' },
        { name: 'wind', mapping: 'wind.speed' },
        { name: 'rain', convert: function(v){
			return v['3h'];
		}},
        { name: 'dt_txt', type: 'string' }

    ],
	idProperty: 'dt'
});
