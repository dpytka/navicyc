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
    lines: false,
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
  },
  selectClass: function(cls){
    if (cls) {
      var parts = cls.split('.');
      var last = parts.length - 1;
      var res = [];
      var pkg = [];
      for (var i = 0; i < last; i++) { // things get nasty - static classes can have .
        var p = parts[i];
        var fc = p.charAt(0);
        var staticCls = fc.toUpperCase() == fc;
        if (p == 'Ext' || !staticCls) {
          pkg.push(p);
          res[i] = 'pkg-' + pkg.join('.');
        }
        else 
          if (staticCls) {
            --last;
            res.splice(i, 1);
          }
      }
      res[last] = cls;
      
      this.selectPath('/root/apidocs/' + res.join('/'));
    }
  }
});


DocPanel = Ext.extend(Ext.Panel, {
  closable: true,
  autoScroll: true,
  
  initComponent: function(){
    var ps = this.cclass.split('.');
    this.title = ps[ps.length - 1];
    Ext.apply(this, {
      tbar: ['->', {
        text: 'Config Options',
        handler: this.scrollToMember.createDelegate(this, ['configs']),
        iconCls: 'icon-config'
      }, '-', {
        text: 'Properties',
        handler: this.scrollToMember.createDelegate(this, ['props']),
        iconCls: 'icon-prop'
      }, '-', {
        text: 'Methods',
        handler: this.scrollToMember.createDelegate(this, ['methods']),
        iconCls: 'icon-method'
      }, '-', {
        text: 'Events',
        handler: this.scrollToMember.createDelegate(this, ['events']),
        iconCls: 'icon-event'
      }, '-', {
        text: 'Direct Link',
        handler: this.directLink,
        scope: this,
        iconCls: 'icon-fav'
      }, '-', {
        tooltip: 'Hide Inherited Members',
        iconCls: 'icon-hide-inherited',
        enableToggle: true,
        scope: this,
        toggleHandler: function(b, pressed){
          this.body[pressed ? 'addClass' : 'removeClass']('hide-inherited');
        }
      }, '-', {
        tooltip: 'Expand All Members',
        iconCls: 'icon-expand-members',
        enableToggle: true,
        scope: this,
        toggleHandler: function(b, pressed){
          this.body[pressed ? 'addClass' : 'removeClass']('full-details');
        }
      }]
    });
    DocPanel.superclass.initComponent.call(this);
  },
  
  directLink: function(){
    var link = String.format("<a href=\"{0}\" target=\"_blank\">{0}</a>", document.location.href + '?class=' + this.cclass);
    Ext.Msg.alert('Direct Link to ' + this.cclass, link);
  },
  
  scrollToMember: function(member){
    var el = Ext.fly(this.cclass + '-' + member);
    if (el) {
      var top = (el.getOffsetsTo(this.body)[1]) + this.body.dom.scrollTop;
      this.body.scrollTo('top', top - 25, {
        duration: 0.75,
        callback: this.hlMember.createDelegate(this, [member])
      });
    }
  },
  
  scrollToSection: function(id){
    var el = Ext.getDom(id);
    if (el) {
      var top = (Ext.fly(el).getOffsetsTo(this.body)[1]) + this.body.dom.scrollTop;
      this.body.scrollTo('top', top - 25, {
        duration: 0.5,
        callback: function(){
          Ext.fly(el).next('h2').pause(0.2).highlight('#8DB2E3', {
            attr: 'color'
          });
        }
      });
    }
  },
  
  hlMember: function(member){
    var el = Ext.fly(this.cclass + '-' + member);
    if (el) {
      if (tr = el.up('tr')) {
        tr.highlight('#cadaf9');
      }
    }
  }
});


MainPanel = function(){

  this.searchStore = new Ext.data.Store({
    proxy: new Ext.data.ScriptTagProxy({
      url: 'http://extjs.com/playpen/api.php'
    }),
    reader: new Ext.data.JsonReader({
      root: 'data'
    }, ['cls', 'member', 'type', 'doc']),
    baseParams: {},
    listeners: {
      'beforeload': function(){
        this.baseParams.qt = Ext.getCmp('search-type').getValue();
      }
    }
  });
  
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
        cclass: cls,
        autoLoad: autoLoad,
        iconCls: Docs.icons[cls]
      }));
      this.setActiveTab(p);
    }
  }
});

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
  
  mainPanel.on('tabchange', function(tp, tab){
    api.selectClass(tab.cclass);
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
