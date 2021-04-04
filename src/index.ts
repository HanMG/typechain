import * as CryptoJS from "crypto-js";

class Block {
    // 구조검증
    static calculateBlockHash = (
        index: number,
        previousHash: string,
        timestamp: number,
        data: string
    ): string =>
        CryptoJS.SHA256(index + previousHash + timestamp + data).toString();

    static validateStructure = (aBlock: Block): boolean =>
        typeof aBlock.index === "number" &&
        typeof aBlock.hash === "string" &&
        typeof aBlock.previousHash === "string" &&
        typeof aBlock.timestamp === "number" &&
        typeof aBlock.data === "string";

    public index: number;
    public hash: string;
    public previousHash: string;
    public data: string;
    public timestamp: number;    

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

const createNewBlock = (data:string) : Block => {
    const previousBlock: Block = getLatestBlock();
    const newIndex: number = previousBlock.index + 1;
    const newTimestamp: number = getNewTimeStamp();
    const newHash: string = Block.calculateBlockHash(
        newIndex, 
        previousBlock.hash, 
        newTimestamp, 
        data 
    );
    const newBlock: Block = new Block(
        newIndex, 
        newHash, 
        previousBlock.hash, 
        data, 
        newTimestamp        
    );    
    addBlock(newBlock);
    return newBlock;
}

// 해쉬검증
const getHashforBlock = (aBlock: Block): string => 
    Block.calculateBlockHash(
        aBlock.index, 
        aBlock.previousHash, 
        aBlock.timestamp, 
        aBlock.data
    );


// 이전과 현재블록 체크
const isBlockValid = (candidateBlock: Block, previousBlock: Block): boolean => {        
    if(!Block.validateStructure(candidateBlock)) { 
        // 구조가 다르면 false
        console.log("structure wrong");
        return false;        
    } else if(previousBlock.index + 1 !== candidateBlock.index) {         
        // 이전블록의 인덱스 + 1 이 체크할 블록의 인덱스와 동일하지 않으면 false
        console.log("index wrong");
        return false;
    } else if(previousBlock.hash !== candidateBlock.previousHash) { 
        // 이전 블록의 해쉬가 체크할 블록의 해쉬와 같지 않다면 false
        console.log("hash wrong");
        return false;
    } else if(getHashforBlock(candidateBlock) !== candidateBlock.hash) { 
        // 해쉬를 계산했는데 다른 해쉬를 갖고있다면 false
        console.log("cal hash wrong");
        return false;
    } else {
        return true;
    }
}

const addBlock = (candidateBlock: Block) : void => {
    if(isBlockValid(candidateBlock, getLatestBlock())){
        blockchain.push(candidateBlock);
    }else {
        console.log("addblock fucked")
    }
};

createNewBlock("second block");
createNewBlock("third block");
createNewBlock("fourth block");

console.log(blockchain);

export {};