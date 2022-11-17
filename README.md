![image](docs/images/banner.jpg)

<div align="center">
    <b>Telegram bot made with NodeJS, TypeScript and GrammY to create reminders and check the weather</b>
</div>

## Table of contents 👇

- [✨ Explanation](#-explanation)
- [🚀 Installation](#-installation)
- [🎨 Features](#-features)
- [🚩 Issues](#-issues)
- [🕸️ Vercel configuration](#-vercel-configuration)
- [💛 Contact](#-contact)

### ✨ Explanation

If you want to start to chat with the bot, simply search in Telegram for _@larguebot_ or _@joserrabot_. At the moment, the bot **only support private chats**, so you won't be able to add the bot to a group chat. To change that, go to `BotFather`, select your bot and go to _Bot Settings_ and then _Allow Groups_.

### 🚀 Installation

### 🎨 Features

- Weather forecast with [Open Weather Map](https://openweathermap.org/)
- Database of reminders with [Mongo Atlas Database](https://www.mongodb.com/atlas/database)
- Conversations with [GrammY Conversations](https://grammy.dev/plugins/conversations.html#simple-example)
- Internal [session storage](https://grammy.dev/plugins/session.html#sessions-and-storing-data-built-in)
- User authentication with custom password

### 🚩 Issues

### 🕸️ Vercel Configuration

- Set the webhook: `https://api.telegram.org/bot{bot-key}/setWebhook?url=host-url`
- Info about webhook: `https://api.telegram.org/bot{bot-key}/getWebhookInfo`
- Delete webhook: `https://api.telegram.org/bot{bot-key}/deleteWebhook`
- Set the webhook with Vercel: `curl -X POST https://api.telegram.org/bot{YOUR-BOT-TOKEN}/setWebhook -H "Content-type: application/json" -d '{"url": {"YOUR-DEPLOY-URL"}'`

### 💛 Contact

If you have some doubts or need to ask something about the project, feel free to reach me here:

- Twitter: [https://twitter.com/jgcarrillo](https://twitter.com/jgcarrillo_)
- LinkedIn: [https://es.linkedin.com/in/jgcarrilloweb](https://es.linkedin.com/in/jgcarrilloweb)
- Website: [https://jgcarrillo.com/](https://jgcarrillo.com/)
