import dotenv from 'dotenv'
import DiscordJS,{Client, GatewayIntentBits, Partials, Events} from 'discord.js'
import {crawler} from './crawler.js' // 引入爬蟲程式碼
import {postCorn} from './postCorn.js' // 引入定時發文程式碼

dotenv.config()

const client = new Client({
    intents:[
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ],
    partials: [Partials.Channel]
})


// InteractionCreate 使用者與機器人互動時觸發(使用者輸入指令、點擊按鈕)
client.on(Events.InteractionCreate, async(interaction)=>{
    if(interaction.commandName === 'blog'){
        // 執行爬蟲程式碼
        const data = await crawler()
        // 依據資料長度隨機產生一個索引值
        const randomIndex = Math.floor(Math.random() * data.length)
        // 取得隨機文章
        const randomPost = data[randomIndex]
        // 回覆使用者
        await interaction.reply(`文章標題: ${randomPost.title}\n文章連結: ${randomPost.url}`)
    }  
})

client.once(Events.ClientReady, ()=>{
    console.log('Ready!');
    postCorn(client).start()
})

client.login(process.env.TOKEN)