
const fs = require('fs');
const http = require('http');
const url   = require('url');


////////////////////////////////////////
//FILES

// const filePath = './starter/txt/input.txt'
// const textIn = fs.readFileSync(filePath,'utf-8');
// // console.log(textIn);

// const textOut = `This is new text added to file : ${textIn}. Created on ${Date.now()}`;

// fs.writeFileSync('./starter/txt/output.txt',textOut);
// console.log('File written!');


// //Non-blocking, asynchronous way

// fs.readFile('./starter/txt/start.txt','utf-8', (err,data1) => {
// console.log(data1);
//     fs.readFile(`./starter/txt/${data1}.txt`,'utf-8',(err,data2)=>{
//         console.log(data2);
//         fs.readFile(`./starter/txt/append.txt`,'utf-8',(err,data3)=>{
//             console.log(data3);
//             fs.writeFile('./starter/txt/final.txt',`${data2}\n${data3}`, 'utf-8',err=>{
//                 console.log('Your file has been written :)');
//             })
//         });
//     });
// });

// console.log('will read file');

///////////////////////////////////////////////////

//SERVER
const server = http.createServer((req,res)=>{
    const pathName = req.url;
    if(pathName==='/' || pathName === '/overview'){
        res.end('THIS IS OVERVIEW');

    }else if(pathName==='/product'){
        res.end('This is the PRODUCT');
    }else{
        res.writeHead(404,{
            'Content-type':'text/html'
            

        });
        res.end('<h1>Page not found!</h>');
    }

});

server.listen(8000,'127.0.0.1',()=>{

    console.log('Listening to request on port 8000');

});