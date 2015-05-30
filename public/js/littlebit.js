(function () {
  var _lb = {
    dom: {
      create: function (args) {
        var ret = document.createElement(args.tag);
        ret.textContent = args.text || "";
        for (var key in (args.data || {})) {
          ret.setAttribute('data-'+key, args.data[key]);
        }
        delete args.data;
        delete args.tag;
        delete args.text;
        for (var key in args) {
          ret.setAttribute(key, args[key]);
        }
        return ret;
      }
    },
    evt: {
      create: function (name) {
        return new Event(name);
      },
      trigger: function (element, event) {
        element.dispatchEvent(event);
      },
      on: function (obj, type, fn) {
	      if (obj.addEventListener) {
          obj.addEventListener(type, fn, false);
	      } else if (obj.attachEvent) {
		      obj['e'+type+fn] = fn;
		      obj[type+fn] = function() {
			      obj['e'+type+fn](window.event);
		      };
		      obj.attachEvent('on'+type, obj[type+fn]);
	      }
      }
    }
  }

  // Create events
  var createEvt = _lb.evt.create('create');
  var destroyEvt = _lb.evt.create('destroy');
  var confirmEvt = _lb.evt.create('confirm');
  var cancelEvt = _lb.evt.create('cancel');

  window.LB = function (selector) {

    var confirm = false;

    // create widget
    var widget = _lb.dom.create({
      tag: 'div',
      class: 'lb-widget'
    });
    var label = _lb.dom.create({
      tag: 'label',
      text: 'Donate you bitch!',
      class: 'lb-label'
    });
    var button = _lb.dom.create({
      tag: 'button',
      text: 'yolo',
      class:'lb-btn'
    });
    widget.appendChild(label);
    widget.appendChild(button);

    // Setup handlers
    _lb.evt.on(button, 'click', function (e) {
      confirm = !confirm;
      console.log('confirm', confirm);
      if (confirm) {
        _lb.evt.trigger(widget, confirmEvt);
      } else {
        _lb.evt.trigger(widget, cancelEvt);
      }
    });

    // Append to DOM
    document.querySelector(selector).appendChild(widget);
    _lb.evt.trigger(widget, createEvt);
    return widget;
  }
})()
