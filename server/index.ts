
// server.js
import http, { Server as HttpServer } from 'http';
import express, { Express } from 'express';
import next from 'next';


const dev = process.env.NODE_ENV !== 'production';
const hostname = process.env.CIQ_HOSTNAME || "localhost";
const port = 3000;

// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const nextHandler = app.getRequestHandler();

app.prepare().then(async () => {

    const app: Express = express();
    const server: HttpServer = http.createServer(app);

    app.all("*", (req, res) => nextHandler(req, res));

    server.on("error", err => { console.log(err) });

    server.listen(port, () => {

        const banner = "MULTI-STREAM";

        console.log(banner);
        console.log(`[CIQ] - [DEV-MODE]: ${dev ? "enabled" : "disabled"}`);
        console.log(`[CIQ] - [PORT]: ${port}`);
    });    
    
}).catch(err => console.log(err));
