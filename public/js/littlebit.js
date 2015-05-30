(function () {
  var lb = {
    dom: {
      create: function (args) {
        var ret = document.createElement(args.tag);
        ret.textContent = args.text || "";
        delete args.tag;
        delete args.text;
        for (var key in args) {
          ret.setAttribute(key, args[key]);
        }
        return ret;
      },
      addClass: function (element, className) {
        if (element.className.split(' ').indexOf(className) == -1)
          element.className += ' ' + className;
      },
      removeClass: function (element, className) {
        if (element.className.split(' ').indexOf(className) != -1)
          element.className = element.className.replace(className, '').trim();
      }
    },
    evt: {
      create: function (name) {
        return new Event(name);
      },
      trigger: function (el, event) {
        el.dispatchEvent(event);
      },
      on: function (el, type, fn) {
        el.addEventListener(type, fn, false);
      }
    }
  }

  // Create events
  var createEvt = lb.evt.create('create');
  var confirmEvt = lb.evt.create('confirm');
  var cancelEvt = lb.evt.create('cancel');

  window.LB = function (selector) {

    var confirm = false;

    // Create widget
    var widget = lb.dom.create({
      tag: 'div',
      class: 'lb-widget'
    });
    var label = lb.dom.create({
      tag: 'label',
      text: 'label',
      class: 'lb-label'
    });
    var button = lb.dom.create({
      tag: 'button',
      text: 'button',
      class:'lb-button'
    });
    widget.appendChild(label);
    widget.appendChild(button);

    // Setup click handler
    lb.evt.on(button, 'click', function (e) {
      confirm = !confirm;
      if (confirm) {
        lb.dom.addClass(widget, 'lb-checked');
        lb.evt.trigger(widget, confirmEvt);
      } else {
        lb.dom.removeClass(widget, 'lb-checked');
        lb.evt.trigger(widget, cancelEvt);
      }
    });

    // Append to DOM
    document.querySelector(selector).appendChild(widget);
    lb.evt.trigger(widget, createEvt);
    return widget;
  }
})()
