const fs = require('fs')
const http = require('http')
const path = require('path')

fs.writeFile(
    path.join(__dirname, 'files', 'text.txt'),
    'this is the writefile opprasions',
    (err) => {
        if (err) throw err;
        console.log('process compleate writefile')
        fs.appendFile(path.join(__dirname, 'files', 'text.txt'),
            '\n\n this is the appendfile oprasion',
            (err) => {
                if (err) throw err;
                console.log('processs compleate appendfile')
            })
        fs.rename(path.join(__dirname, 'files', 'text.txt'),
            path.join(__dirname, 'files', 'text2.txt'),
            (err) => {
                if (err) throw err;
                console.log('processs compleate rename')
            })
            fs.readFile(path.join(__dirname,'files','text2.txt'),
            'utf8',
            (err, data)=>{
                if(err) throw err;
                console.log(data)
            })
    }
)  

process.on('uncaughtException',(err)=>{
    console.log(`this is the error: ${err}`)
    process.exit(1)
})
