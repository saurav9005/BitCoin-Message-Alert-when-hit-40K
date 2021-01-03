const axios = require("axios");
const jsdom = require("jsdom");
const messagebird = require("messagebird")("YOUR API KEY");
const { JSDOM } = jsdom;

axios.get("https://coinmarketcap.com/").then((response) => {
  // Create the JSDOM Object
  const { document } = new JSDOM(response.data).window;

  //The query selector looks complex
  const btcElement = document.querySelector(
    "#__next > div > div.sc-57oli2-0.dEqHl.cmc-body-wrapper > div > div > div.tableWrapper___3utdq > table > tbody > tr:nth-child(1) > td:nth-child(4) > div > a"
  );

  const priceAsText = btcElement.textContent.trim();

  // Convert price into the number
  const priceAsNumber = parseFloat(
    priceAsText.replace(",", "").replace("$", "")
  );

  //check if it's greater than 30K
  if (priceAsNumber >= 30000) {
    console.log("BTC reached 30K. Send a text message!");
    messagebird.messages.create(
      {
        // To test the message working or not
        originator: "YOUR REGISTER NUMBER",
        recipients: ["YOUR RESGISTER NUMBER"],
        body: `Saurav, BTC is ${priceAsText} Buy Buy Buy!`,
      },
      function (err, response) {
        if (err) {
          throw err;
        }
        console.log("Text message Send " + priceAsNumber);
      }
    );
  } else {
    console.log("BTC < 30K. Doing Nothing");
  }
});
