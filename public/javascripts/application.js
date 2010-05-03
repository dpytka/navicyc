// Place your application-specific JavaScript functions and classes here
// This file is automatically included by javascript_include_tag :defaults
Ext.onReady(function(){

  var win = new Ext.Window({
    width: 500,
    height: 300,
    closeAction: 'hide',
    buttons: [{
      text: "Zamknij",
			onClick: function() {
				win.close();
			}
    }]
  });
  
  win.show();
});
