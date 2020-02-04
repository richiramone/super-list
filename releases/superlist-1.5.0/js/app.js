(function(body) {
    'use strict';

    var app = {
        DOM: {
            body: body,
            header: null,
            listWrapper: body.find('[data-list-wrapper]'),
            list: body.find('[data-list]')
        },

        init: function () {
            app.api.get();
            app.setBaseTriggers();
        },

        api: {
            fire: function (action, params, callback, isNormalLoadingType) {
                var loadingClass = typeof isNormalLoadingType === 'undefined' ? 'loading' : 'quiet-loading';
                app.DOM.body.addClass(loadingClass);

                $.get('/api/' + action,
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
                    app.putTempContent(content.content);
                    app.api.fire('put', content, app.updateDOMList, false);
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

            putTempContent: function (text) {
                const html = '\
                <li class="existing item" data-item="temp">\
                    <h2 data-trigger-item-content>' + text + '</h2>\
                    <button data-trigger-delete>\
                    <svg viewBox="0 0 32 32">\
                        <use xlink:href="#shape-trash"></use>\
                    </svg>\
                    </button>\
                </li>';

                app.DOM.list.prepend(html);
            },

            updateDOMList: function (html) {
                app.DOM.list.html(html);
                app.DOM.listWrapper.find('[data-item-status=new]').find('[type=text]').focus();
                app.attachListEventListeners();
            },

            setBaseTriggers: function () {

                document.addEventListener("visibilitychange", function(){
                    if (!document.hidden)
                    {
                        alert("not hidden")
                    }


                    alert(document.visibilityState === "visible" ? "visi" : "boh")
                });

                //app.DOM.body.on('pageshow', app.api.get);
                //app.DOM.body.on('focus', app.api.get);

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
                app.DOM.list.find('[data-trigger-item-content]').on('click', app.itemManager.startEditing);
                app.DOM.list.find('[data-trigger-delete]').on('click', app.itemManager.deleteitem);
                app.DOM.listWrapper.find('[type=text]').on('blur keydown', app.itemManager.changeItem);
            },

            itemManager: {
                getItemElement: function (evt) {
                    return $(evt.currentTarget).parents('[data-item]');
                },

                deleteitem: function (evt) {
                    var elm = app.itemManager.getItemElement(evt);
                    var id = elm.data('item');

                    app.api.delete(id);

                    elm.addClass('deleted').animate({ width: 0 }, 300, function () {
                        elm.remove();
                    });
                },

                startEditing: function (evt) {
                    app.DOM.list.find('.editing').removeClass('editing');

                    var elm = app.itemManager.getItemElement(evt);
                    var id = elm.data('item');

                    elm.addClass('editing');

                    var input = elm.find('[type=text]'),
                    tempVal = input.val();

                    input.val(tempVal).focus();
                },

                changeItem: function (evt) {
                    if (evt.which !== 13 && evt.which !== 9) {
                        return;
                    }

                    var elm = app.itemManager.getItemElement(evt);
                    var val = elm.find('[type=text]').val();

                    if (val === '') {
                        return;
                    }

                    if (elm.attr('data-item-status') === 'new') {
                        app.api.put({ content: val });
                        elm.find('[type=text]').val('');

                        return;
                    }

                    var oldValContainer = elm.find('[data-trigger-item-content]');
                    var oldVal = oldValContainer.html();

                    elm.removeClass('editing');

                    if (val === oldVal) {
                        return;
                    }

                    elm.removeClass('new');
                    oldValContainer.html(val);
                    elm.addClass('edited');

                    app.api.update({ id: elm.attr('data-item'), content: val });

                    setTimeout(function () {
                        $('.edited').removeClass('edited');
                    }, 250);
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
