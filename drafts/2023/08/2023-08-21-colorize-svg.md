# How to change color of SVG with CSS

I saw a lot of cases in my career when CSS beginners exported same SVG icon files twice just to put it in the layout with different color.

Let's look on example:

![Carousel](https://github.com/rodion-arr/rodion-arr/assets/5843270/a7342539-e35c-47a0-8243-f731f0e07df9 "Carousel example")

Here we have a typical carousel component with arrows navigation. In rest state the arrow is grey, on hover - it changes its color to another. CSS beginners may want to just export 2 different SVGs: white one and blue one - and put it in CSS as 2 different SVG files. But let's think about this idea more deeply.

## Why duplicating SVGs is bad idea

This approach opens several issues because it is not flexible:

- Browser will need to download 2 almost the same SVG files with the only difference in 1 internal attribute.
- You will consume more files space on the assets server with almost identical files.
- What if designer will decide to paint arrow into third color by click event? Introducing more colors for this layout element will require to create and upload even more similar SVG files.

## What solution is better

Fortunately there is a way to colorize SVGs while having only one initial file.

Let me introduce you <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/mask-image" target="_blank">mask-image</a> CSS rule. By utilizing this rule we can change our approach of showing SVG icon by moving from `background: url(icon.svg)` rule to `mask-image: url(icon.svg)` plus some additional `mask` rules.

This `mask-image` rule works very similar to Photoshop masks - it takes your HTML element and "cuts out" a figure inside it in the form of your SVG.

After that we can set any background color to our element and this "cut out" figure will be colorized to it.

Here is `mask-image` rule usage example:

```css
.arrow {
  --arrow-svg: url('https://github.com/rodion-arr/rodion-arr/assets/5843270/0423a92c-1fe1-4dc5-a02e-cccdec646b00');
  background: none;
  outline: none;
  border: none;
  width: 40px;
  height: 40px;
  cursor: pointer;

  /* initial arrow SVG color */
  background: black;

  /* mask-image rules */
  mask-image: var(--arrow-svg);
  mask-repeat: no-repeat;
  mask-size: contain;
  mask-position: center;
  -webkit-mask-image: var(--arrow-svg);
  -webkit-mask-repeat: no-repeat;
  -webkit-mask-size: contain;
  -webkit-mask-position: center;
}

/* changing background of element will change SVG color*/
.arrow:hover {
  background: red;
}
```

We can change background color for `.arrow` to any without the need of adding new SVG files.

As you can see - there are 2 sets of mask rules: simple and webkit-prefixed. More info on this you can find here - <a href="https://developer.mozilla.org/en-US/docs/Glossary/Vendor_Prefix" target="_blank">Vendor Prefix</a>

### Working CSS example

<iframe src="https://stackblitz.com/edit/web-platform-rtswwh?embed=1&&file=index.html" style="width: 100%;height: 500px;"></iframe>

## SCSS mixin for SVG mask

As colorizing SVGs is so common task - those who use SCSS in projects may want to utilize an mixin for reusing set of mask rules in one place and pass a SVG url as parameter.

This mixin assumes that you have configured  <a href="https://www.npmjs.com/package/autoprefixer" target="_blank">autoprefixer</a> in your project.

Mask mixin:

```scss
// _svg.scss fils
@mixin mask($imgUrl) {
  mask-image: $imgUrl;
  mask-repeat: no-repeat;
  mask-size: contain;
  mask-position: center;
}
```

Usage:
```scss
@use "./svg";

.arrow {
  // other rules here

  @include svg.mask(url('https://github.com/rodion-arr/rodion-arr/assets/5843270/0423a92c-1fe1-4dc5-a02e-cccdec646b00'));
}
```
