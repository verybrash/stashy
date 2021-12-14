# README

## Stashy

Stashy is the easiest way to invest your hard earned time into the meme economy. Kindly provided to the world by Terry Brashaw.

[**Check it out!**](https://stashy-verybrash.vercel.app/)

## Running

```terminal
npm install
npm start
```

## Technical Choices

- I chose **Next.js** because I've been wanting to learn it. It was a great choice!
- I chose **TailwindCSS** because it helps me create maintainable UIs, _fast_.
- I chose **TypeScript** because types.

## Architecture

```
Stashy
├─components
├─models
├─pages <-- contains all of the endpoints, start here!
├─public
└─styles
```

I chose to SSR most of the app. I did this for a few reasons:

- Commonly used endpoints like `/trending` can be cached server-side for all clients.
- SSR provides viewport positioning when navigating forwards/backwards in history. This is a manual task for SPAs.
- Next.js prefetches static pages for faster navigation.
- Fewer round-trips, faster page loads.
