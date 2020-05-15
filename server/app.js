const express = require("express")
const axios = require('axios')
const app = express()

app.get('/',(req,res)=>{
    res.send('返回抗疫数据的api服务器')
})


app.get('/api/newsdata',async (req,res)=>{
    //解决ajax跨域问题
    //Access-Control-Allow-Origin 响应头指定了该响应的资源是否被允许与给定的origin共享。 
   /* 语法 
    Access-Control-Allow-Origin: *   对于不需具备凭证（credentials）的请求，服务器会以“*”作为通配符，从而允许所有域都具有访问资源的权限
    Access-Control-Allow-Origin: </origin>  指定一个可以访问资源的url*/  

    res.append('Access-Control-Allow-Origin','*')
    // 允许的内容
    res.append('Access-Control-Allow-content-type','*')

    // 请求头条数据
    let result = await axios.get('http://i.snssdk.com/forum/home/v1/info/?activeWidget=1&forum_id=1656784762444839')

    let data = result.data
    // console.log(data)
    res.send(data)
})

// 最新进展新闻列表
app.get('/api/news', async (req,res)=>{
    res.append('Access-Control-Allow-Origin','*')
    res.append('Access-Control-Allow-content-type','*')
    let httpUrl='http://i.snssdk.com/api/feed/forum_flow/v1/?activeWidget=1&query_id=1656810113086509&tab_id=1656810113086525&category=forum_flow_subject&is_preview=0&stream_api_version=82&aid=13&offset=0&count=20'
    let  result = await axios.get(httpUrl)

    let data = result.data
    // console.log(data)
    res.send(data)
})


app.listen(8080,()=>{
    console.log('server start')
})