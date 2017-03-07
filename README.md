# [Notify.js (1.0.2)](https://eliottrobson.me/portfolio/notify-js/)

Notify.js is a sleek and powerful toast generator built on CSS3 for a smooth, dependency free customizable experience.

## Table of contents

- [Quick start](#quick-start)
- [Documentation](#documentation)
- [Demo](https://eliottrobson.github.io/Notify.js/)

## Quick start

You'll be notifying in no time:

1. [Download the latest release.](https://github.com/eliottrobson/Notify.js/archive/v1.0.2.zip)
2. (Optional) Build the source files (TypeScript and SCSS)
3. Add the scripts and styles to your Pages
4. Create a notification

### What's included

We provide the source files (`.ts` and `.scss`) along with the transpiled files (`.js` and `.css`). This will allow you to get started quickly or embed it as part of your build process and customize the styling.

```
Notify.js/
├── notify.css
├── notify.js
├── notify.scss
└── notify.ts
```

## Documentation

### Reference

A notification is an individual "toast".

A sticky notification is a notification that must be closed manually (by code or user interaction).

### API

#### Creating

In order to create a notification call one of the 4 notification methods:

```
Notify.info();
Notify.success();
Notify.warning();
Notify.error();
```

Each of these accepts 2 parameters:

Parameter | Type              | Description         | Example
--------- | ----------------- | ------------------- | -----------------
message   | `string`          | The text to display | "My Notification"
options   | `optional object` | Custom settings     | { sticky: true }

The options object is as follows:

Property | Type               | Description                                          | Example
-------- | ------------------ | ---------------------------------------------------- | -------
sticky   | `optional boolean` | If the notification requires a manual close          | false
lifespan | `optional number`  | How long the notification should show before closing | 3000

Each call will return a new Notify.Notification();

#### Fluent Notification

The return from a `Notify.info|success|warning|error()` call will return a notification. Notifications expose their own individual API.

```
var notification = Notify.info("My Notification");

notification.sticky(); // Make sticky
notification.close(); // Close
```

#### Changing JavaScript Properties

If you modify the css you might need to modify the JavaScript, you can do this by changing the Notify settings before creating a notification.

`Notify.animation = 1000;` will set all future notifications to have an animation of 1 second (this should match the SCSS variable).

`Notify.container = document.getElementById("other-notify-container");` will set the container for all future notifications.

#### Default Options

The default options for each notification can be set by changing the Notify settings before creating a notification:

`Notify.sticky = true;` will set all future notifications to sticky.

`Notify.lifespan = 5000;` will set all future notifications to last for 5 seconds (non sticky).
