const { RichEmbed, Collection } = require("discord.js")
const cooldown = new Collection();
const { convertMS } = require("discordutility");
let time = 18000000;

/*
Created by koko
Rep system
Using mysql
With cooldown
*/


/*
converted.d = days
converted.h = hours
converted.m = minutes
converted.s = seconds
converted.ms = milliseconds
*/


module.exports = { 
  config: {
      name: "rep",
  },
run: (bot, message, args, connection) => {
  message.delete();
    let member = message.mentions.members.first();

    if(!member)
    
    return message.channel.send("Please mention a valid member of this server.");
    
    if(message.author.id == member.id) return message.channel.send("Please mention a person that's not you.")
    
    if (cooldown.has(message.author.id)) { // if user on cooldown
      
      const timeLeft = cooldown.get(message.author.id) - Date.now(); 
      const converted = convertMS(timeLeft); // Changes the ms to time
      const embed1 = new RichEmbed()
      .setColor('RANDOM')
  	  .setDescription(`Wait ${converted.h} hours & ${converted.m} minutes before Repping someone again. ${message.author.username}`)
      message.channel.send(embed1); 
    
    } else {
    connection.query(`SELECT * FROM account WHERE id = '${member.id}'`, function (err, rows) {

    if(err) throw err;

    const noinfo = new RichEmbed()
	  .setColor("8A2BE2")
    .setDescription(`***Error:*** We got 0 info on ${member.user.username} please wait for them write a message`)
    .setFooter(`Replying to ${message.author.username}#${message.author.discriminator}`)
    if(!rows[0]) return message.channel.send(noinfo);
      
    sql = `UPDATE account SET rep = ${rows[0].rep + 1} WHERE id = '${member.id}'`;
      
    connection.query(sql)
    const embed = new RichEmbed()
    .setColor('RANDOM')
    .setTitle(`:notebook_with_decorative_cover: Reputation`)
  	.setDescription(`${message.author.username} has given ${member.user.username} a reputation point\n${member.user.username} now has ${rows[0].rep + 1} points`)
    message.channel.send(embed)
    
    cooldown.set(message.author.id, Date.now() + time); // <- saves the time 
    setTimeout(() => cooldown.delete(), time) // <- I don't remember what it does but it's needed
    })
  }
}
}
