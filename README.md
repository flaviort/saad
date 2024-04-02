This is a [Senz Design](https://senzdsn.com/) boilerplate made specifically for [Next.js](https://nextjs.org/) projects.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Front-end dependencies

We´re currently using the following dependencies:

- [node-sass](https://www.npmjs.com/package/node-sass) to compile SCSS;
- [sass](https://www.npmjs.com/package/sass) to compile SCSS;
- [@svgr/webpack](https://www.npmjs.com/package/@svgr/webpack) to easilly import SVGs;
- [@sendgrid/mail](https://www.npmjs.com/package/@sendgrid/mail) for sengrid;
- [react-hook-form](https://react-hook-form.com/) to forms and validations;
- [clsx](https://www.npmjs.com/package/clsx) for easier use of multiple classNames and conditional render;
- [@studio-freight/react-lenis](https://www.npmjs.com/package/@studio-freight/react-lenis) to create a smooth scroll experience;
- [swiper](https://www.npmjs.com/package/swiper) for sliders;
- [gsap](https://www.npmjs.com/package/gsap) for animations;
- [@gsap/react](https://www.npmjs.com/package/@gsap/react) for easier use of gsap;
- [recoil](https://www.npmjs.com/package/recoil) for easy state management accross components;
- [sharp](https://www.npmjs.com/package/sharp) to improve images and reduce their size with <NextImage />.

## Folder structure

We´re currently using the following folder structure:

```bash
assets
    |-- css
    |-- fonts
    |-- scss
    |   |-- atoms
    |   |-- main.scss
    |-- svg
    |   |-- social
    |   |-- ux
    |-- components
    |   |-- accordion
    |   |-- button
    |   |-- faq
    |   |-- footer
    |   |-- form
    |   |-- fs-menu
    |   |-- page-transition
    |   |-- top-menu
    |   |-- utils
    |       |-- modal
    |-- pages
    |-- public
    |   |-- img
    |-- utils
```

| Folder      | What it contains          |
| :---------- | :--------- |
| `css` | contains bootstrap and normalize |
| `fonts` | holds all the fonts used in the project |
| `scss` | contains all the global scss used in the project, such as text-sizes, variables, container sizes and other global configurations |
| `svg` | contains all the svgs used in the project |
| `components` | have some of the most used components on website |
| `components > utils` | have some nice and reusable effects such as magnetic-buttons, truncate-text, animated-counter and others |
| `pages` | is the main pages directory (each page should have their own folder except for the homepage) |
| `public` | used for images, videos and others |
| `utils` | holds atoms.js (for recoil) and routes.js (for globall routes) |

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.