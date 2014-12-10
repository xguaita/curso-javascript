Ext.define('weatherapp.store.Horas', {
    extend: 'Ext.data.Store',
    requires: [
		'weatherapp.model.Horas'
	],
    model: 'weatherapp.model.Horas',

	proxy: {
        type: 'jsonp',
        url: 'http://api.openweathermap.org/data/2.5/forecast',
		limitParam: undefined,
		startParam: undefined,
		pageParam: undefined,
		extraParams: {
			lang: 'es',
			units: 'metric'
		},
        reader: {
            type: 'json',
            root: 'list'
        }
    },

    filters: [
        function(item) {
            if (item.index < 16) return true;
            return false;
        }
    ],

    autoLoad: false
});
