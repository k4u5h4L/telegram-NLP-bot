# NLP telegram bot

A bot which sends a gif or a meme deepending on the users message.

-   The bot sends GIFS from the [GIPHY API](https://developers.giphy.com/).

-   The memes are scrapped from [Reddit - subreddit dankmemes](https://reddit.com/r/dankmemes).

## To run:

-   Clone and cd into the repo:

```
git clone https://github.com/theParanoidScripts/telegram-NLP-bot.git && cd telegram-NLP-bot
```

-   Install the needed dependencies

```
npm install
```

-   Rename the `.env_sample` file to `.env` and fill in the needed API tokens.

-   Run the bot

```
npm run start
```

-   Now go to the bot's DM(search the username of the bot), and send `/start` to start the bot.

-   Now the bot will respond to your messages as intended.

## Features:

-   To make this bot respond to group chat, add the bot to the group.

-   Now, every command to the bot should start with `/` symbol. If you DM the bot, you need not put the `/` symbol.

## Note:

-   This bot is for educational purposes only. You may use it however you want, but I shall notbe responsible for any
    consequences.
