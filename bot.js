/* eslint-disable operator-assignment */
/* eslint-disable guard-for-in */
require('dotenv').config();

const Discord = require('discord.js');
const db = require('./database.js');

const client = new Discord.Client();

const jeffPerDay = {};
const jeffPerPerson = {};
const jeffPerChannel = {};
let react = true;

const getDate = () => {
  let today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
  const yyyy = today.getFullYear();
  today = `${mm}/${dd}/${yyyy}`;

  return today;
};

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity('to !jeff-help', { type: 'LISTENING' });
});

client.on('message', (msg) => {
  let message = msg.content.toLowerCase();
  message = message.replace(/\s+/g, '');
  console.log(message);
  // if first character is ! do a command
  if (message.substring(0, 1) === '!') {
    let args = message.substring(1).split(' ');
    const cmd = args[0];
    let date;
    let total;
    let days;
    let average;
    let overall;
    let currentDay;
    let currentPerson;
    let currentChannel;

    args = args.splice(1);
    switch (cmd) {
      case 'jeff-today':
        // check date
        date = getDate();
        if (jeffPerDay[date] === undefined) {
          jeffPerDay[date] = 0;
        }
        msg.reply(`'Jeff' has been said **${jeffPerDay[date]}** times today. J E F F!`);
        break;
      case 'jeff-total':
        total = 0;
        for (const day in jeffPerDay) {
          total += jeffPerDay[day];
        }
        msg.reply(`'Jeff' has been said a grand total of **${total}** times since April 16, 2020. LONG LIVE JEFF!`);
        break;
      case 'jeff-average':
        total = 0;
        days = 0;
        for (const day in jeffPerDay) {
          total += jeffPerDay[day];
          days += 1;
        }
        average = total / days;
        msg.reply(`'Jeff' has been said, on average, **${average}** times a day. j e f f`);
        break;
      case 'jeff-overall':
        overall = '';
        for (const day in jeffPerDay) {
          currentDay = `${day}: ${jeffPerDay[day]} \n`;
          overall += currentDay;
        }
        msg.reply(`Spread of 'Jeff' mentions per day: \`\`\`${overall}\`\`\``);
        break;
      case 'jeff-fans':
        overall = '';
        for (const person in jeffPerPerson) {
          currentPerson = `${person}: ${jeffPerPerson[person]} \n`;
          overall += currentPerson;
        }
        msg.reply(`Spread of 'Jeff' mentions per person: \`\`\`${overall}\`\`\``);
        break;
      case 'jeff-channels':
        overall = '';
        for (const channel in jeffPerChannel) {
          currentChannel = `${channel}: ${jeffPerChannel[channel]} \n`;
          overall += currentChannel;
        }
        msg.reply(`Spread of 'Jeff' mentions per person: \`\`\`${overall}\`\`\``);
        break;
      case 'jeff-react':
        react = !react;
        if (react) {
          msg.reply('Jeff reacts have been turned on');
        } else {
          msg.reply('Jeff reacts have been turn off');
        }
        break;
      case 'jeff-help':
        msg.reply('Available commands: ```!jeff-today: Number of times Jeff was said today \n!jeff-total: Total number of times Jeff was said since April 16, 2020 \n!jeff-average: Daily average of Jeff mentions \n!jeff-overall: Daily spread of Jeff mentions \n!jeff-react: Toggles auto-react```');
        break;
      default:
        console.log('This command is not known');
    }
  } else if (message.includes('jeff')) {
    if (!msg.author.bot) {
      const date = getDate();
      const count = message.match(/jeff/g).length;
      // add jeff count to date hash
      if (jeffPerDay[date] === undefined) {
        jeffPerDay[date] = 0;
      }
      jeffPerDay[date] = jeffPerDay[date] + count;

      const person = msg.author.username;
      // add jeff count to person hash
      if (jeffPerPerson[person] === undefined) {
        jeffPerPerson[person] = 0;
      }
      jeffPerPerson[person] = jeffPerPerson[person] + count;

      const channel = msg.channel.name;
      // add jeff count to channel hash
      if (jeffPerChannel[channel] === undefined) {
        jeffPerChannel[channel] = 0;
      }
      jeffPerChannel[channel] = jeffPerChannel[channel] + count;
    }

    // react with jeff
    if (react) {
      msg.react('698370979839344710');
    }
  }
});

client.login(process.env.DISCORD_TOKEN);
