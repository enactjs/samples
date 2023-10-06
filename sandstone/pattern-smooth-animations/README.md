## Smooth animations pattern

A sample Enact application that test the 4 new CSS features for smooth entry and exit animations, introduced by Chrome 116.

These four new features include:

- The ability to animate **display** and **content-visibility** on a keyframe timeline (From Chrome 116).
- The **transition-behavior** property with the **allow-discrete** keyword to enable transitions of discrete properties like display (From Chrome 117).
- The **@starting-style** rule to animate entry effects from display: none and into the top-layer (From Chrome 117).
- The **overlay** property to control top-layer behavior during an animation (From Chrome 117).

_(source: https://developer.chrome.com/blog/entry-exit-animations/)_

Run `npm install` then `npm run serve` to have the app running on [http://localhost:8080](http://localhost:8080), where you can view it in your browser.

---

This project was bootstrapped with the Enact [cli](https://github.com/enactjs/cli).
