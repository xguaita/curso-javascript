Ext.define('weatherapp.store.Dias', {
    extend: 'Ext.data.Store',
    requires: [
		'weatherapp.model.Dias'
	],
    model: 'weatherapp.model.Dias',

	proxy: {
        type: 'jsonp',
        url: 'http://api.openweathermap.org/data/2.5/forecast/daily',
		limitParam: undefined,
		startParam: undefined,
		pageParam: undefined,
		extraParams: {
			cnt: 10,
			lang: 'es',
			units: 'metric'
		},
        reader: {
            type: 'json',
            root: 'list'
        }
    },

	autoLoad: false
});
