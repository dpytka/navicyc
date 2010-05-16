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
    isSymbolLoaded: function(symbol) {
        var tabId = 'docs-' + symbol;
        var tab = this.getComponent(tabId);
        if (tab) {
            return true;
        }
        else {
            return false;
        }
    },
    setActiveSymbol: function(symbol) {
        var tabId = 'docs-' + symbol;
        var tab = this.getComponent(tabId);
        this.setActiveTab(tab);
    },
    loadSymbol: function(symbol) {
        if (this.isSymbolLoaded(symbol)) {
            this.setActiveSymbol(symbol);
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
                        this.addSymbolTab(symbol, jsonData.data.comment);
                    }
                    else {
                        alert(jsonData.message);
                    }
                },
                failure: function() {
                    alert('Error Connection')
                }
            });
        }
    },
    addSymbolTab: function(symbol, content) {
        var newPanel = this.add(new DocPanel({
            id: 'docs-' + symbol,
            title: symbol,
            html: content
        }));
        this.setActiveTab(newPanel);
        this.fireEvent('loadedsymbol', symbol);
    }
});
