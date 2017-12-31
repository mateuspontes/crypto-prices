const chalk = require("chalk");
const request = require("request");
const ora = require("ora");

const spinner = ora({
  text: "Retrieving Crypto prices...",
  color: "yellow"
});

function cryptoPrices(currency = null, limit = 30) {
  let url = `https://api.coinmarketcap.com/v1/ticker`;
  if (currency) {
    url += `/${currency}`;
  }
  url += `?limit=${limit}`;

  spinner.start();

  request(url, (error, response, body) => {
    let apiResponse;
    spinner.stop();

    try {
      apiResponse = JSON.parse(body);
    } catch (parseError) {
      console.log(
        chalk.red("Something went wrong in the API. Try in a few minutes.")
      );
      return parseError;
    }

    apiResponse.forEach(crypto => {
      percent_1h = crypto.percent_change_1h;
      percent_24h = crypto.percent_change_24h;
      percent_7d = crypto.percent_change_7d;

      console.log(` * ${chalk.cyan(crypto.name)} ${crypto.name.length <= 10 ? ` \t` : ``} \t \
${chalk.yellow("$ " + crypto.price_usd)} \
\t ${chalk.gray("|")} \t  1h: ${percent_1h >= 0 ? chalk.green(percent_1h + "%") : chalk.red(percent_1h + "%")} \
\t ${chalk.gray("|")} \t 24h: ${percent_24h >= 0 ? chalk.green(percent_24h + "%") : chalk.red(percent_24h + "%")} \
\t ${chalk.gray("|")} \t  7d: ${percent_7d >= 0 ? chalk.green(percent_7d + "%") : chalk.red(percent_7d + "%")} \
`);
    });
  });
}

module.exports = cryptoPrices;
