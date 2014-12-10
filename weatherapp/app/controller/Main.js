Ext.define('weatherapp.controller.Main', {
    extend: 'Ext.app.Controller',

	views: [
		'Ciudades'
	],

	refs: [{
        ref: 'InfoCiudad',
        selector: '#infoCiudad'
    }, {
        ref: 'LstCiudades',
        selector: '#lstCiudades'
    }, {
        ref: 'MapPanel',
        selector: '#mapPanel'
    }],

    stores: [
		'Ciudades',
		'Horas',
		'Dias'
	],

	init: function() {
		this.control({
			'#lstCiudades': {
				select: this.onCiudadSelect
			},
            '#txtCiudad': {
                ontxtciudadclick: this.onCiudadSearch
            }
		});

        // Al cargar el store de ciudades, selecciona la primera de la lista
        this.getCiudadesStore().on('load', function(store, records, successful) {
            if (successful && records.length > 0) {
                this.getLstCiudades().getSelectionModel().select(0);
            }
        },
        this);
	},

	// Buscar ciudades
	onCiudadSearch: function(txt) {
		if (txt !== null) {
			this.getCiudadesStore().load({
				params: {
					q: txt
				}
			});
		}
	},

	// Ciudad seleccionada
	onCiudadSelect: function(selModel, rec) {
		if (rec !== null) {
			this.getInfoCiudad().update(rec.data);
			this.getHorasStore().load({
				params: {
					id: rec.data.id
				}
			});
			this.getDiasStore().load({
				params: {
					id: rec.data.id
				}
			});
            var map= this.getMapPanel().map,
                vl= map.layers[map.layers.length -1];
                ll= new OpenLayers.LonLat(rec.data.coord.lon, rec.data.coord.lat).transform(map.displayProjection, map.projection),
                p= new OpenLayers.Geometry.Point(ll.lon, ll.lat),
                v= new OpenLayers.Feature.Vector(p, {}, {
                    externalGraphic: 'http://openweathermap.org/img/w/'+rec.data.weather[0].icon+'.png',
                    graphicWidth: 50,
                    graphicHeight:50
                });

            map.setCenter(ll, 8);
            vl.removeAllFeatures({silent:true});
            vl.addFeatures([v]);
		}
	}

});
