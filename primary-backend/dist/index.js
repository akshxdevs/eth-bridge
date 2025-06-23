"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
const provider = new ethers_1.JsonRpcProvider("https://eth-mainnet.g.alchemy.com/v2/XuX-8XHJpqtnwEzERiWHs");
const CONTRACT_ADDRESS = "0xd6371e6dcc51a3502e8B7C745018ce3DF88FB999"; // USDT
const EVENT_TOPIC = (0, ethers_1.id)("Transfer(address,address,uint256)");
function pollBlock(blockNumber) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const logs = yield provider.getLogs({
                address: CONTRACT_ADDRESS,
                fromBlock: blockNumber,
                toBlock: blockNumber,
                topics: [EVENT_TOPIC],
            });
            if (logs.length > 0) {
                console.log(`📦 Block ${blockNumber}:`, logs);
            }
        }
        catch (err) {
            console.error(`❌ Failed to get logs for block ${blockNumber}`, err);
        }
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        let currentBlock = yield provider.getBlockNumber();
        while (true) {
            const latestBlock = yield provider.getBlockNumber();
            while (currentBlock <= latestBlock) {
                yield pollBlock(currentBlock);
                currentBlock++;
            }
            yield new Promise((r) => setTimeout(r, 6000)); // Wait ~1 block
        }
    });
}
main().catch(console.error);
