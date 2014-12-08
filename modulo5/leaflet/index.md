---
layout: default
title: Leaflet
folder: modulo5/leaflet
---

# Leaflet

<a href="http://leafletjs.com/" target="_blank">Leaflet</a> es una librería de código abierto para trabajar con mapas interactivos. Es fácil de programar, fácil de utilizar y con muy buen rendimiento. 

Durante la transición de OpenLayers 2 a 3 que ha supuesto aproximadamente 2 años de trabajo (de 2011 a 2014), y gracias a su simplicidad se ha convertido en la librería de _web mapping_ preferida de los desarrolladores y proyectos fuera del área de conocimiento de los _sistemas de información geográfica_.

### Características
El objetivo del proyecto es mantener una lista de <a href="http://leafletjs.com/features.html" target="_blank">funcionalidades</a> básicas para mantener la librería simple y de reducido tamaño.

La funcionalidad del núcleo de la librería se puede ampliar mediante <a href="http://leafletjs.com/plugins.html" target="_blank">plugins</a>.

### Documentación del API
Dispone de un <a href="http://leafletjs.com/reference.html" target="_blank">manual de referencia</a> bien escrito y actualizado.

Dispone de <a href="http://leafletjs.com/examples.html" target="_blank">tutoriales</a>, con pocos ejemplos y demasiado simples.

## El primer mapa

+ Cargar las librerías y su fichero de estilos en nuestra página web  
+ Definir un tag `div` que será el contenedor del mapa. Mediante estilos `CSS` se configura su tamaño  
+ Crear un <a href="http://leafletjs.com/reference.html#map-class" target="_blank">mapa</a> (L.map) y añadirle una <a href="http://leafletjs.com/reference.html#tilelayer" target="_blank">capa</a> y un control de <a href="http://leafletjs.com/reference.html#control-scale" target="_blank">escala</a>  

``` html
<!DOCTYPE html>
<html>
<head>
  <title>Primer mapa Leaflet</title>
  <meta charset="utf-8" />
  <link rel="stylesheet" href="http://cdn.leafletjs.com/leaflet-0.7.3/leaflet.css" />
  <script src="http://cdn.leafletjs.com/leaflet-0.7.3/leaflet.js"></script>
  <style type="text/css">
    .mapas {
      width: 500px;
      height: 500px;
    }
  </style>
</head>
<body>
  <div id="miMapa" class="mapas"></div>

  <script>
    // Crea un mapa y inicializa su posición y escala
    var map = L.map('miMapa').setView([39.57, 3.0], 8);

    // Crea capa openstreetmap y la añade al mapa
    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy <a href="http://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Crea control de escala y lo añade al mapa
    L.control.scale({
      imperial: false
    }).addTo(map);
  </script>
</body>
</html>
```
<a href="http://rawgit.com/xguaita/curso-javascript/master/modulo5/leaflet/leaflet1.html" target="_blank">Abrir en el navegador...</a>

Para añadir un marcador de la localización del _Curso JavaScript_ utilizamos el objeto <a href="http://leafletjs.com/reference.html#marker" target="_blank">L.marker</a>:

``` js
// Crea marcador
L.marker([39.5909565439011, 2.643059492111206], {title: 'Curso JavaScript'})
  .bindPopup('<strong>Curso JavaScript</strong><p>Aula 2 Tic Mallorca<br>General Riera, 113<br>07010 - Palma</p>')
  .addTo(map);    
```
<a href="http://rawgit.com/xguaita/curso-javascript/master/modulo5/leaflet/leaflet1-2.html" target="_blank">Abrir en el navegador...</a>

Leaflet trabaja por defecto con el sistema de referencia _Spherical Mercator_ (código EPSG:3857), proyección utilizada por los mapas de Google, Bing, OpenStreeMap... y caracterizado por representar la Tierra mediante una esfera en lugar de un elipsoide; de esta manera se simplifican los cálculos pero a costa de errores de posicionamiento.

## WGS84, capas WMS y control de capas

