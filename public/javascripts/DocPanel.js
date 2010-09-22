var DocPanel = Ext.extend(Ext.Panel, {
    closable: true,
    autoScroll: true,

    initComponent: function () {
        Ext.apply(this, {
            tbar: ['->',
                {
                    text: 'Fn1',
                    handler: function () {
                    },
                    scope: this
                },
                {
                    text: 'Fn2',
                    handler: function () {
                    },
                    scope: this
                }]
        });
        DocPanel.superclass.initComponent.call(this);
    }
});
