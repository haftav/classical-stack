## Getting Started

1. Create .env file, using .env.example as a template.
2. Run `npm run db:up`. If you have other projects using the same template make sure their docker containers aren't running.
3. Run `npm run db:migrate:up` to perform initial migration. This will create an `app_user` table in your database.

Now you should be all set to develop!

## Development

Start the Remix development asset server and the Express server by running:

```sh
npm run dev
```

This starts your app in development mode, which will purge the server require cache when Remix rebuilds assets so you don't need a process manager restarting the express server.

## Deployment

First, build your app for production:

```sh
npm run build
```

Then run the app in production mode:

```sh
npm start
```

