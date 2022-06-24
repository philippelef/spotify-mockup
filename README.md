# Project Info
Listen to our playlist and save the songs you like!

*built with NextJS - React - Apollo - Typescript - Vercel*

<img width="494" alt="image" src="https://user-images.githubusercontent.com/47006008/175506193-4e8a0067-bf49-4936-9bb6-170ae4036f10.png">

<img width="1377" alt="image" src="https://user-images.githubusercontent.com/47006008/175506111-16b2fbf7-0f4f-4849-ae41-662e05279102.png">

# Installation
```bash
yarn install
```
```bash
npm install
```

# Running the server and serving the website

Run the server by using either yarn or npm.
```bash
yarn build
yarn start
```
```bash
npm run build
npm start
```

# Mobile responsiveness
Although this two pages website is imitating the spotify webplayer design and functionnalities, it packs more versatility and responsiveness, such as a full mobile adaptability.

When using the site on mobile, 'onTouchStart' event is triggered, making all the hovering behaviour disabled (no user-agent sniffing).
You just need to tap on a song info as you would on the spotify app to listen to the songs, compared to double-clicking or clicking the play button that appears when you hover the song info.

The mobile responsiveness is one of the **best features of this website** and I am proud to have done it.

# GraphQL and unavailability
The given Shotgun GraphQL API also had some issues. Wanted or not, some songs did not feature a prevew_url element, making them unavailable. Such songs have specific behaviour and are greyed out on the page. This is normal and it was done to show such unavailability.

# Edge cases and known bugs.
- The Shotgun Logo is a placeholder and has no utility. Its existence can be unnatural as no interaction can be done with it, which is a but confusing.

- When you remove a song from the liked songs playlist, it does not remove it from the queue while you are still on the liked songs page.

- If you are on a mobile device that has a window width superior to 600px, the volume slider will appear. If you use an iPad for example on horizontal view, it will be the case. You cannot with a html5 audio tag change de volume, making the volume slider useless (Web Audio API could do it I think). It is useful however for audio muting, which works regardless of the device.

# What could have been better?
Some features are still not as perfect as they could be. For example, a more extensive use of caching could be a great way to speed up the page load, especially when switching between the main playlist and the liked songs: a new GraphQL Apollo Client is created and a query is made everytime on of these two pages load, even though the information fetched should be the same everytime.

Also I think the use of UseEffect and UseState are not optimized and components reload too often in my opinion.
