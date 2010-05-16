var SymbolsPanel = function() {
    SymbolsPanel.superclass.constructor.call(this, {
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

Ext.extend(SymbolsPanel, Ext.grid.GridPanel, {
    initComponent: function() {
        var that = this;
        Ext.apply(this, {
            store: new Ext.data.ArrayStore({
                fields: ['name']
            }),
            columns: [
                new Ext.grid.RowNumberer(),
                {
                    id: 'name',
                    header: 'Symbol',
                    dataIndex: 'name'
                }
            ],
            autoExpandColumn: 'name',
            enableHdMenu: false,
            tbar: [
                new Ext.form.ComboBox({
                    autoWidth: true,
                    emptyText: 'Search...',
                    enableKeyEvents: true,
                    hideTrigger:true,
                    listeners: {
                        specialkey: function(field, e) {
                            if (e.getKey() == e.ENTER) {
                                that.fireEvent('submitsearch', field.getValue());
                            }
                        }
                    }
                })],
            listeners: {
                cellclick: function(grid, rowIndex, columnIndex, e) {
                    var record = grid.getStore().getAt(rowIndex);
                    var fieldName = grid.getColumnModel().getDataIndex(columnIndex);
                    var data = record.get(fieldName);
                    that.fireEvent('submitsearch', data);
                }
            }
        });
        SymbolsPanel.superclass.initComponent.call(this);
    },
    addToStore: function(symbol) {
        if (this.store.findExact('name', symbol) == -1) {
            this.store.insert(0, new Ext.data.Record({
                name:symbol
            }));
        }
    }
});
