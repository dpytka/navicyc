Ext.BLANK_IMAGE_URL = 'stylesheets/images/default/s.gif';

Ext.onReady(function() {
    Ext.QuickTips.init();

    var searchPanel = new SearchPanel();
    var mainPanel = new MainPanel();
    var myData = [];

    searchPanel.store.loadData(myData);
    searchPanel.on('submitsearch', function(symbol) {
        mainPanel.loadSymbol(symbol);
        searchPanel.addToStore(symbol);
    });

    var viewport = new Ext.Viewport({
        layout: 'border',
        items: [
            {
                cls: 'docs-header',
                height: 30,
                region: 'north',
                xtype: 'box',
                el: 'header',
                border: false,
                margins: '0 0 5 0'
            },
            searchPanel,
            mainPanel
        ]
    });

    viewport.doLayout();
});