También define el sistema de referencia World Geodetic System (WGS) establecido en 1984 y revisado en 2004 (código EPSG:4326); según la gente de Leaflet _"A common CRS among GIS enthusiasts"_; para el resto, el sistema de referencia mundial de uso estándar en cartografía, geodesia y navegación (GPS).

Para utilizar otros sistemas de referencia se ha de utilizar el plugin <a href="https://github.com/kartena/Proj4Leaflet" target="_blank">Proj4Leaflet</a>.

Las librerías implementan el acceso a servicios _Web Map Service_ (<a href="http://www.opengeospatial.org/standards/wms" target="_blank">WMS</a>), estándar del _Open Geoespatial Consortium_ (OGC) de publicación de mapas, mediante el tipo de capa <a href="http://leafletjs.com/reference.html#tilelayer-wms" target="_blank">TileLayer.WMS</a>.

Un control de <a href="http://leafletjs.com/reference.html#control-layers" target="_blank">gestión de capas</a> permite, de forma sencilla, configurar las capas base del mapa (mapa de fondo, sólo una capa visible en cada momento) y las de superposición (se visualizan sobre la capa base).

Veamos un ejemplo:

``` js
// Crea un mapa en WGS84 y inicializa su posición y escala
var map = L.map('miMapa', {
  crs: L.CRS.EPSG4326
}).setView([39.57, 3.0], 8);

// Crea capa wms ortofoto
var orto = L.tileLayer.wms("http://ideib.caib.es/pub_ideib/public/Ortofoto/MapServer/WMSServer", {
    layers: '0,1,2',
    format: 'image/png',
    attribution: "© IDEIB"
}).addTo(map);

// Crea capa wms topográfico
var topo = L.tileLayer.wms("http://ideib.caib.es/pub_ideib/public/MTIB/MapServer/WMSServer", {
  layers: '0,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,37,38,39,41,42,43,45,46,47,48,50,51,52,54,55,56',
  format: 'image/png',
  attribution: "© IDEIB"
});

// Crea capa wms del PTM
var ptm = L.tileLayer.wms("http://www.conselldemallorca.net/ide/ws_ptm/MapServer/WMSServer", {
  layers: '0,4',
  format: 'image/png',
  transparent: true,
  opacity: 0.6,
  attribution: "© IDEmallorca"
});

// Crea capa wms de zonas de riesgo PTM
var riesgos = L.tileLayer.wms("http://www.conselldemallorca.net/ide/ws_ptm/MapServer/WMSServer", {
  layers: '7,8,9,10',
  format: 'image/png',
  transparent: true,
  attribution: "© IDEmallorca"
});

// Crea un control de gestión de capas
L.control.layers({
  'Ortofoto': orto,
  'Topográfico': topo
}, {
  'Pla territorial de Mallorca': ptm,
  'Áreas de riesgo': riesgos
}).addTo(map);

// Crea control de escala y lo añade al mapa
L.control.scale({
  imperial: false
}).addTo(map);
```
<a href="http://rawgit.com/xguaita/curso-javascript/master/modulo5/leaflet/epsg4326.html" target="_blank">Abrir en el navegador...</a>

Mediante plugins se puede acceder a servicios <a href="https://github.com/mylen/leaflet.TileLayer.WMTS" target="_blank">WMTS</a>, <a href="http://esri.github.io/esri-leaflet/api-reference/" target="_blank">Esri</a> o incluso <a href="https://github.com/heigeo/leaflet.wms" target="_blank">wms avanzado</a>.

## Capas vectoriales: GeoJSON
Además de visualizar capas de información geográfica en formato imagen (WMS), podemos cargar capas de **datos** vectoriales (puntos, líneas y polígonos) en formato <a href="http://leafletjs.com/reference.html#geojson" target="_blank">GeoJSON</a> y son las propias librerías, mediante la definición de estilos, las encargadas de dibujar los elementos.

 > **Nota:** uno de los objetivos de diseño de Leaflet es la simplicidad por un lado, y realizar de forma muy eficiente las tareas mínimas necesarias por otro. Por ello, el núcleo no implementa funciones para cargar datos (GeoJSON) de servidores; debemos utilizar herramientas externas a Leaflet para ello, por ejemplo JQuery

