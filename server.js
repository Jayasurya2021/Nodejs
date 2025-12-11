// const http = require('http')

// const server = http.createServer((require, responce)=>{

// })

// server.listen(5000,()=>{
//     console.log('server is running')
// })

// const {add, substract, mullitply, devision} = require('./math')

// console.log(add(5,4))
// console.log(substract(5,4))
// console.log(mullitply(5,4))
// console.log(devision(5,4))





// const { error } = require('console');
// const fs = require('fs')
// const path = require('path');


// fs.readFile(path.join(__dirname, './text.txt'), 'utf8', (err, data) => {
//     if (err) throw err;
//     console.log(data);

// })

// fs.writeFile(path.join(__dirname, 'text2.txt'), 'updata my data', (err) => {
//     if (err) throw err;
//     console.log('compleate the task in writefile')



//     fs.appendFile(path.join(__dirname, 'text2.txt'), '\n\nyes compleate my task in backend ', (err) => {
//         if (err) throw err;
//         console.log('compleate the task appendfile')
//     })

//     fs.rename(path.join(__dirname, 'text2.txt'), path.join(__dirname, 'text3.txt'), (err) => {
//         if (err) throw err;
//         console.log('compleate task in rename')
//     })
// })

// process.on('uncaughtException', err => {
//     console.log(`this is error${err}`)
//     process.exit(1)
// })



// const fsPromises = require('fs').promises
// const path = require('path')

// const fileOps = async()=>{
//     try{

//         const datas = await fsPromises.readFile(path.join(__dirname,'text2.txt'),'utf8')
//         console.log(datas)
//         await fsPromises.writeFile(
//             path.join(__dirname,'text3.txt'),
//             'this is process of read and write process')

//         await fsPromises.appendFile(
//             path.join(__dirname,'text3.txt'),
//             '\n\nthis is process of append process compleate')

//         await fsPromises.rename(
//             path.join(__dirname,'text3.txt'),
//             path.join(__dirname,'text4.txt'))

//         // const deletepath = path.join(__dirname,'Promises.txt')
//         // try{
//         //     deletepath.unlink('del')
//         // }catch{

//         // }

//     }catch(err){
//         console.error(err)
//     }
// }

// fileOps();





const http = require('http');
// const fsPromises = require('fs').promises;

const server = http.createServer((req,res)=>{

})

const PORT = 5000

server.listen(PORT,()=>{
    console.log('server is running')
})



