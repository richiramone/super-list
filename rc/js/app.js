!function(a){"use strict";var b={DOM:{body:a,header:null,list:a.find("#items"),newItemTPL:null},init:function(){b.api.get(),b.setBaseTriggers()},api:{fire:function(a,c,d,e){var f="undefined"==typeof e?"loading":"quiet-loading";b.DOM.body.addClass(f),$.get("/api/"+a,c,function(a){"function"==typeof d&&d(a),b.DOM.body.removeClass(f)})},get:function(){b.api.fire("get",{},b.updateDOMList)},update:function(a){b.api.fire("update",a,{},!1)},put:function(a){b.api.fire("put",a,{},!1)},"delete":function(a){b.api.fire("delete",{id:a},null,!1)},empty:function(a){confirm("Are you sure you want to empty the list?")&&b.api.fire("delete",{empty:!0},b.api.get,!1)},notify:function(a){var c=$(a.currentTarget).data("trigger-person");b.api.fire("notify",{person:c},b.notification.showNotifiedMessage)}},updateDOMList:function(a){b.DOM.list.html(a),b.DOM.newItemTPL=b.DOM.list.find(".new").clone(),b.attachListEventListeners()},setBaseTriggers:function(){b.DOM.body.find("[data-trigger-notify]").on("click",b.notification.showPeopleChooser),b.DOM.body.find("[data-trigger-reload]").on("click",b.api.get),b.DOM.body.find("[data-trigger-empty]").on("click",b.api.empty),b.DOM.body.find("[data-trigger-person]").on("click",b.api.notify),b.DOM.body.find("[data-trigger-close-modal]").on("click",b.notification.closePeopleChooser)},attachListEventListeners:function(){b.DOM.list.find("[data-trigger-delete]").on("click",b.itemManager.deleteitem),b.DOM.list.find("[data-trigger-item-content]").on("click",b.itemManager.startEditing),b.DOM.list.find("[type=checkbox]").on("change",b.itemManager.toggleItemCheck),b.DOM.list.find("[type=text]").on("blur keydown",b.itemManager.changeItem)},resetListEventListeners:function(){b.DOM.list.find("[data-trigger-delete]").off("click"),b.DOM.list.find("[data-trigger-item-content]").off("click"),b.DOM.list.find("[type=checkbox]").off("change"),b.DOM.list.find("[type=text]").off("blur keydown"),b.attachListEventListeners()},itemManager:{getItemElement:function(a){return $(a.currentTarget).parents("li")},resetIndexes:function(){var a=b.DOM.list.find("li");$.each(a,function(a,b){$(b).attr("data-item",a)})},deleteitem:function(a){var c=b.itemManager.getItemElement(a),d=c.data("item");b.api["delete"](d),c.addClass("deleted").slideUp(300,function(){c.remove(),b.itemManager.resetIndexes()})},startEditing:function(a){b.DOM.list.find(".editing").removeClass("editing");var c=b.itemManager.getItemElement(a);c.data("item");c.addClass("editing");var d=c.find("[type=text]"),e=d.val();d.val(e).focus()},changeItem:function(a){if(13===a.which||9===a.which||0===a.which){var c=b.itemManager.getItemElement(a),d=c.attr("data-item"),e="new"===c.attr("data-item-status")?!0:!1,f=c.find("[type=text]").val(),g=c.find("[data-trigger-item-content]"),h=g.html();if(c.removeClass("editing new"),""!==f&&(e||f!==h)){if(g.html(f),c.addClass("edited"),e)b.api.put({content:f}),c.attr("data-item-status","existing").addClass("existing"),b.itemManager.insertNew(c.data("item"));else{var i=c.find("[type=checkbox]").prop("checked");b.api.update({id:d,content:f,checked:i})}setTimeout(function(){c.removeClass("edited")},250)}}},insertNew:function(a){b.DOM.list.append(b.DOM.newItemTPL);var c=b.DOM.list.find("[data-item-status=new]");c.attr("data-item",a+1),c.find("[type=text]").focus(),b.DOM.newItemTPL=b.DOM.list.find(".new").clone(),b.resetListEventListeners()},toggleItemCheck:function(a){var c=b.itemManager.getItemElement(a),d=c.data("item"),e=c.find("[data-trigger-item-content]").html(),f=c.find("[type=checkbox]").prop("checked");b.api.update({id:d,content:e,checked:f})}},notification:{showPeopleChooser:function(){b.DOM.body.addClass("notifying")},closePeopleChooser:function(){b.DOM.body.removeClass("notifying")},showNotifiedMessage:function(){b.notification.closePeopleChooser(),b.DOM.body.addClass("notified"),setTimeout(function(){b.DOM.body.removeClass("notified")},1e3)}}};b.init()}($("body"));