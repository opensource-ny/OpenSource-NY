### Team.me server side

This directory contains all of the server side files that run the database and routing for the application.

##### Requirements
- Node.js
- Run `npm install` or `npm i` in order to install on required modules

File system:
```
server
+-- config
|   +-- jwtConfig.js    // contains jwt configuration
|   +-- passport.js     // contains passport strategies and set up
+-- models              // contains all databse table creation "protocols"
|   +-- db.js           // You would put your credentials in this file
|   +-- hackathon_participants.js  // Creates a participants table for the hackathons (See models README)
|   +-- hackathons.js   // Creates a hackathons table (See models README)
|   +-- index.js        // Bundles all of table creation and combines them into a single module
|   +-- users.js        // Creates a users table (See models README)
+-- node_modules        // Node modules library (We don't talk about it here...)
+-- routes              // Contains all routes related files
|   +-- hackathons.js   // Routing for hackathon data manipulation
|   +-- index.js        // Routing main
|   +-- users.js        // Routing for all user data manipulation
+-- server.js           // Main server file
+-- package.json        // Module package file for npm
```

To start the server without react front-end, `cd` into this directory and execute `node server.js`.
