[![Deploy to now](https://deploy.now.sh/static/button.svg)](https://deploy.now.sh/?repo=https://github.com/pauldariye/kanbanize&env=TOKEN&env=WEBHOOK_SECRET&env=OWNER&env=RESPOSITORY)
[![Remix on Glitch](https://cdn.glitch.com/2703baf2-b643-4da7-ab91-7ee2a2d00b5b%2Fremix-button.svg)](https://glitch.com/edit/#!/remix/https://glitch.com/edit/#!/remix/kanbanize)
# Kanbanize

This is a simple issues triager for github project boards. Github projects are
great but have limited functionality, and chief among them is moving project
cards automatically. This is easily solved with properly creating a taxonomy for
your issue labels. 

[Read more about it in this blog post](https://medium.com/the-andela-way/https-medium-com-the-andela-way-how-to-build-a-power-up-for-your-github-project-board-for-project-344d5b380a68).

## Usage

Install it and run:
```bash
git clone git@github.com:pauldariye/kanbanize.git
cp .env.example .env # TODO: Add all env variables here
cd kanbanize && yarn
yarn dev
```

Visit [https://localhost:3000](https://localhost:3000) or `https://[NGROK_SUBDOMAIN].ngrok.io`

Deploy it to the cloud with [now](https://zeit.co/now) ([download](https://zeit.co/download))
```bash
now
```

## Acknowlegement
- [aws-node-github-webhook-listener](https://github.com/serverless/examples/tree/master/aws-node-github-webhook-listener)

## License
MIT
