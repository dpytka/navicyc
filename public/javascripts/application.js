// Place your application-specific JavaScript functions and classes here
// This file is automatically included by javascript_include_tag :defaults
Ext.onReady(function(){

  Ext.QuickTips.init();
  
  var api = new ApiPanel();
  var mainPanel = new MainPanel();
  
  api.on('click', function(node, e){
    if (node.isLeaf()) {
      e.stopEvent();
      mainPanel.loadClass(node.attributes.href, node.id);
    }
  });
  
  var viewport = new Ext.Viewport({
    layout: 'border',
    items: [{
      cls: 'docs-header',
      height: 36,
      region: 'north',
      xtype: 'box',
      el: 'header',
      border: false,
      margins: '0 0 5 0'
    }, api, mainPanel]
  });
  
  api.expandPath('/root/apidocs');
  
  // allow for link in
  var page = window.location.href.split('?')[1];
  if (page) {
    var ps = Ext.urlDecode(page);
    var cls = ps['class'];
    mainPanel.loadClass('output/' + cls + '.html', cls, ps.member);
  }
  
  viewport.doLayout();  
});
