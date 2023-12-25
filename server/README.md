### Set up server

- Run `npm install`
- Setup the needed env variables inside of .env file (you can find the needed env variables in .env.template)
- Manually create a Postgres database, using the DB environment variables
- Run `npm run db:up` to execute all pending migrations
- Run `npm start` to start the server

### Migration
- Run `npm create-migration <migration-name>` to create a new migration file

### Seed

- Run a single seed file - `npm run seed:one <filename-inside-seeds-folder>`. E.g. `npm run seed:one example-seed.js`
- Run all seeds - `npm run seed`