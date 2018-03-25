const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");
const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();

fs.readdir("./commands/", (err, files) =>{
  if(err) console.log(err);

  let jsfile = files.filter(f => f.split (".").pop() === "js")
  if(jsfile.lenght <= 0){
    console.log("Couldn't find commands.");
    return;
  }

  jsfile.forEach((f, i) =>{
    let props = require(`./commands/${f}`);
    console.log(`${f} loaded!`);
    bot.commands.set(props.help.name, props);
  });

});

client.on("ready", async () => {
  console.log(`${bot.user.username} is online!`);
  bot.user.setActivity("@xLonz#4523 for help", {type: "PLAYING"});
});

client.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);


  if(cmd === `${prefix}botinfo`){

    let bicon = bot.user.displayAvatarURL;
    let botEmbed = new Discord.RichEmbed()
    .setDescription("Bot Information")
    .setColor("$15f153")
    .setThumbnail(bicon)
    .addField("Bot Name:", bot.user.username);

    return message.channel.send(botEmbed);
  }

});
client.login(process.evn.BOT_TOKEN);
bot.login(botconfig.token);
