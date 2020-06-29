process.env["NTBA_FIX_319"] = 1; // to avoid a deprecation warning

require("dotenv").config();

const token = process.env.BOT_TOKEN;
const DIALOGFLOW_TOKEN = process.env.DIALOGFLOW_TOKEN;
const DIALOGFLOW_SESSION_ID = process.env.DIALOGFLOW_SESSION_ID;

const TelegramBot = require("node-telegram-bot-api");
const apiai = require("apiai")(DIALOGFLOW_TOKEN);
const GphApiCLient = require("giphy-js-sdk-core");
const randNumber = require("./randNumber.js");
const scrap = require("./scrap.js");
const helpMessage = require("./help");

const giphy = GphApiCLient(process.env.GIPHY_KEY);

// replace the value below with the Telegram token you receive from @BotFather

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });

// Matches "/echo [whatever]"
bot.onText(/\/echo (.+)/, (msg, match) => {
    // 'msg' is the received Message from Telegram
    // 'match' is the result of executing the regexp above on the text content
    // of the message

    const chatId = msg.chat.id;
    const resp = match[1]; // the captured "whatever"

    // send back the matched "whatever" to the chat
    bot.sendMessage(chatId, resp).catch((error) => {
        console.log(error.code); // => 'ETELEGRAM'
        console.log(error.response.body); // => { ok: false, error_code: 400, description: 'Bad Request: chat not found' }
    });
});

// Listen for any kind of message. There are different kinds of
// messages.
bot.on("message", (msg) => {
    const chatId = msg.chat.id;

    // console.log(msg);

    const userQuestion = msg.text.replace(/\//, "");

    const regExGif = /(g|G)(if|IF)/g;

    const regExMeme = /(m|M)(eme|EME)/g;

    const regExhelp = /^((h|H)(elp|ELP))/;

    if (regExGif.test(userQuestion)) {
        console.log(`User ${msg.from.username} wants a gif.`);

        giphy
            .search("gifs", { q: "funny" })
            .then((res) => {
                const randNo1 = randNumber.randNo(res);

                const gifUrl = randNo1.images.fixed_height.url;

                bot.sendDocument(chatId, gifUrl).catch((error) => {
                    console.log(error.code); // => 'ETELEGRAM'
                    console.log(error.response.body); // => { ok: false, error_code: 400, description: 'Bad Request: chat not found' }
                });

                console.log("Gif sent.");
            })
            .catch((err) => {
                console.log(err);
                bot.sendMessage("Error in fetching gif. Sorry :( ").catch((error) => {
                    console.log(error.code); // => 'ETELEGRAM'
                    console.log(error.response.body); // => { ok: false, error_code: 400, description: 'Bad Request: chat not found' }
                });
            });
    } else if (regExMeme.test(userQuestion)) {
        console.log(`User ${msg.from.username} wants a meme.`);

        scrap
            .getMeme()
            .then((data) => {
                // console.log(data.url);

                bot.sendPhoto(chatId, data.url).catch((error) => {
                    console.log(error.code); // => 'ETELEGRAM'
                    console.log(error.response.body); // => { ok: false, error_code: 400, description: 'Bad Request: chat not found' }
                });

                console.log(`Meme sent.`);
            })
            .catch((err) => {
                console.log(err);
                bot.send("Error in fetching meme. Sorry :( ");
            });
    } else if (regExhelp.test(userQuestion)) {
        console.log(`User ${msg.from.username}: ${userQuestion}`);

        bot.sendMessage(chatId, helpMessage).catch((error) => {
            console.log(error.code); // => 'ETELEGRAM'
            console.log(error.response.body); // => { ok: false, error_code: 400, description: 'Bad Request: chat not found' }
        });
    } else {
        console.log(`User ${msg.from.username}: ${userQuestion}`);

        let apiaiReq = apiai.textRequest(userQuestion, {
            sessionId: DIALOGFLOW_SESSION_ID,
        });

        apiaiReq.on("response", (response) => {
            let aiText = response.result.fulfillment.speech;
            console.log(`Bot reply: ${aiText}`);
            bot.sendMessage(chatId, aiText).catch((error) => {
                console.log(error.code); // => 'ETELEGRAM'
                console.log(error.response.body); // => { ok: false, error_code: 400, description: 'Bad Request: chat not found' }
            });
        });

        apiaiReq.on("error", (error) => {
            console.log(error);
        });

        apiaiReq.end();
    }
});

console.log(`Bot is ready!`);

// async function getMeme() {
//     let response = await fetch(`https://meme-api.herokuapp.com/gimme/dankmemes`);
//     let data = await response.json();
//     return data;
// }
