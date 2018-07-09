[![Deploy to now](https://deploy.now.sh/static/button.svg)](https://deploy.now.sh/?repo=https://github.com/pauldariye/kanbanize&env=TOKEN&env=ENDPOINT=https://api.github.com/graphql&env=WEBHOOK_SECRET&env=OWNER&env=RESPOSITORY&env=PORT=3000)
# Kanbanize

This is a simple issues triager for github project boards. Github projects are
great but have limited functionality, and chief among them is moving project
cards automatically. This is easily solved with properly creating a taxonomy for
your issue labels.

## How it works

You can deploy your own version of the application or 


Install it and run:
```bash
git clone git@github.com:pauldariye/kanbanize.git
cp .env.example .env # TODO: Add all env variables here
cd kanbanize
yarn dev
```

Deploy it to the cloud with [now](https://zeit.co/now) ([download](https://zeit.co/download))
```bash
now
```

