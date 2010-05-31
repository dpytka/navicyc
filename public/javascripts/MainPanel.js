var MainPanel = function() {
    MainPanel.superclass.constructor.call(this, {
        region: 'center',
        margins: '0 5 5 0',
        resizeTabs: true,
        minTabWidth: 135,
        tabWidth: 135,
        plugins: new Ext.ux.TabCloseMenu(),
        enableTabScroll: true,
        activeTab: 0,
        tabprefix: 'symbol-',

        items: {
            id: 'welcome-panel',
            title: 'NaviCyc Home',
            autoLoad: {
                url: 'home/welcome',
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
        this.body.on('click', this.onClick, this);
    },

    onClick: function(e, target) {
        if (target.localName == 'a') {
            this.showSymbolTab(target.innerHTML);
        }
        e.stopEvent();
    },
    showSymbolTab: function(symbol) {
        if (this.isSymbolLoaded(symbol)) {
            this.setActiveSymbol(symbol);
        } else {
            this.addSymbolTab(symbol);
        }
    },
    isSymbolLoaded: function(symbol) {
        var tabId = this.tabprefix + symbol;
        var tab = this.getComponent(tabId);
        if (tab) {
            return true;
        }
        else {
            return false;
        }
    },
    setActiveSymbol: function(symbol) {
        var tabId = this.tabprefix + symbol;
        var tab = this.getComponent(tabId);
        this.setActiveTab(tab);
    },
    addSymbolTab: function(symbol) {
        var newPanel = this.add(new DocPanel({
            id: this.tabprefix + symbol,
            title: symbol,
            autoLoad: {
                url: "symbol/show",
                params: {
                    name: symbol
                }
            }
        }));
        this.setActiveTab(newPanel);
        this.fireEvent('loadedsymbol', symbol);
    }
});
