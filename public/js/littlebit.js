(function () {

  function El (args) {
    var el = document.createElement(args.tag);
    el.textContent = args.text || "";
    el.className = args.class || "";
    return el;
  }

  // Create events
  var confirm = new Event('confirm');
  var cancel = new Event('cancel');

  window.LB = function (sel) {

    var didConfirm = false;

    // Create widget
    var widget = El({
      tag: 'div',
      class: 'lb-widget'
    });
    var btn = El({
      tag: 'button',
      text: 'Donate $1 ',
      class:'lb-button'
    });
    widget.appendChild(
      El({
        tag: 'label',
        text: 'Help LittleBit raise money for a good cause',
        class: 'lb-label'
      })
    );
    widget.appendChild(btn);
    // Setup click handler
    btn.addEventListener('click', function () {
      didConfirm = !didConfirm;
      if (didConfirm) {
        widget.className += ' lb-checked';
        widget.dispatchEvent(confirm);
      }
      else {
        widget.className = widget.className.replace('lb-checked', '');
        widget.dispatchEvent(cancel);
      }
    });
    // Append to DOM
    document.querySelector(sel).appendChild(widget);
    return widget;
  }
})()
