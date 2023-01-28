"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const https_1 = __importDefault(require("https"));
const url_1 = __importDefault(require("url"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const setRoomId = (roomId, url) => {
    return url.replace(/\{ROOM_ID\}/g, roomId.toString() ?? '196');
};
const getLiveInfo = async (room) => {
    return new Promise((resolve, reject) => {
        if (!process.env.REACT_APP_BILIBILI_LIVE_INFO_API) {
            return { message: '请先设置 Bilibili API URL' };
        }
        const url = setRoomId(room, process.env.REACT_APP_BILIBILI_LIVE_INFO_API);
        let req = https_1.default.get(url, (res) => {
            console.log(`正在请求： ${url}`);
            let data = '';
            res.on('error', (err) => {
                console.error(err);
                reject(err);
            });
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                try {
                    let result;
                    if (res.statusCode === 200) {
                        result = JSON.parse(data);
                    }
                    resolve(result);
                }
                catch (err) {
                    console.error(err);
                    reject(err);
                }
            });
        });
        req.on('timeout', () => {
            console.error('请求超时');
            reject();
        });
        req.on('uncaughtException', (err) => {
            console.error('错误：' + err);
            reject(err);
        });
        req.on('error', (err) => {
            console.error('错误：' + err.message);
            reject(err);
        });
        req.end();
    });
};
const server = http_1.default.createServer(async (req, res) => {
    if (req.headers.origin) {
        res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    }
    else {
        res.setHeader('Access-Control-Allow-Origin', '*');
    }
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT');
    if (req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        let query;
        if (req.url) {
            query = url_1.default.parse(req.url, true).query ?? undefined;
        }
        let result = await getLiveInfo(query?.room ?? '196');
        res.write(JSON.stringify(result));
        res.end();
    }
    else if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }
    else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: '错误' }));
    }
});
(() => {
    server.listen(parseInt(process.env.REACT_APP_BACKEND_PORT ?? '3001'), () => {
        console.log(`后端服务器已启动！ (HTTP 端口: ${process.env.REACT_APP_BACKEND_PORT ?? '3001'})`);
    });
})();
