(function(body) {

    'use strict';

    var app = {
        DOM: {
            body: body,
            header: null,
            list: body.find('#items'),
            newItemTPL: null,
            dragTempElm: null
        },

        init: function () {
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

                empty: function () {
                    app.notification.hideEmptyConfirm();
                    app.api.fire('delete', { 'empty': true }, app.api.get, false);
                },

                notify: function (evt) {
                    var person = $(evt.currentTarget).data('trigger-person');
                    app.api.fire('notify', { person: person }, app.notification.showNotifiedMessage);
                }
            },

            updateDOMList: function (html) {
                app.DOM.list.html(html);
                app.DOM.newItemTPL = app.DOM.list.find('.new').clone();
                app.attachListEventListeners();
            },

            setBaseTriggers: function () {
                //HEADER
                app.DOM.body.find('[data-trigger-notify]').on('click', app.notification.showPeopleChooser);
                app.DOM.body.find('[data-trigger-reload]').on('click', app.api.get);
                app.DOM.body.find('[data-trigger-empty]').on('click', app.notification.showEmptyConfirm);
                app.DOM.body.find('[data-trigger-confirmation-confirm]').on('click', app.api.empty);
                app.DOM.body.find('[data-trigger-confirmation-cancel]').on('click', app.notification.hideEmptyConfirm);

                //PEOPLE
                app.DOM.body.find('[data-trigger-person]').on('click', app.api.notify);
                app.DOM.body.find('[data-trigger-close-modal]').on('click', app.notification.closePeopleChooser);
            },

            attachListEventListeners: function () {
                //app.DOM.list.find('[data-trigger-delete]').on('click', app.itemManager.deleteitem); TODO
                app.DOM.list.find('[data-trigger-item-content]').on('click', app.itemManager.startEditing);
                app.DOM.list.find('[type=text]').on('blur keydown', app.itemManager.changeItem);
            },

            resetListEventListeners: function () {
                //app.DOM.list.find('[data-trigger-delete]').off('click'); TODO
                app.DOM.list.find('[data-trigger-item-content]').off('click');
                app.DOM.list.find('[type=text]').off('blur keydown');

                app.attachListEventListeners();
            },

            itemManager: {
                getItemElement: function (evt) {
                    return $(evt.currentTarget).parents('[data-item]');
                },

                resetIndexes: function () {
                    var $lis = app.DOM.list.find('[data-item]');

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
                    isNewItem = elm.attr('data-item-status') === 'new' ? true : false,
                    val = elm.find('[type=text]').val(),
                    oldValContainer = elm.find('[data-trigger-item-content]'),
                    oldVal = oldValContainer.html();

                    elm.removeClass('editing');

                    if (val === '' || (!isNewItem && val === oldVal)) {
                        return;
                    }

                    elm.removeClass('new');
                    oldValContainer.html(val);
                    elm.addClass('edited');

                    if (isNewItem) {
                        app.api.put({ content: val });
                        elm.attr('data-item-status', 'existing');
                        elm.attr('draggable', true);
                        elm.addClass('existing');
                        app.itemManager.insertNew(elm.data('item'));

                    } else {
                        var id = elm.attr('data-item'),
                        isChecked = elm.find('[type=checkbox]').prop('checked');

                        app.api.update({ id: id, content: val });
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
                },

                showEmptyConfirm: function () {
                    app.DOM.body.addClass('showConfirm');
                },

                hideEmptyConfirm: function () {
                    app.DOM.body.removeClass('showConfirm');
                }
            }
        };

        app.init();

    })($('body'));
