var DocPanel = Ext.extend(Ext.Panel, {
    closable: true,
    autoScroll:true,

    initComponent: function() {
        Ext.apply(this, {
            tbar: ['->', {
                text: 'Options'
            }]
        });
        DocPanel.superclass.initComponent.call(this);
    }
});
