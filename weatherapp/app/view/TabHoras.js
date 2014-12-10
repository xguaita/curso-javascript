Ext.define("weatherapp.view.TabHoras", {
	extend: 'Ext.container.Container',
	alias: 'widget.weatherAppHoras',
    requires: [
        'Ext.chart.Chart',
        'Ext.chart.series.Line',
        'Ext.chart.series.Column',
        'Ext.chart.axis.Numeric',
        'Ext.chart.axis.Category'
    ],
	layout: {
		type: 'vbox',
		align: 'stretch'
	},
	items: [{
		xtype: 'chart',
		flex: 1,
		width: '100%',
		height: '100%',
		padding: '10 0 0 0',
		style: {'background': '#fff'},
		animate: true,
		shadow: true,
		legend: {position: 'right'},
		theme: 'Sky',
		store: 'Horas',  // TODO: limitar a 48 h
		insetPadding: 40,
		items: [{
			type: 'text',
			text: 'Temperatura y viento',
			font: '22px Helvetica',
			width: 100,
			height: 30,
			x: 40,
			y: 12
		}],
		axes: [{
			type: 'Numeric',
			title: 'Temperatura',
			fields: 'temp',
			position: 'left',
			grid: true
		}, {
			type: 'Numeric',
			title: 'Viento (mps)',
			fields: 'wind',
			position: 'right',
			grid: false
 		}, {
			type: 'Category',
			fields: 'weather',
			position: 'bottom',
			grid: true,
			label: {
				renderer: function (value) {
					var palabras = value.trim().split(' ');
					return palabras.join('\n');
				}
			}
		}],
		series: [{
			type: 'line',
			axis: 'left',
			xField: 'dt_txt',
			yField: 'temp',
			title: 'Temperatura',
            smooth: true,
			style: {
				'stroke-width': 4
			},
			markerConfig: {
				radius: 4
			},
			highlight: true,
			tips: {
				trackMouse: true,
				height: 20,
				width: 60,
				showDelay: 0,
				dismissDelay: 0,
				hideDelay: 0,
				renderer: function (storeItem) {
					this.setTitle(storeItem.get('temp') + ' ºC');
				}
			}
		}, {
			type: 'line',
			axis: 'right',
			xField: 'dt_txt',
			yField: 'wind',
			title: 'Viento',
            smooth: true,
			style: {
				'stroke-width': 4
			},
			markerConfig: {
				radius: 4
			},
			highlight: true,
			tips: {
				trackMouse: true,
				height: 20,
				width: 80,
				showDelay: 0,
				dismissDelay: 0,
				hideDelay: 0,
				renderer: function (storeItem) {
					this.setTitle(storeItem.get('wind') + ' mps');
				}
			}
		}]
	}, {
		xtype: 'chart',
		flex: 1,
		width: '100%',
		height: '100%',
		padding: '10 0 0 0',
		style: {'background': '#fff'},
		animate: true,
		shadow: true,
		legend: {position: 'right'},
		theme: 'Sky',
		store: 'Horas',
		insetPadding: 40,
		items: [{
			type: 'text',
			text: 'Nubosidad y precipitaciones',
			font: '22px Helvetica',
			width: 100,
			height: 30,
			x: 40,
			y: 12
		}],
		axes: [{
			type: 'Numeric',
			title: '% nubosidad',
			fields: 'clouds',
			position: 'left',
			grid: true
		}, {
			type: 'Numeric',
			title: 'Precipitación (l/3h)',
			fields: 'rain',
			position: 'right',
			grid: false
		}, {
			type: 'Category',
			fields: 'dt_txt',
			position: 'bottom',
			grid: true,
			label: {
				renderer: function (value) {
					var fechaYhora = value.split(' '),
						fecha = fechaYhora[0].split('-');
					return fecha[2] + '-' + fecha[1] + '\n' + fechaYhora[1].substr(0, 5);
				}
			}
		}],
		series: [{
			type: 'column',
			axis: 'right',
			highlight: true,
			xField: 'dt_txt',
			yField: 'rain',
			title: 'Lluvia',
			tips: {
				trackMouse: true,
				height: 20,
				width: 60,
				showDelay: 0,
				dismissDelay: 0,
				hideDelay: 0,
				renderer: function (storeItem) {
					this.setTitle(storeItem.get('rain') + ' l/3h');
				}
			}
		}, {
			type: 'line',
			axis: 'left',
			xField: 'dt_txt',
			yField: 'clouds',
			title: 'Nubosidad',
            smooth: true,
			style: {
				'stroke-width': 4
			},
			markerConfig: {
				radius: 4
			},
			highlight: true,
			tips: {
				trackMouse: true,
				height: 20,
				width: 40,
				showDelay: 0,
				dismissDelay: 0,
				hideDelay: 0,
				renderer: function (storeItem) {
					this.setTitle(storeItem.get('clouds') + '%');
				}
			}
		}]
	}]
});
