---
title: Avoid fixed height in CSS layouts
description: Discussing a common beginners mistake in CSS layouts - using fixed height for elements.
slug: avoid-fixed-height-in-css-layouts
category: css
datePublished: 2023-09-24T00:00:00.000Z
tags: [beginner, css]
---

In this post I will discuss a common beginners mistake in CSS layouts - using fixed height for elements.
I hope providing a few examples will help you avoid this mistake and improve your CSS layouts' quality and maintenance.

## Example 1 - menus

Let's start with a simple example - a menu bar with a few links.

![Example 1 - menu bar](https://github.com/rodion-arr/rodion-arr/assets/5843270/de63acbd-3cd5-4d3b-bfcb-ed5823e16586)

I saw a lot of examples when such menu block will layouted with fixed height, like this:

```css
.menu {
  list-style: none;
  /* ... more CSS rules */

  /* fixed height */
  height: 247px;
}
```

This is a bad practice, because it makes the menu block inflexible.
If you add a new link, or change the font size, or change the padding - you will have to adjust the height manually. This is a maintenance nightmare.

## Example 2 - images

Another example is adding fixed height to images.












[Designer credits](https://www.figma.com/file/SghgVeNQt2zD3rs0dfUE4u/Landing-Page---Startup-App?type=design&node-id=3926-2632&mode=dev)
