(function(){
  'use strict';

  var app = {
    DOM: {
      body: null,
      header: null,
      triggers: {
        header: {
          reload: null,
          notify: null
        },
        people: {
          close: null,
          person: null
        },
        list: {
          check: null,
          delete: null,
          edit: null,
          update: null,
          put: null
        }
      },
      list: null,
      newItemTPL: null
    },

    init: function () {
      app.getDOM();
      app.api.get();
      app.setBaseTriggers();
    },

    api: {
      fire: function (action, params, callback, isNormalLoadingType) {
        var loadingClass = typeof isNormalLoadingType === 'undefined' ? 'loading' : 'quiet-loading';
        app.DOM.body.addClass(loadingClass);

        $.get(
          '/api/' + action,
          params,
          function (response) {
            if (typeof callback === 'function') {
              callback(response);
            }
            app.DOM.body.removeClass(loadingClass);
          });
      },

      get: function () {
        app.api.fire('get', {}, app.updateDOMList);
      },

      update: function (data) {
        app.api.fire('update', data, {}, false);
      },

      put: function (content) {
        app.api.fire('put', content, {}, false);
      },

      delete: function (id) {
        app.api.fire('delete', { id: id }, null, false);
      },

      notify: function (evt) {
        var person = $(evt.currentTarget).data('trigger-person');
        app.api.fire('notify', { person: person }, app.notification.showNotifiedMessage);
      }
    },

    getDOM: function () {
      app.DOM.body = $('body');
      app.DOM.header = app.DOM.body.find('header');
      app.DOM.list = app.DOM.body.find('#items');
    },

    updateDOMList: function (html) {
      app.DOM.triggers.list = {};
      app.DOM.list.html(html);
      app.DOM.newItemTPL = app.DOM.list.find('.new').clone();
      app.attachListEventListeners();
    },

    setBaseTriggers: function () {
      //HEADER
      app.DOM.triggers.header.notify = app.DOM.header.find('[data-trigger-notify]');
      app.DOM.triggers.header.notify.on('click', app.notification.showPeopleChooser);
      app.DOM.triggers.header.reload = app.DOM.header.find('[data-trigger-reload]');
      app.DOM.triggers.header.reload.on('click', app.api.get);

      //PEOPLE
      app.DOM.triggers.people.person = app.DOM.body.find('[data-trigger-person]');
      app.DOM.triggers.people.person.on('click', app.api.notify);
      app.DOM.triggers.people.close = app.DOM.body.find('[data-trigger-close-modal]');
      app.DOM.triggers.people.close.on('click', app.notification.closePeopleChooser);
    },

    attachListEventListeners: function () {
      app.DOM.triggers.list.delete = app.DOM.list.find('[data-trigger-delete]');
      app.DOM.triggers.list.delete.on('click', app.itemManager.deleteitem);

      app.DOM.triggers.list.edit = app.DOM.list.find('[data-trigger-item-content]');
      app.DOM.triggers.list.edit.on('click', app.itemManager.startEditing);

      app.DOM.triggers.list.check = app.DOM.list.find('[type=checkbox]');
      app.DOM.triggers.list.check.on('change', app.itemManager.toggleItemCheck);

      app.DOM.triggers.list.update = app.DOM.list.find('[type=text]');
      app.DOM.triggers.list.update.on('blur keydown', app.itemManager.changeItem);
    },

    resetListEventListeners: function () {
      app.DOM.triggers.list.delete.off('click');
      app.DOM.triggers.list.edit.off('click');
      app.DOM.triggers.list.check.off('change');
      app.DOM.triggers.list.update.off('blur keydown');

      app.attachListEventListeners();
    },

    itemManager: {
      getItemElement: function (evt) {
        return $(evt.currentTarget).parents('li');
      },

      resetIndexes: function () {
        var $lis = app.DOM.list.find('li');

        $.each($lis, function (i, el) {
          $(el).attr('data-item', i);
        });
      },

      deleteitem: function (evt) {
        var elm = app.itemManager.getItemElement(evt),
            id = elm.data('item');

        app.api.delete(id);

        elm.addClass('deleted').slideUp(300, function () {
          elm.remove();
          app.itemManager.resetIndexes();
        });
      },

      startEditing: function (evt) {
        app.DOM.list.find('.editing').removeClass('editing');

        var elm = app.itemManager.getItemElement(evt),
            id = elm.data('item');

        elm.addClass('editing');

        var input = elm.find('[type=text]'),
            tempVal = input.val();

        input.val(tempVal).focus();
      },

      changeItem: function (evt) {

        if (evt.which !== 13 && evt.which !== 9 && evt.which !== 0) {
          return;
        }

        var elm = app.itemManager.getItemElement(evt),
            id = elm.attr('data-item'),
            isNewItem = elm.attr('data-item-status') === 'new' ? true : false,
            val = elm.find('[type=text]').val(),
            oldValContainer = elm.find('[data-trigger-item-content]'),
            oldVal = oldValContainer.html();

        elm.removeClass('editing new');

        if (val === '' || (!isNewItem && val === oldVal)) {
          return;
        }

        oldValContainer.html(val);
        elm.addClass('edited');

        if (isNewItem) {
          app.api.put({ content: val });
          elm.attr('data-item-status', 'existing').addClass('existing');
          app.itemManager.insertNew(elm.data('item'));
        } else {
          var isChecked = elm.find('[type=checkbox]').prop('checked');
          app.api.update({ id: id, content: val, checked: isChecked });
        }

        setTimeout(function () {
          elm.removeClass('edited');
        }, 250);
      },

      insertNew: function (id) {
        app.DOM.list.append(app.DOM.newItemTPL);
        var newItem = app.DOM.list.find('[data-item-status=new]');
        newItem.attr('data-item', (id + 1));
        newItem.find('[type=text]').focus();

        app.DOM.newItemTPL = app.DOM.list.find('.new').clone();

        app.resetListEventListeners();
      },

      toggleItemCheck: function (evt) {
        var elm = app.itemManager.getItemElement(evt),
            id = elm.data('item'),
            val = elm.find('[data-trigger-item-content]').html(),
            isChecked = elm.find('[type=checkbox]').prop('checked');

        app.api.update({ id: id, content: val, checked: isChecked });
      }
    },

    notification: {
      showPeopleChooser: function () {
        app.DOM.body.addClass('notifying');
      },

      closePeopleChooser: function () {
        app.DOM.body.removeClass('notifying');
      },

      showNotifiedMessage: function () {
        app.notification.closePeopleChooser();
        app.DOM.body.addClass('notified');

        setTimeout(function () {
          app.DOM.body.removeClass('notified');
        }, 1000);
      }
    }
  };

  app.init();
})();