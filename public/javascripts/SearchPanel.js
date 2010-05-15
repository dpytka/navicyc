var SearchPanel = function() {
    SearchPanel.superclass.constructor.call(this, {
        id: 'api-tree',
        region: 'west',
        split: true,
        header: false,
        width: 195,
        minSize: 175,
        maxSize: 500,
        collapsible: true,
        margins: '0 0 5 5',
        cmargins: '0 0 0 0',
        collapseMode: 'mini'
    });
};

Ext.extend(SearchPanel, Ext.grid.GridPanel, {
    initComponent: function() {
        var that = this;
        Ext.apply(this, {
            store: new Ext.data.ArrayStore({
                fields: ['name']
            }),
            columns: [
                {
                    header: 'Name',
                    dataIndex: 'name'
                }
            ],
            tbar: [
                new Ext.form.TextField({
                    width: 150,
                    emptyText: 'Search...',
                    enableKeyEvents: true,
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
        SearchPanel.superclass.initComponent.call(this);
    },
    addToStore: function(symbol) {
        if (this.store.findExact('name', symbol) == -1) {
            this.store.add(new Ext.data.Record({name:symbol}));
        }
    }
});
