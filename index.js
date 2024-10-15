const fs = require('fs');

const filePath = './starter/txt/input.txt'
const textIn = fs.readFileSync(filePath,'utf-8');
// console.log(textIn);

const textOut = `This is new text added to file : ${textIn}. Created on ${Date.now()}`;

fs.writeFileSync('./starter/txt/output.txt',textOut);
console.log('File written!');


//Non-blocking, asynchronous way

fs.readFile('./starter/txt/start.txt','utf-8', (err,data1) => {
console.log(data1);
    fs.readFile(`./starter/txt/${data1}.txt`,'utf-8',(err,data2)=>{
        console.log(data2);
        fs.readFile(`./starter/txt/append.txt`,'utf-8',(err,data3)=>{
            console.log(data3);
            fs.writeFile('./starter/txt/final.txt',`${data2}\n${data3}`, 'utf-8',err=>{
                console.log('Your file has been written :)');
            })
        });
    });
});

console.log('will read file');
