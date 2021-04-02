import * as CryptoJS from "crypto-js";

class Block {
    public index: number;
    public hash: string;
    public previousHash: string;
    public data: string;
    public timestamp: number;
0
    static calculateBlockHash = (
        index:number,
        previousHash:string,
        timestamp:number,
        data:string
    ): string =>
        CryptoJS.SHA256(index + previousHash + timestamp + data).toString();

    constructor(
        index: number,
        hash: string,
        previousHash: string,
        data: string,
        timestamp: number
    ){
        this.index = index;
        this.hash = hash;
        this.previousHash = previousHash;
        this.data = data;
        this.timestamp = timestamp;
    }
}

const genesisBlock: Block = new Block(0, "20211212112121", "", "Hello", 123456);

let blockchain: Block[] = [genesisBlock];

const getBlockchain = (): Block[] => blockchain;

// 블록체인안에서 가장 최근의 블록
const getLatestBlock = (): Block => blockchain[blockchain.length -1];

const getNewTimeStamp = (): number => Math.round(new Date().getTime() / 1000);

console.log(blockchain);

export {};