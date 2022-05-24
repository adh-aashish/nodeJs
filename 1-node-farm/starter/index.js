const fs = require('fs');
const http = require('http');
const url = require('url');
//this is self made module that takes a template and replaces with data
const replaceTemplate = require('./module/replaceTemplates');

//synchrounous way
// const text = fs.readFileSync('./txt/input.txt','utf-8');
// console.log(text);

// const textOut = `THIS IS WHAT WE KNOW ${text}.\n Created on ${Date.now()}`;
// fs.writeFileSync('./txt/output.txt',textOut);
// console.log('file written');

//asynchronous way

// fs.readFile('./txt/start.txt','utf-8',(err,data1)=>{
//     if (err) return console.log("unable to open");
//     fs.readFile(`./txt/${data1}.txt`,'utf-8',(err,data2)=>{
//         console.log(data2);
//         fs.readFile('./txt/append.txt','utf-8',(err,data3)=>{
//             console.log(data3);
//             fs.writeFile('./txt/final.txt',`${data2}\n${data3}`,'utf-8',err=>{
//                 console.log("Your file has been created\n");
//             })
//         });
//     });
// });
// console.log("This is to be printed first\n");



//////////////////////SERVER/////////////////////////////

//they need to be outside of event loop because we dont want to block the code every time
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`,'utf-8');
const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`,'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`,'utf-8');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`,'utf-8');
const dataObj = JSON.parse(data);

const server = http.createServer((req,res)=>{
    const {query,pathname} = url.parse(req.url,true);//url.parse le dine obj ko duita variable matra use gareko
    //log(url.parse(req.url,true));
    
    //overview
    if(pathname === '/' || pathname === '/overview')
    {
        res.writeHead(200,{
            'Content-type': 'text/html'
        });
        //replace template card ma vayeko {%foo%} with each data element
        //takes each element of array, apply function to that element, keep back in new array cardHtml
        const cardsHtml = dataObj.map(el=> replaceTemplate(tempCard,el)).join('');//join creates a single string from all element of array
        //now replace template-Overview ko product_cards with the html text above
        const output = tempOverview.replace(/{%PRODUCT_CARDS%}/g, cardsHtml);
        res.end(output);
    }

    //product
    else if (pathname === '/product')
    {
        const product = dataObj[query.id];
        const output = replaceTemplate(tempProduct,product);
        res.writeHead(200,{
            'Content-type': 'text/html'
        });
        res.end(output);
    }

    //api
    else if (pathname === '/api')
    {
        res.writeHead(200,{
            'Content-type': 'application/json'
        });
        res.end(data);
    }
    else
    {
        res.writeHead(404,{
            'content-type':'text/html',
            'my-own-header':'hello-world'
        });
        res.end('<h1>Page not found</h1>');
    }
});

server.listen(8000,'127.0.0.1',()=>{
    console.log("Server is listening\n");
});

