import dotenv from 'dotenv'
import { REST, Routes } from 'discord.js' // 這裡新增了 REST, Routes
 
dotenv.config()

// const list = [
//     {
//       name: 'ping', // 指令名稱
//       description: 'Replies with Pong!', // 指令描述
//       options: [ // 指令選項
//         {
//           name: 'input', // 選項名稱
//           description: 'The input to echo back', // 選項描述
//           required: true, // 是否必填
//           type: 3, // 選項類型
//         },
//       ],
//     },
//   ];

const list = [
    {
        name: 'blog', // 命令名稱
        description: '取得首頁第一頁隨機文章' // 命令描述
    }
]

//實例化 REST，並設定 版本 跟 token
const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

const registerCommands = async (commands) => {
    try{
        console.log('開始註冊命令');
        
        await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: commands });

        console.log('命令已註冊');
    }catch(error){
        console.error(error);
    }
}

// 執行註冊指令
registerCommands(list)