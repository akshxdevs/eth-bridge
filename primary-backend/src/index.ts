import { JsonRpcProvider, id } from "ethers";

const provider = new JsonRpcProvider("https://eth-mainnet.g.alchemy.com/v2/XuX-8XHJpqtnwEzERiWHs");
const CONTRACT_ADDRESS = "0xd6371e6dcc51a3502e8B7C745018ce3DF88FB999"; // USDT
const EVENT_TOPIC = id("Transfer(address,address,uint256)");

async function pollBlock(blockNumber: number) {
    try {
        const logs = await provider.getLogs({
            address: CONTRACT_ADDRESS,
            fromBlock: blockNumber,
            toBlock: blockNumber,
            topics: [EVENT_TOPIC],
        });

        if (logs.length > 0) {
            console.log(`📦 Block ${blockNumber}:`, logs);
        }
    } catch (err) {
        console.error(`❌ Failed to get logs for block ${blockNumber}`, err);
    }
}

async function main() {
    let currentBlock = await provider.getBlockNumber();

    while (true) {
        const latestBlock = await provider.getBlockNumber();

        while (currentBlock <= latestBlock) {
            await pollBlock(currentBlock);
            currentBlock++;
        }

        await new Promise((r) => setTimeout(r, 6000)); // Wait ~1 block
    }
}

main().catch(console.error);