Vamos a visualizar un fichero GeoJSON con datos de 5 playas de Mallorca. La estructura de la página es la misma, con algunos cambios: cargamos JQuery y modificamos el tamaño del mapa.

``` html
<head>
  <title>Playas en GeoJSON</title>
  <meta charset="utf-8" />
  <link rel="stylesheet" href="http://cdn.leafletjs.com/leaflet-0.7.3/leaflet.css" />
  <script src="http://cdn.leafletjs.com/leaflet-0.7.3/leaflet.js"></script>
  <script src="http://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
  <style type="text/css">
    body {
      margin: 0;
    }
    .mapas {
      width: 100%;
      height: 500px;
    }
  </style>
</head>
<body>
  <div id="miMapa" class="mapas"></div>

  <script>
    // Crea un mapa y inicializa su posición y escala
    var map = L.map('miMapa').setView([39.57, 3.0], 9);

    // Crea capa openstreetmap y la añade al mapa
    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy <a href="http://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Crea control de escala y lo añade al mapa
    L.control.scale({
      imperial: false
    }).addTo(map);
    
    // Recupera un fichero json y añade sus elementos al mapa
    $.getJSON('./data/playas.geojson', function(data){ // JQuery
      L.geoJson(data).addTo(map); // Leaflet
    });
  </script>
</body>
</html>
```
<a href="http://rawgit.com/xguaita/curso-javascript/master/modulo5/leaflet/geojson1.html" target="_blank">Abrir en el navegador...</a>

  > **Nota:** en ocasiones necesitamos localizar un conjunto de elementos sobre un mapa. La opción más sencilla es crear un fichero GeoJSON con estos elementos. Si sabemos sus coordenadas es muy sencillo, únicamente necesitamos un editor de texto.
  
  > Si no sabemos las coordenadas podemos utilizar aplicaciones SIG de escritorio como <a href="http://www.qgis.org/" target="_blank">QGIS</a> o <a href="http://www.gvsig.org/" target="_blank">gvSIG</a>, ambas de código abierto, o cualquiera de las opciones comerciales. Todas ellas requieren conocimientos de base en sistemas de información geográfica.
  
  > Una alternativa sencilla sin requisitos previos es <a href="http://geojson.io/" target="_blank">geojson.io</a>.

Añadimos un popup de información a las playas:

``` js
...
$.getJSON('./data/playas.geojson', function(data){
  L.geoJson(data, {
    onEachFeature: function (feature, layer) {
      layer.bindPopup('<h2>' + feature.properties.Nombre + '</h2>' +
                     '<img src="' + feature.properties.Foto + '" >', {
        minWidth: 250
      });
    }
  }).addTo(map);
});
...
```
<a href="http://rawgit.com/xguaita/curso-javascript/master/modulo5/leaflet/geojson2.html" target="_blank">Abrir en el navegador...</a>

Podemos cambiar el <a href="http://leafletjs.com/reference.html#icon" target="_blank">icono</a> de la marca:

``` js
...
L.geoJson(data, {
  pointToLayer: function (feature, latlng) {
      return L.marker(latlng, {icon: icon});
    },
  onEachFeature: function (feature, layer) {
      layer.bindPopup('<h2>' + feature.properties.Nombre + '</h2>' +
                     '<img src="' + feature.properties.Foto + '" >', {
        minWidth: 250
      });
    }
  }).addTo(map);
});
...
```
<a href="http://rawgit.com/xguaita/curso-javascript/master/modulo5/leaflet/geojson3.html" target="_blank">Abrir en el navegador...</a>

Ahora vamos a cargar datos de un servicio de incidencias de carreteras del Consell de Mallorca, que podemos ver <a href="http://www.conselldemallorca.net/sit/incidencies" target="_blank">aquí</a>. Los datos se publican mediante otro servicio estándar del OGC, el _Web Feature Service_ (<a href="http://www.opengeospatial.org/standards/wfs" target="_blank">WFS</a>).

