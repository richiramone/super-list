(function(){
  'use strict';

  var app = {

    config: {

    },

    DOM: {
      body: null,
      header: null,
      headerTriggers: null,
      list: null,
      listTriggers: {}
    },

    init: function () {
      app.getDOM();
      app.loadList();
      app.attachHeaderEvents();
    },

    core: {
      callApi: function (action, params, callback) {
        app.DOM.body.addClass('loading');

        $.get(
          '/api/' + action,
          params,
          function (response) {
            callback(response);
            app.DOM.body.removeClass('loading');
          });
      }
    },

    getDOM: function () {
      this.DOM.body = $('body');
      this.DOM.header = this.DOM.body.find('header');
      this.DOM.list = this.DOM.body.find('ol');
    },

    loadList: function () {
      app.core.callApi('get', {}, app.updateList);
    },

    updateList: function (html) {
      app.DOM.list.html(html);
      app.attachListEvents();
    },

    attachHeaderEvents: function () {
      app.DOM.headerTriggers = app.DOM.header.find('button');
      //this.DOM.headerTriggers.on('click', );
    },

    attachListEvents: function () {},

    get: function () {},

    update: function () {},

    put: function () {},

    delete: function () {},

    notify: function () {},
  };

  app.init();
})();
