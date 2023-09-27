---
title: Avoid fixed height in CSS layouts
description: Discussing a common beginners mistake in CSS layouts - using fixed height for elements.
slug: avoid-fixed-height-in-css-layouts
category: css
datePublished: 2023-09-24T00:00:00.000Z
tags: [beginner, css]
---

In this post we will discuss a common beginners mistake in CSS layouts - using fixed height for elements.
I hope providing a few examples will help people avoid this mistake and improve your CSS layouts' quality and maintenance.

## Example 1 - menus

Let's start with a simple example - a menu bar with a few links.

![Example 1 - menu bar](https://github.com/rodion-arr/rodion-arr/assets/5843270/de63acbd-3cd5-4d3b-bfcb-ed5823e16586)

I saw a lot of times when such menu block was laid out with fixed height, like this:

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

The `height` rule can be dropped here completely, and the menu will look exactly the same.

## Example 2 - images

Another example is adding fixed height to images, like in this blog page for example:

![Example 2 - Blog post image](https://github.com/rodion-arr/rodion-arr/assets/5843270/ba0f07e2-69c1-4415-a3f8-58c67a0252be)

Let's consider the following CSS:

```css
.blog-page-content__image {
  border-radius: 10px;
  margin-bottom: 26px;
  width: 700px;
  height: 400px;
}
```

There are a few problems with this approach:

1. The image is not responsive. If the screen is smaller than 700px (plus sidebar width), the image will overflow the screen.
1. Adding a new image with different dimensions will cause image to look distorted, like this:

![Example 2 - Blog post image](https://github.com/rodion-arr/rodion-arr/assets/5843270/deb4e4f6-6fff-47d0-ba5d-99b80ae1bfa9)

In most cases having just `width: 100%;` rule is enough, and the image will look good on any screen size.

## Example 3 - Fixed images size but different aspect ratios

Let's consider another example - a list of images with different aspect ratios. Sometimes it is required to have fixed height in images by design but the source of images (e.g. CMS) provides images with different aspect ratios.

To solve this problem, we can use `object-fit` CSS rule. It allows to specify how the image should be resized to fit the container.

```css
.blog-page-content__image {
  border-radius: 10px;
  margin-bottom: 26px;
  width: 700px;
  height: 400px;
  object-fit: cover;
}
```
So the image from previous example will look like this:

![Example 3 - object-fit example](https://github.com/rodion-arr/rodion-arr/assets/5843270/77aa5bc0-0a40-490b-9f7a-0c3df9faf3ec)





[Designer credits](https://www.figma.com/file/SghgVeNQt2zD3rs0dfUE4u/Landing-Page---Startup-App?type=design&node-id=3926-2632&mode=dev)
