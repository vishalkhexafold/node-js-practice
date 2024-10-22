
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

const tempOverView = fs.readFileSync(`${__dirname}/starter/templates/template-overview.html`,'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/starter/templates/template-card.html`,'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/starter/templates/template-product.html`,'utf-8');
const data = fs.readFileSync(`${__dirname}/starter/dev-data/data.json`,'utf-8');

const dataObj = JSON.parse(data);

const replaceTemplate =(temp,product) => {
let output = temp.replace(/{%PRODUCTNAME%}/g,product.productName);
output=output.replace(/{%IMAGE%}/g,product.image);
output=output.replace(/{%PRICE%}/g,product.price);
output=output.replace(/{%FROM%}/g,product.from);
output=output.replace(/{%NUTRIENTS%}/g,product.nutrients);
output=output.replace(/{%QUANTITY%}/g,product.quantity);
output=output.replace(/{%DESCRIPTION%}/g,product.description);
output=output.replace(/{%ID%}/g,product.ID);

if(!product.organic) output = output.replace(/{%NOT_ORGANIC%}/g,'not-organic');

return output;

}
const server = http.createServer((req,res)=>{
    const pathName = req.url;
    if(pathName==='/' || pathName === '/overview'){
        res.writeHead(200,{
            'Content-type':'text/html'
        });

const cardsHtml = dataObj.map(el => replaceTemplate(tempCard,el)).join('');
console.log(cardsHtml);
const output = tempOverView.replace('{%PRODUCT_CARDS%',cardsHtml);
        res.end(output);

    }else if(pathName==='/product'){
        res.end('This is the PRODUCT');
    }
    else if(pathName==='/api'){

    res.writeHead(200,{  'Content-type':'application/json'});

    res.end(data);

}
    else{
        res.writeHead(404,{
            'Content-type':'text/html'


        });
        res.end('<h1>Page not found!</h>');
    }

});

server.listen(8000,'127.0.0.1',()=>{

    console.log('Listening to request on port 8000');

});