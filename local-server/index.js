 const http = require('http');

const server = http.createServer((req,res)=>{
    if(req.url === "/above"){
          console.log("data is passing to the front end")
        let data = {name:"surya"}
        
        res.end(JSON.stringify(data));
      
    }else{
        res.end(`this is a home page`)
    }
    
})

const PORT = 5000

server.listen(PORT, ()=>{
    console.log('server is running')
})
