import fs from 'fs';
import Block from './Block.mjs';

export class Blockchain {
  constructor() {
    this.chain = this.loadBlockchain() || [Block.genesis()];
    this.difficulty = 1;
  }
  addBlock({ data }) {
    if (!this.chain || this.chain.length === 0) {
      this.chain = [Block.genesis()];
    }
    const addedBlock = Block.mineBlock({
      previousBlock: this.chain[this.chain.length - 1],
      data,
      difficulty: this.difficulty,
    });
    this.chain.push(addedBlock);
    this.saveBlockchain();
  }

  getAllBlocks() {
    return this.chain;
  }

  getBlockByIndex(index) {
    return this.chain.find((b) => b.index === index);
  }

  getLatestBlock() {
    if (!this.chain || this.chain.length === 0) {
      return Block.genesis();
    }
    return this.chain[this.chain.length - 1];
  }

  saveBlockchain() {
    fs.writeFileSync(
      './src/data/blockchain.json',
      JSON.stringify(this.chain, null, 2)
    );
  }

  loadBlockchain() {
    try {
      if (fs.existsSync('./src/data/blockchain.json')) {
        const data = fs.readFileSync('./src/data/blockchain.json', 'utf-8');
        const parsed = JSON.parse(data);
        return parsed.map((obj) => new Block(obj));
      }
    } catch (err) {
      console.error('Error loading blockchain:', err);
      return null;
    }
  }
}
