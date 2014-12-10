Ext.define('weatherapp.model.Ciudad', {
    extend: 'Ext.data.Model',

    fields: [
        { name: 'id', type: 'int' },
        { name: 'name', type: 'string' },
        { name: 'coord', type: 'auto' },
        { name: 'main', type: 'auto' },
        { name: 'dt', type: 'int' },
        { name: 'wind', type: 'auto' },
        { name: 'sys', type: 'auto' },
        { name: 'clouds', type: 'auto' },
        { name: 'weather', type: 'auto' }

    ],
	idProperty: 'id'
});
