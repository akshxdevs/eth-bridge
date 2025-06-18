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
const provider = new ethers_1.JsonRpcProvider("https://eth-mainnet.g.alchemy.com/v2/nnY0qPUQLYsUvb5BKJM5bh81sI6O0PQG");
function pollBlock(blockNumber) {
    return __awaiter(this, void 0, void 0, function* () {
        const logs = yield provider.getLogs({
            address: "0xdac17f958d2ee523a2206206994597c13d831ec7",
            fromBlock: blockNumber,
            toBlock: blockNumber,
            topics: [(0, ethers_1.id)("Transfer(address,address,uint256)")],
        });
        console.log(logs);
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const currentBlock = 1;
        while (1) {
            yield pollBlock(currentBlock);
        }
    });
}
