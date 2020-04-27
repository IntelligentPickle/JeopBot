const { Command } = require('klasa');
const http = require('http');
const Discord = require('discord.js');

module.exports = class extends Command {

    constructor(...args) {
        /**
         * Any default options can be omitted completely.
         * if all options are default, you can omit the constructor completely
         */
        super(...args, {
            enabled: true,
            runIn: ['text', 'dm', 'group'],
            requiredPermissions: [],
            requiredSettings: [],
            aliases: [],
            autoAliases: true,
            bucket: 1,
            cooldown: 0,
            promptLimit: 0,
            promptTime: 30000,
            deletable: false,
            guarded: false,
            nsfw: false,
            permissionLevel: 0,
            description: '',
            extendedHelp: 'No extended help available.',
            usage: '',
            usageDelim: undefined,
            quotedStringSupport: false,
            subcommands: false
        });
    }

    async run(message, [...params]) {

        // This is where you place the code you want to run for your command

        http.get('http://www.jservice.io/api/random', (resp) => {
        let data = '';

        // A chunk of data has been recieved.
        resp.on('data', (chunk) => {
            data += chunk;
        });

        // The whole response has been received.
        resp.on('end', async () => {
            
            let clueParsed = JSON.parse(data)
                const clueEmbed = new Discord.MessageEmbed()
                    .setColor('#5A43E9')
                    .setTitle(clueParsed[0].category.title)
                    .setAuthor('JeopBot', 'https://i.imgur.com/wSTFkRM.png', 'https://discord.js.org')
                    .setDescription(`For ${clueParsed[0].value}:\n**${clueParsed[0].question}**`)
                    .setTimestamp()
                    .setFooter(`Questions provided by jService.`, 'https://jservice.io');
        
                message.channel.send(clueEmbed);

                console.log(clueParsed[0].answer)
                const clueAnswer = await message.prompt("Please answer:")
            
            console.log(`user said: ${clueAnswer}, answer is ${clueParsed[0].answer}`)
            if (clueAnswer == clueParsed[0].answer) {

                const correctEmbed = new Discord.MessageEmbed()
                    .setColor('GREEN')
                    .setDescription(`Congratulations! ${clueAnswer} was correct!\nPoints: ${clueParsed[0].value}`)
                message.channel.send(correctEmbed);


            } else {

                const incorrectEmbed = new Discord.MessageEmbed()
                .setColor('RED')
                .setDescription(`I'm sorry, the correct answer was ${clueParsed[0].answer}.`)
                message.channel.send(incorrectEmbed);
                
            }

        });

        })
        
    }

    async init() {
        /*
         * You can optionally define this method which will be run when the bot starts
         * (after login, so discord data is available via this.client)
         */
    }

};
