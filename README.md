## Scribe's Shared Toolbar Plugin

An alternative implementation of the [Guardian's toolbar plugin][1] for [Scribe][2]. Compared to the Guardian's plugin, it has the following improvements: 

1. The possibility of sharing a toolbar between one or more Scribe instances.
2. The states of the toolbar's buttons will also be updated on `keydown` events.
3. The toolbar will only register a single event handler per event.

### Loading

This plugin is an AMD module.

```javascript
require(['scribe', 'scribe-plugin-shared-toolbar', ...], function (Scribe, scribePluginSharedToolbar, ...) {
  ...
});
```

### Usage

#### Initialization

The plugin expects the `DOM Element` representing the toolbar as an argument.

```javascript
require(['scribe', 'scribe-plugin-shared-toolbar', ...], function (Scribe, scribePluginSharedToolbar, ...) {
  var scribe = new Scribe(...);
  var toolbar = scribePluginSharedToolbar(document.querySelector('#toolbar'));
  scribe.use(toolbar);
  ...
});
```

#### Toolbar Structure

The toolbar is any container element with one or more `button` elements. Each button should specifiy the command in the data attribute `data-command-name`. Optionally, you can specifiy the prefered value for the command using the data attribute `data-command-value`.

```html
<div id="#toolbar">
  <button data-command-name="bold">Bold</button>
  <button data-command-name="italic">Italic</button>
  ...
</div>
```

#### Toolbar Styling

The toolbar and the buttons can be styled in any prefered way using CSS. The buttons can have three styling states:

* Normal: when the command can be applied. Use the `button` selector to style the normal state.
* Active: when the command is currently applied. Use the `button.active` selector to style the active state.
* Disabled: when the command cannot be applied. Use the `button:disabled` selector to style the disabled state.

```css
#toolbar {
  background: #ccc;
}

#toolbar button {
  border: 1px outset;
  background: #ccc;
  color: #000;
}

#toolbar button.active {
  border: 1px inset;
}

#toolbar button:disabled {
  color: #999;
}
```

### Examples

#### Exclusive Toolbars

Each Scribe instance has its own exclusive toolbar:

```javascript
require(['scribe', 'scribe-plugin-shared-toolbar'], function (Scribe, scribePluginSharedToolbar) {
  var scribe1 = new Scribe(document.querySelector('#scribe1'));
  var toolbar1 = scribePluginSharedToolbar(document.querySelector('#toolbar1'));
  scribe1.use(toolbar1);
  
  var scribe2 = new Scribe(document.querySelector('#scribe2'));
  var toolbar2 = scribePluginSharedToolbar(document.querySelector('#toolbar2'));
  scribe2.use(toolbar2);
  
  ...
});
```

#### Shared Toolbar

Multiple Scribe instances have a shared and global toolbar:

```javascript
require(['scribe', 'scribe-plugin-shared-toolbar'], function (Scribe, scribePluginSharedToolbar) {
  var sharedlToolbar = scribePluginSharedToolbar(document.querySelector('#toolbar'));
  
  var scribe1 = new Scribe(document.querySelector('#scribe1'));
  scribe1.use(sharedlToolbar);
  
  var scribe2 = new Scribe(document.querySelector('#scribe2'));
  scribe2.use(sharedlToolbar);
  
  ...
});
```

### License

[The MIT License (MIT)][3].

[1]:https://github.com/guardian/scribe-plugin-toolbar
[2]:https://github.com/guardian/scribe
[3]:LICENSE
