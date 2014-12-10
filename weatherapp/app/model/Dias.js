Ext.define('weatherapp.model.Dias', {
    extend: 'Ext.data.Model',

    fields: [
        { name: 'dt', convert: function(v){
			var d= new Date(v * 1000);
			return d.getDate()+'-'+(d.getMonth()+1);
		}},
        { name: 'tempmax', mapping: 'temp.max' },
        { name: 'tempmin', mapping: 'temp.min' },
        { name: 'weather', mapping: 'weather[0].description' },
        { name: 'clouds' },
        { name: 'wind', mapping: 'speed' },
        { name: 'rain'}
    ],
	idProperty: 'dt'
});
