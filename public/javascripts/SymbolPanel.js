var SymbolPanel = function() {
    SymbolPanel.superclass.constructor.call(this, {
        region: 'west',
        split: true,
        header: false,
        width: 195,
        minSize: 175,
        maxSize: 500,
        collapsible: true,
        margins: '0 0 5 5',
        collapseMode: 'mini'
    });
};

Ext.extend(SymbolPanel, Ext.grid.GridPanel, {
    initComponent: function() {
        this.searchCombo = new Ext.form.ComboBox({
            store: new Ext.data.JsonStore({
                root: 'data',
                fields:['name'],
                url: 'symbol/complete'
            }),
            displayField: 'name',
            autoWidth: true,
            emptyText: 'Search...',
            enableKeyEvents: true,
            hideTrigger: true,
            forceSelection: true,
            mode: 'remote',
            queryDelay: 750,
            minChars: 1,
            selectOnFocus: true,
            listeners: {
                select: function(combo, record) {
                    that.fireEvent('submitsearch', record.data.name);
                }
            }
        });
        var that = this;
        Ext.apply(this, {
            store: new Ext.data.ArrayStore({
                fields: ['name']
            }),
            columns: [
                {
                    id: 'name',
                    header: 'Symbol',
                    dataIndex: 'name'
                }
            ],
            autoExpandColumn: 'name',
            enableHdMenu: false,
            tbar: [this.searchCombo],
            listeners: {
                cellclick: function(grid, rowIndex, columnIndex, e) {
                    var record = grid.getStore().getAt(rowIndex);
                    var fieldName = grid.getColumnModel().getDataIndex(columnIndex);
                    var data = record.get(fieldName);
                    that.fireEvent('submitsearch', data);
                }
            }
        });
        SymbolPanel.superclass.initComponent.call(this);
    },
    addToStore: function(symbol) {
        if (this.store.findExact('name', symbol) == -1) {
            this.store.insert(0, new Ext.data.Record({
                name:symbol
            }));
        }
    },
    focusSearchField: function() {
        this.searchCombo.focus();
    }

});
