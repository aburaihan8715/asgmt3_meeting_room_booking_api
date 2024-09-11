# Project : asgmt3_meeting_room_booking_api

## Live link:

https://meeting-room-booking-sepia.vercel.app

## Github link:

https://github.com/aburaihan8715/asgmt3_meeting_room_booking_api

## Overview video link:

https://drive.google.com/file/d/1NHTDAZI51rnZPEL9EVzcvhm1U-x1Huhz/view?usp=sharing

## Admin

- email: admin@gmail.com
- password: test1234

## User

- email: user@gmail.com
- password: test1234

## Technologies used:

1. Typescript
2. Node js
3. Express js
4. Mongodb

## Packages used:

1. cors
2. mongoose
3. zod
4. jwt
5. eslint
6. stripe

## API Endpoints

## Auth:

- /api/auth/login(POST) -public

## User:

- /api/users/register(POST) -public
- /api/users/make-admin(PATCH) -admin

## Room:

- /api/rooms(POST) -admin
- /api/rooms(GET) -public
- /api/rooms/:id(GET) -user
- /api/rooms/:id(PUT) -admin
- /api/rooms/:id(DELETE) -admin

## Slot:

- /api/slots(POST) -admin
- /api/slots/availability(GET) -public
  OR
- /api/slots/availability?date=2024-06-15&room=60d9c4e4f3b4(GET)

## Booking:

- /api/bookings (POST) -user
- /api/bookings (GET) -admin
- /api/my-bookings(GET) -user
- /api/bookings/:id (PUT) -admin
- /api/bookings/:id (DELETE) -admin

## Scripts

```js
"dev": "ts-node-dev --respawn --transpile-only src/server.ts",
"prod": "nodemon ./dist/server.js",
"build": "tsc",
"lint": "npx eslint src --ignore-pattern .ts",
"lint:fix": "npx eslint src --fix",
"prettier": "prettier --ignore-path .gitignore --write \"./src/\*\*/\*.+(js|ts|json)\"",
"prettier:fix": "npx prettier --write src"
```

<p>======end=======</p>
