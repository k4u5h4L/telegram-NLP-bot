/*

* This file is for scraping memes by yourself, without the need of an external API.

* The external API is preferred as it is faster, whereas this scraping script will take 20-40 seconds
  to finish doing its job.

* Use this when the external API does not respond, or is taking too long, or is only sending error codes.

*/

const fetch = require("node-fetch");

/*

const axios = require("axios");
const cheerio = require("cheerio");

const mainUrl = `https://reddit.com/r/dankmemes`;

axios
    .get(mainUrl)
    .then((response) => {
        dealWithData(response.data);
    })
    .catch((err) => {
        console.log(err);
    });

const dealWithData = (html) => {
    const $ = cheerio.load(html);

    const urlMeme = $("._2_tDEnGMLxpM6uOa2kaDB3.ImageBox-image.media-element._1XWObl-3b9tPy64oaG6fax");

    const indexValue = randNo(10);

    console.log(`Source is:\n${urlMeme[indexValue].attribs.src}`);
};

const randNo = (limit) => {
    const thatNo = Math.floor(Math.random() * limit);

    return thatNo;
};

*/

module.exports.getMeme = async function (subreddit) {
    let response = await fetch(`https://meme-api.herokuapp.com/gimme/${subreddit}`);
    let data = await response.json();
    return data;
};
