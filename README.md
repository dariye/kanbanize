[![Deploy to now](https://deploy.now.sh/static/button.svg)](https://deploy.now.sh/?repo=https://github.com/pauldariye/kanbanize&env=TOKEN&env=WEBHOOK_SECRET&env=OWNER&env=RESPOSITORY)
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors)
[![Remix on Glitch](https://cdn.glitch.com/2703baf2-b643-4da7-ab91-7ee2a2d00b5b%2Fremix-button.svg)](https://glitch.com/edit/#!/remix/kanbanize/ca1589ea-ae22-4483-a2ee-c0b4c426e43f)
# Kanbanize

This is a fairly simple and extensible kanban power-up for GitHub Projects that automates the triaging of new issues to project boards and to track issue statuses automatically

## Features

- Move a project card along the board automatically.
- Triage issues to different project boards automatically.

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

## Deploy

Deploy it to the cloud with [now](https://zeit.co/now) ([download](https://zeit.co/download))
```bash
# configure now deployment
now secrets add owner [your github repository org/user]
now secrets add repository [your github repository name]
now secrets add token [your github access token]
now secrets add webhook_secret [secret configured in the webook]
# deploy
now
```

## Acknowlegement
- [aws-node-github-webhook-listener](https://github.com/serverless/examples/tree/master/aws-node-github-webhook-listener)

## License
MIT

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
<table>
  <tr>
    <td align="center"><a href="https://www.betafabric.com/francisco/"><img src="https://avatars0.githubusercontent.com/u/208149?v=4" width="100px;" alt="Francisco Lourenço"/><br /><sub><b>Francisco Lourenço</b></sub></a><br /><a href="https://github.com/pauldariye/kanbanize/commits?author=franciscolourenco" title="Code">💻</a> <a href="https://github.com/pauldariye/kanbanize/commits?author=franciscolourenco" title="Documentation">📖</a></td>
  </tr>
</table>

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!