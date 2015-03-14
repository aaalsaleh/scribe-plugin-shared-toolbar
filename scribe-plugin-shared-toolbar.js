/*! The MIT License (c) 2015 Abdulrahman Alsaleh */
define(function () {
  'use strict';

  return function (toolbarNode) {
    var activeScribe = null;
    var buttons = toolbarNode.getElementsByTagName('button');

    var updateState = function () {
      Array.prototype.forEach.call(buttons, function (button) {
        if (activeScribe) {
          var command = activeScribe.getCommand(button.dataset.commandName);
          var selection = new activeScribe.api.Selection();

          selection.range && command.queryState(button.dataset.commandValue) ?
            button.classList.add('active') :
            button.classList.remove('active');

          selection.range && command.queryEnabled() ?
            button.removeAttribute('disabled') :
            button.setAttribute('disabled', 'disabled');
        } else {
          button.setAttribute('disabled', 'disabled');
        }
      });
    };

    Array.prototype.forEach.call(buttons, function (button) {
      button.addEventListener('click', function (e) {
        var command = activeScribe.getCommand(button.dataset.commandName);
        activeScribe.el.focus();
        command.execute(button.dataset.commandValue);
		e.preventDefault();
      });
    });

    updateState();

    return function (scribe) {
      scribe.el.addEventListener('focus', function (e) {
        activeScribe = scribe;
        updateState();
      });

      scribe.el.addEventListener('keyup', updateState);
      scribe.el.addEventListener('keydown', updateState);
      scribe.el.addEventListener('mouseup', updateState);
      scribe.el.addEventListener('blur', updateState);
      scribe.on('content-changed', updateState);
    };
  };
});
