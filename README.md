# Project : asgmt3_meeting_room_booking_api

## Live link:

https://meeting-room-booking-sepia.vercel.app/

## Github link:

https://github.com/aburaihan8715/asgmt3_meeting_room_booking_api

## Overview video link:

https://drive.google.com/file/d/1NHTDAZI51rnZPEL9EVzcvhm1U-x1Huhz/view?usp=sharing

## Admin

- email: web@programming-hero.com
- password: ph-password

## User

- email: simple@gmail.com
- password: ph-password

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

## API Endpoints

## Auth:

- /api/auth/login(POST) -public

## User:

- /api/user/register(POST) -public

## Room:

- /api/rooms(POST) -private for admin
- /api/rooms(GET) -public
- /api/rooms/:id(GET) -public
- /api/rooms/:id(PUT) -private for admin
- /api/rooms/:id(DELETE) -private for admin

## Slot:

- /api/slots(POST) -private for admin
- /api/slots/availability(GET) -public
  OR
- /api/slots/availability?date=2024-06-15&room=60d9c4e4f3b4(GET)

## Booking:

- /api/bookings (POST) -private for logged in users
- /api/bookings (GET) -public
- /api/my-bookings(GET) -private for logged in users
- /api/bookings/:id (PUT) -private for admin
- /api/bookings/:id (DELETE) -private for admin

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
"devDependencies": {
    "@eslint/js": "^9.4.0",
    "@types/cookie-parser": "^1.4.7",
    "@types/cors": "^2.8.17",
    "@types/express": "^4.17.21",
    "@types/node": "^20.14.2",
    "@typescript-eslint/eslint-plugin": "^7.13.0",
    "@typescript-eslint/parser": "^7.13.0",
    "eslint": "^9.4.0",
    "eslint-config-prettier": "^9.1.0",
    "globals": "^15.4.0",
    "prettier": "^3.3.2",
    "ts-node-dev": "^2.0.0",
    "typescript": "^5.4.5",
    "typescript-eslint": "^7.13.0"
  }
