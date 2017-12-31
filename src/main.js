#!/usr/bin/env node

const program = require('commander');
const cryptoPrices = require("./cryptoPrices");

program
  .description('Get crypto prices to any currency defined.')
  .option('-c, --currency <currency>', 'Currency to be fetched.')
  .option('-l, --limit <limit>', 'How many coins to be returned.')
  .parse(process.argv);

cryptoPrices(program.currency, program.limit);