## Dynamic Panel pattern

A sample Enact application that uses `Changeable` and `Cancelable` HOCs on a `Panel` to simulate file browsing.

Run `npm install` then `npm run serve` to have the app running on [http://localhost:8080](http://localhost:8080), where you can view it in your browser.

#### Enact Components Used
- `moonstone/Panels/Panel`
- `moonstone/Panels/Header`
- `moonstone/Image`
- `moonstone/VirtualList`
- `ui/Cancelable`
- `ui/Changeable`

A `FileBrowser` kind is implemented that is both `Cancelable` and `Changeable`.  It renders a `Panel` that varies its children.  If the path is a directory, a `VirtualList` of the directory contents is rendered and the items' `onClick` handlers drive navigation to directory contents.

The `onCancel` handler ultimately drives navigation to the parent directory.

You can find a more detailed view inside of [App.js](src/App/App.js).

All images were obtained from [http://www.publicdomainpictures.net/](http://www.publicdomainpictures.net/) and are licensed [CC0 Public Domain](https://creativecommons.org/publicdomain/zero/1.0/).

---

This project was bootstrapped with [enact-dev](https://github.com/enyojs/enact-dev).
