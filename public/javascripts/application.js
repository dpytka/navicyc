Ext.BLANK_IMAGE_URL = 'stylesheets/images/default/s.gif';

Ext.onReady(function() {
    Ext.QuickTips.init();

    var symbolPanel = new SymbolPanel();
    var mainPanel = new MainPanel();
    var myData = [];

    symbolPanel.store.loadData(myData);
    symbolPanel.on('submitsearch', function(symbol, type) {
        mainPanel.showSymbolTab(symbol, type);
    });
    mainPanel.on('loadedsymbol', function(symbol, type) {
        symbolPanel.addToStore(symbol, type);
    });

    var viewport = new Ext.Viewport({
        layout: 'border',
        items: [
            {
                height: 30,
                region: 'north',
                xtype: 'box',
                el: 'header',
                border: false,
                margins: '0 0 5 0'
            },
            symbolPanel,
            mainPanel
        ]
    });

    viewport.doLayout();
    symbolPanel.focusSearchField();
});
