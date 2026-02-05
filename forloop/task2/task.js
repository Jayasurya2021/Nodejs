// Write a Node.js program to create a simple HTTP server.
const http = require("http");
const fs = require("fs/promises");

const server = http.createServer((req, res) => {

    // Write a program to read a file asynchronously using Node.js.
    const readText = async () => {
        try {
            const data =  await fs.readFile("./text.txt", "utf8")
            console.log(data)

        } catch (error) {
            console.log(error)
        }
    }
    readText()
    // Write a program to write data into a file using Node.js.
    const writeData = async () => {
        try {
        await fs.writeFile("./text1.txt", "this is writing the using node.js")
        console.log("data was writed")
        } catch (error) {
            console.log(error)
        }
    }
    writeData()

    // Write a program to append data to an existing file.
     const appendData = async () => {
        try {
        await fs.appendFile("./text1.txt", " appending dataas this is writing the using append file")
        console.log("data was add to the file")
        } catch (error) {
            console.log(error)
        }
    }
    appendData()

    // Write a Node.js program to delete a file.
    const delectData = async () => {
        try {
        await fs.unlink("./text2.txt")
        console.log("data was delected")
        } catch (error) {
            console.log(error)
        }   
    }
    delectData()

    // Write a program to rename a file using Node.js.
     const RenameData = async () => {
        try {
        await fs.rename("./text1.txt","test.txt")
        console.log("rename the file name")
        } catch (error) {
            console.log(error)
        }   
    }
    RenameData()

})

server.listen(5000, () => {
    console.log("server is running")
})