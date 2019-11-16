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

/*
${converted.d}
${converted.h}
${converted.m}
${converted.s}
${converted.ms}
*/


//add command handler ->

message.delete(); //delete the message like 
    
    if (cooldown.has(message.author.id)) { // if user on cooldown
      
      const timeLeft = cooldown.get(message.author.id) - Date.now(); 
      const converted = convertMS(timeLeft); // Changes the ms to time
      //add message here if code
        
    } else {
    
    cooldown.set(message.author.id, Date.now() + time); // <- saves the time 
    setTimeout(() => cooldown.delete(), time) // <- I don't remember what it does but it's needed
  }

