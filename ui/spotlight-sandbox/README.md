## Spotlight Sandbox

A sample Enact application that demonstrates standalone usage of `@enact/spotlight` for 5-way navigation and focus management.

The sample includes:

- **Container navigation** — nested spotlight containers with visual feedback when a container receives focus
- **Sandbox** — draggable and resizable spottable controls to exercise spatial navigation
- **Disappear sample** — focus behavior when controls are disabled, destroyed, or hidden
- **Hold sample** — press-and-hold Enter on a focused control to trigger hold and pulse events
- **Test page** — wide and tall controls for nearest-neighbor navigation testing

Use the arrow keys on your keyboard to move focus between controls. Press Enter to activate a focused control.

Each sample runs on its own page so 5-way navigation is not affected by other examples on screen.

Run `npm install` then `npm run serve` to view the app at [http://localhost:8080](http://localhost:8080).

---

This project was bootstrapped with the Enact [cli](https://github.com/enactjs/cli).
