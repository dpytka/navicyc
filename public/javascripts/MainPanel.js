var MainPanel = function() {
    MainPanel.superclass.constructor.call(this, {
        id: 'doc-body',
        region: 'center',
        margins: '0 5 5 0',
        resizeTabs: true,
        minTabWidth: 135,
        tabWidth: 135,
        plugins: new Ext.ux.TabCloseMenu(),
        enableTabScroll: true,
        activeTab: 0,

        items: {
            id: 'welcome-panel',
            title: 'NaviCyc Home',
            autoLoad: {
                url: 'welcome.html',
                scope: this
            },
            iconCls: 'icon-docs',
            autoScroll: true
        }
    });
};

Ext.extend(MainPanel, Ext.TabPanel, {
    initEvents: function() {
        MainPanel.superclass.initEvents.call(this);
    },

    loadSymbol: function(symbol) {
        var tabId = 'docs-' + symbol;
        var tab = this.getComponent(tabId);
        if (tab) {
            this.setActiveTab(tab);
        } else {
            Ext.Ajax.request({
                url: "symbol/show",
                params: {
                    name: symbol
                },
                scope: this,
                success: function(response) {
                    var jsonData = Ext.util.JSON.decode(response.responseText);

                    if (jsonData.success === true) {
                        this.addSymbolTab(tabId, symbol, jsonData.data.comment);
                    }
                    else {
                        alert('No symbol');
                    }
                },
                failure: function() {
                    alert('Error Connection')
                }
            });
        }
    },
    addSymbolTab: function(tabId, symbol, content) {
        var newPanel = this.add(new DocPanel({
            id: tabId,
            title: symbol,
            html: content
        }));
        this.setActiveTab(newPanel);
    }
});
