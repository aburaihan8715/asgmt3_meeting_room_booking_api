\## Project : asgmt3_meeting_room_booking_api

\### Live link: https://docs.google.com/document/d/1zkBQp2fU2a7k1b3bydBKpagKHv5IWhZDTQQ90WxGJWU/edit?usp=sharing

\### Github link: https://docs.google.com/document/d/1zkBQp2fU2a7k1b3bydBKpagKHv5IWhZDTQQ90WxGJWU/edit?usp=sharing

\### Admin

- email: web@programming-hero.com
- password: ph-password

\### User

- email: simple@gmail.com
- password: ph-password

\### Technologies used:

1. Typescript
1. Node js
1. Express js
1. Mongodb

\### Packages used:

1. cors
1. mongoose
1. zod
1. jwt
1. eslint

\### Endpoints used:

API Endpoints

User:

/api/auth/signup(POST)

/api/auth/login(POST)

Room:

/api/rooms(POST)

/api/rooms(GET)

/api/rooms/:id(GET)

/api/rooms/:id(PUT)

/api/rooms/:id(DELETE)

Slot:

/api/slots(POST)

/api/slots/availability(GET)

OR

/api/slots/availability?date=2024-06-15&roomId=60d9c4e4f3b4(GET)

Booking:

/api/bookings (POST)

/api/bookings (GET)

/api/my-bookings(GET)

/api/bookings/:id (PUT)

/api/bookings/:id (DELETE)

\### Scripts

\```js

"dev": "ts-node-dev --respawn --transpile-only src/server.ts",

"prod": "nodemon ./dist/server.js",

"build": "tsc",

"lint": "npx eslint src --ignore-pattern .ts",

"lint:fix": "npx eslint src --fix",

"prettier": "prettier --ignore-path .gitignore --write \"./src/\*\*/\*.+(js|ts|json)\"",

"prettier:fix": "npx prettier --write src"

\```
