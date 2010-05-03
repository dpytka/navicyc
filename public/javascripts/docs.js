Ext.BLANK_IMAGE_URL = 'stylesheets/images/default/s.gif';

Docs = {};

ApiPanel = function(){
  ApiPanel.superclass.constructor.call(this, {
    id: 'api-tree',
    region: 'west',
    split: true,
    header: false,
    width: 280,
    minSize: 175,
    maxSize: 500,
    collapsible: true,
    margins: '0 0 5 5',
    cmargins: '0 0 0 0',
    rootVisible: false,
    lines: true,
    autoScroll: true,
    animCollapse: false,
    animate: false,
    collapseMode: 'mini',
    loader: new Ext.tree.TreeLoader({
      preloadChildren: true,
      clearOnLoad: false
    }),
    root: new Ext.tree.AsyncTreeNode({
      text: 'Ext JS',
      id: 'root',
      expanded: true,
      children: [Docs.classData]
    }),
    collapseFirst: false
  });
  // no longer needed!
  //new Ext.tree.TreeSorter(this, {folderSort:true,leafAttr:'isClass'});
  
  this.getSelectionModel().on('beforeselect', function(sm, node){
    return node.isLeaf();
  });
};

Ext.extend(ApiPanel, Ext.tree.TreePanel, {
  initComponent: function(){
    this.hiddenPkgs = [];
    Ext.apply(this, {
      tbar: [' ', new Ext.form.TextField({
        width: 200,
        emptyText: 'Search...',
        enableKeyEvents: true,
      })]
    })
    ApiPanel.superclass.initComponent.call(this);
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
  
  loadClass: function(href, cls, member){
    var id = 'docs-' + cls;
    var tab = this.getComponent(id);
    if (tab) {
      this.setActiveTab(tab);
      if (member) {
        tab.scrollToMember(member);
      }
    }
    else {
      var autoLoad = {
        url: href
      };
      if (member) {
        autoLoad.callback = function(){
          Ext.getCmp(id).scrollToMember(member);
        }
      }
      var p = this.add(new DocPanel({
        id: id,
        title: cls,
        autoLoad: autoLoad,
        iconCls: Docs.icons[cls]
      }));
      this.setActiveTab(p);
    }
  }
});
