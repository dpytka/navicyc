Ext.onReady(function(){

  Ext.QuickTips.init();
  
  var searchPanel = new SearchPanel();
  var mainPanel = new MainPanel();
  
  searchPanel.store.loadData(myData);
  searchPanel.on('cellclick', function(grid, rowIndex, columnIndex, e){
    e.stopEvent();
    var record = grid.getStore().getAt(rowIndex);
    var fieldName = grid.getColumnModel().getDataIndex(columnIndex);
    var data = record.get(fieldName);

    mainPanel.loadClass(data, data);
  });
  
  var viewport = new Ext.Viewport({
    layout: 'border',
    items: [{
      cls: 'docs-header',
      height: 30,
      region: 'north',
      xtype: 'box',
      el: 'header',
      border: false,
      margins: '0 0 5 0'
    }, searchPanel, mainPanel]
  });
  
  viewport.doLayout();
});
