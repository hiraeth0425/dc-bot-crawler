import { CronJob } from 'cron'
import { crawler } from './crawler.js'

// const job = new CronJob('0 21 * * *', () => {
//     console.log('每天晚上九點執行');
    
// })

// job.start()

// 接收client作為參數
const postCorn = (client) => {
    // 建立job
    const job = new CronJob('* * * * *', async () => {
        // 呼叫爬蟲程式碼
        const data = await crawler()
        // 隨機產生索引值
        const randomIndex = Math.floor(Math.random() * data.length)
        // 取得隨機文章
        const randomPost = data[randomIndex]
        // 取得所有的channel
        const channel = await client.channels.cache.get(process.env.CHANNEL_ID) //可以將頻道 ID 改成使用 process.env.DISCORD_CHANNEL_ID 來取得
        // 發送訊息
        await channel.send(`每日晚間九點隨機推薦 Ray 的一篇文章：\n文章標題: ${randomPost.title}\n文章連結: ${randomPost.url}`)
    })
    return job
}

export {postCorn}