import fs from 'fs';
import Block from './Block.mjs';
import { v4 as uuidv4 } from 'uuid';

export default class Blockchain {
  blockchainPath = './src/data/blockchain.json';
  constructor() {
    this.chain = this.loadBlockchain() || [Block.genesis()];
    this.difficulty = 1;
  }
  addBlock({ data }) {
    const id = uuidv4();
    const addedBlock = Block.mineBlock({
      id,
      previousBlock: this.chain[this.chain.length - 1],
      data,
    });

    this.chain.push(addedBlock);
    this.saveBlockchain();
  }

  getAllBlocks() {
    return this.chain;
  }
  getBlockById(id) {
    return this.chain.find((block) => block.id === id);
  }

  getLatestBlock() {
    if (!this.chain || this.chain.length === 0) {
      return Block.genesis();
    }
    return this.chain[this.chain.length - 1];
  }

  saveBlockchain() {
    fs.writeFileSync(this.blockchainPath, JSON.stringify(this.chain, null, 2));
  }

  loadBlockchain() {
    try {
      if (fs.existsSync(this.blockchainPath)) {
        const data = fs.readFileSync(this.blockchainPath, 'utf-8');
        const parsed = JSON.parse(data);
        return parsed.map((obj) => new Block(obj));
      }
    } catch (err) {
      console.error('Error loading blockchain:', err);
      return null;
    }
  }
}