El núcleo de Leaflet no implementa el protocolo WFS (sí lo hace mediante plugins). Utilizaremos JQuery para comunicarnos con el servicio.

Al tratarse de otro dominio, las políticas de seguridad del navegador nos impiden recuperar los datos. Utilizaremos la técnica `jsonp` implementada por el servidor de datos para evitar la restricción.

``` js
...
$.ajax({
  url: 'http://www.conselldemallorca.net/geoserver/SIT/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=incidencies_tram&outputFormat=text/javascript&srsName=EPSG:4326',
  dataType: 'jsonp',
  jsonpCallback: 'parseResponse',
  contentType: "application/json",
  success: function(data) {
    L.geoJson(data).addTo(map);
  }
});
...
```
<a href="http://rawgit.com/xguaita/curso-javascript/master/modulo5/leaflet/geojson4.html" target="_blank">Abrir en el navegador...</a>

Mediante plugins se puede acceder a servicios de datos <a href="https://github.com/calvinmetcalf/leaflet-ajax" target="_blank">Ajax</a>, <a href="https://github.com/azgs/azgs-leaflet" target="_blank">WFS</a>, <a href="http://esri.github.io/esri-leaflet/api-reference/" target="_blank">Esri</a> o incluso <a href="https://github.com/calvinmetcalf/leaflet.shapefile" target="_blank">_shapefiles_</a>, <a href="https://github.com/calvinmetcalf/leaflet.filegdb" target="_blank">_file geodatabases_</a> y <a href="https://github.com/makinacorpus/Leaflet.FileLayer" target="_blank">ficheros locales</a>.

Leaflet dibuja las líneas con el estilo por defecto, para definir uno propio utilizamos las propiedades que define la _clase_ <a href="http://leafletjs.com/reference.html#path" target="_blank">Path</a>.

``` js
...
$.ajax({
  url: 'http://www.conselldemallorca.net/geoserver/SIT/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=incidencies_tram&outputFormat=text/javascript&srsName=EPSG:4326',
  dataType: 'jsonp',
  jsonpCallback: 'parseResponse',
  contentType: "application/json",
  success: function(data) {
    L.geoJson(data, {
      style: function (feature) {
        var col= ['', '#FF0000', '#FF8C00', '#FFD700', '#008000'];
        return {
          opacity: 0.8,
          color: col[feature.properties.COLOR]
        };
      }
    }).addTo(map);
  }
});
...
```
<a href="http://rawgit.com/xguaita/curso-javascript/master/modulo5/leaflet/geojson5.html" target="_blank">Abrir en el navegador...</a>

Finalmente, podemos definir filtros que nos permiten decidir qué elementos añadimos a la capa de todos los que recibimos.

``` js
...
$.ajax({
  url: 'http://www.conselldemallorca.net/geoserver/SIT/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=incidencies_tram&outputFormat=text/javascript&srsName=EPSG:4326',
  dataType: 'jsonp',
  jsonpCallback: 'parseResponse',
  contentType: "application/json",
  success: function(data) {
    L.geoJson(data, {
      style: function (feature) {
        var col= ['', '#FF0000', '#FF8C00', '#FFD700', '#008000'];
        return {
          opacity: 0.8,
          color: col[feature.properties.COLOR]
        };
      },
      filter: function (feature, layer) {
        if (feature.properties.COLOR === 1) return true;
        return false;
      }
    }).addTo(map);
  }
});
...
```
<a href="http://rawgit.com/xguaita/curso-javascript/master/modulo5/leaflet/geojson6.html" target="_blank">Abrir en el navegador...</a>

  > **Nota:** filtraremos en el cliente (navegador) únicamente si cargamos un fichero o si el servicio no cuenta con ningún parámetro de filtro. Si el servicio del servidor implementa filtros debemos utilizarlos ya que el fichero GeoJSON será más pequeño.

