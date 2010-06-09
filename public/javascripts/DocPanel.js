var DocPanel = Ext.extend(Ext.Panel, {
    closable: true,
    autoScroll:true,

    initComponent: function () {
        Ext.apply(this, {
            tbar: ['->',
                {
                    text: 'Effect',
                    handler: function () {
                        var obj = new Ext.Element(Ext.DomQuery.selectNode("div[@id='" + this.title + "']/div[@id='comment']"), true);
                        obj.ghost('a', {
                            easing: 'easeOut',
                            duration: .3,
                            remove: false,
                            useDisplay: true
                        });
                    },
                    scope: this
                },
                {
                    text: 'Show',
                    handler: function () {
                        var obj = new Ext.Element(Ext.DomQuery.selectNode("div[@id='" + this.title + "']/div[@id='comment']"), true);
                        obj.show();
                    },
                    scope: this
                }]
        });
        DocPanel.superclass.initComponent.call(this);
    }
});
