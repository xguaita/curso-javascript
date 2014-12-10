Ext.define('weatherapp.store.Ciudades', {
    extend: 'Ext.data.Store',
    requires: [
		'weatherapp.model.Ciudad'
	],
    model: 'weatherapp.model.Ciudad',

    proxy: {
        type: 'jsonp',
        url: 'http://api.openweathermap.org/data/2.5/find',
		limitParam: undefined,
		startParam: undefined,
		pageParam: undefined,
		extraParams: {
			type: 'like',
			lang: 'es',
			units: 'metric',
			q: 'palma'
		},
        reader: {
            type: 'json',
            root: 'list'
        }
    },

	autoLoad: true
});