## Plugins

Para utilizar pugins debemos descargarlos y guardarlos en un lugar accesible a nuestra aplicación web. Veamos un ejemplo con el plugin <a href="https://github.com/Norkart/Leaflet-MiniMap" target="_blank">MiniMap</a>, que implementa un mapa guía que muestra la posición de la vista del mapa principal.

``` html
<!DOCTYPE html>
<html>
<head>
  <title>Control MiniMap</title>
  <meta charset="utf-8" />
  <link rel="stylesheet" href="http://cdn.leafletjs.com/leaflet-0.7.3/leaflet.css" />
  <link rel="stylesheet" href="./MiniMap/Control.MiniMap.css" />
  <script src="http://cdn.leafletjs.com/leaflet-0.7.3/leaflet.js"></script>
  <script src="./MiniMap/Control.MiniMap.js"></script>
  <style type="text/css">
    body {
      margin: 0;
    }
    .mapas {
      width: 100%;
      height: 500px;
    }
  </style>
</head>
<body>
  <div id="miMapa" class="mapas"></div>

  <script>
    // Crea un mapa y inicializa su posición y escala
    var map = L.map('miMapa').setView([39.57, 3.0], 9);

    // Crea capa openstreetmap y la añade al mapa
    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy <a href="http://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Crea control de escala y lo añade al mapa
    L.control.scale({
      imperial: false
    }).addTo(map);
    
    // Crea mapa guía y lo añade al mapa
    new L.Control.MiniMap(L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'), {
      toggleDisplay: true
    }).addTo(map);
    
  </script>
</body>
</html>
```
<a href="http://rawgit.com/xguaita/curso-javascript/master/modulo5/leaflet/minimap.html" target="_blank">Abrir en el navegador...</a>


## GeoLocation API

El objeto `L.map` tiene un método para acceder fácilmente al API de GeoLocalización, <a href="http://leafletjs.com/reference.html#map-locate" target="_blank">locate</a> con las siguientes <a href="http://leafletjs.com/reference.html#map-locate-options" target="_blank">opciones</a>.

También define dos eventos <a href="http://leafletjs.com/reference.html#map-locationfound" target="_blank">locationfound y locationerror</a> para responder a una localización correcta e incorrecta, respectivamente. Cada uno de estos eventos recibe un <a href="http://leafletjs.com/reference.html#location-event" target="_blank">evento</a> con las propiedades correspondientes al estado de la operación.

``` html
<!DOCTYPE html>
<html>
<head>
  <title>GeoLocation</title>
  <meta charset="utf-8" />
  <link rel="stylesheet" href="http://cdn.leafletjs.com/leaflet-0.7.3/leaflet.css" />
  <script src="http://cdn.leafletjs.com/leaflet-0.7.3/leaflet.js"></script>
  <style type="text/css">
    body {
      margin: 0;
    }
    .mapas {
      width: 100%;
      height: 500px;
    }
  </style>
</head>
<body>
  <div id="miMapa" class="mapas"></div>

  <script>
    // Crea un mapa y inicializa su posición y escala
    var map = L.map('miMapa').setView([39.57, 3.0], 9);

    // Crea capa openstreetmap y la añade al mapa
    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy <a href="http://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Crea control de escala y lo añade al mapa
    L.control.scale({
      imperial: false
    }).addTo(map);
    
    // GeoLocalización
    map.on('locationfound', function(e){
      L.circle(e.latlng, e.accuracy / 2).addTo(map);
      L.marker(e.latlng).addTo(map);
    });
    
    map.on('locationerror', function(e){
      alert(e.message);
    });
    
    map.locate({
      setView: true
    });
  </script>
</body>
</html>
```
<a href="http://rawgit.com/xguaita/curso-javascript/master/modulo5/leaflet/location.html" target="_blank">Abrir en el navegador...</a>



  > **Ejercicio:** mapa con los 5 lugares del mundo que os gustaría visitar. Incluir fotos y mapa guía
