Ext.BLANK_IMAGE_URL = 'stylesheets/images/default/s.gif';

Docs = {};

SearchPanel = function(){
  SearchPanel.superclass.constructor.call(this, {
    id: 'api-tree',
    region: 'west',
    split: true,
    header: false,
    width: 195,
    minSize: 175,
    maxSize: 500,
    collapsible: true,
    margins: '0 0 5 5',
    cmargins: '0 0 0 0',
    collapseMode: 'mini'
  });
};

Ext.extend(SearchPanel, Ext.grid.GridPanel, {
  initComponent: function(){
    Ext.apply(this, {
      store: new Ext.data.ArrayStore({
        fields: ['name']
      }),
      columns: [
            {header: 'Name', dataIndex: 'name'}
        ],
      tbar: [' ', new Ext.form.TextField({
        width: 150,
        emptyText: 'Search...',
        enableKeyEvents: true,
      })]
    })
    SearchPanel.superclass.initComponent.call(this);
  }
});


DocPanel = Ext.extend(Ext.Panel, {
  closable: true,
  
  initComponent: function(){
    Ext.apply(this, {
      tbar: ['->', {
        text: 'Options'
      }]
    });
    DocPanel.superclass.initComponent.call(this);
  }
});


MainPanel = function(){
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
        callback: this.initSearch,
        scope: this
      },
      iconCls: 'icon-docs',
      autoScroll: true
    }
  });
};

Ext.extend(MainPanel, Ext.TabPanel, {

  initEvents: function(){
    MainPanel.superclass.initEvents.call(this);
  },
  
  loadClass: function(href, cls){
    var id = 'docs-' + cls;
    var tab = this.getComponent(id);
    if (tab) {
      this.setActiveTab(tab);
    }
    else {
      var autoLoad = {
        url: href
      };
      var p = this.add(new DocPanel({
        id: id,
        title: cls,
        autoLoad: autoLoad
      }));
      this.setActiveTab(p);
    }
  }
});
