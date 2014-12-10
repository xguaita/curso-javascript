Ext.define("weatherapp.view.TabMaps", {
    extend: 'Ext.container.Container',
    requires: [
        'GeoExt.panel.Map',
        'GeoExt.slider.Zoom'
    ],
    alias : 'widget.weatherAppMapas',
    border: false,
    layout: 'fit',
    items: {
        xtype: 'gx_mappanel',
        itemId: 'mapPanel',
        center: '331600, 4809500',
        zoom: 9,
        map: {
            projection: "EPSG:3857",
            displayProjection: "EPSG:4326",
            allOverlays: false,
            controls: [
                new OpenLayers.Control.Navigation(),
                new OpenLayers.Control.Zoom(),
                new OpenLayers.Control.Attribution(),
                new OpenLayers.Control.LayerSwitcher()
            ]
        },
        layers: [
            new OpenLayers.Layer.OSM('OpenStreetMap'),
            new OpenLayers.Layer.XYZ('Satélite',
                'http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/${z}/${y}/${x}',
                {
                    sphericalMercator: true
                }
            ),
            new OpenLayers.Layer.XYZ("Nubosidad",
                "http://${s}.tile.openweathermap.org/map/clouds/${z}/${x}/${y}.png",
                {
                    isBaseLayer: false,
                    visibility: false,
                    opacity: 0.6,
                    sphericalMercator: true
                }
            ),
            new OpenLayers.Layer.XYZ("Precipitaciones",
                "http://${s}.tile.openweathermap.org/map/precipitation/${z}/${x}/${y}.png",
                {
                    isBaseLayer: false,
                    visibility: false,
                    opacity: 0.6,
                    sphericalMercator: true
                }
            ),
            new OpenLayers.Layer.XYZ("Temperatura",
                "http://${s}.tile.openweathermap.org/map/temp/${z}/${x}/${y}.png",
                {
                    isBaseLayer: false,
                    visibility: false,
                    opacity: 0.6,
                    sphericalMercator: true
                }
            ),
            new OpenLayers.Layer.XYZ("Viento",
                "http://${s}.tile.openweathermap.org/map/wind/${z}/${x}/${y}.png",
                {
                    isBaseLayer: false,
                    visibility: false,
                    opacity: 0.6,
                    sphericalMercator: true
                }
            ),
            new OpenLayers.Layer.XYZ("Presión atmosférica",
                "http://${s}.tile.openweathermap.org/map/pressure_cntr/${z}/${x}/${y}.png",
                {
                    isBaseLayer: false,
                    visibility: false,
                    sphericalMercator: true
                }
            ),
            new OpenLayers.Layer.Vector('Iconos', {displayInLayerSwitcher: false})
        ]
    }
});
