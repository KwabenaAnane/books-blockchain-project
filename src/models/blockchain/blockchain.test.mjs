import Blockchain from './Blockchain.mjs';
import Block from './Block.mjs';
import { it, describe, expect, beforeEach, afterEach } from 'vitest';
import fs from 'fs';

const TEST_CHAIN_PATH = './src/data/blockchain.test.json';

describe('BlockchainAPI', () => {
  let blockchain;

  beforeEach(() => {
    blockchain = new Blockchain();
    blockchain.blockchainPath = TEST_CHAIN_PATH;
    blockchain.chain = [Block.genesis()];
    blockchain.saveBlockchain();
  });

  afterEach(() => {
    if (fs.existsSync(TEST_CHAIN_PATH)) fs.unlinkSync(TEST_CHAIN_PATH);
  });

  it('should create a new blockchain', () => {
    expect(blockchain).toBeInstanceOf(Blockchain);
  });

  it('should add a new block to the chain', () => {
    const data = { name: 'Bob', course: 'Smart Contracts', grade: 'B' };

    blockchain.addBlock({ data });
    expect(blockchain.chain).toHaveLength(2);
    expect(blockchain.chain.at(-1).data).toEqual(expect.objectContaining(data));
  });

  it('should get the latest block from the chain', () => {
    expect(blockchain.getLatestBlock()).toEqual(blockchain.chain.at(-1));
  });

  it('should find a block by its ID', () => {
    const data = { name: 'Charlie', course: 'Blockchain Development', grade: 'A+' };
    blockchain.addBlock({ data });

    const addedBlock = blockchain.getLatestBlock();
    const found = blockchain.getBlockById(addedBlock.id);

    expect(found).toBeDefined();
    expect(found.id).toBe(addedBlock.id);
    expect(found.data).toEqual(expect.objectContaining(data));
  });

  it('should save the blockchain data to a JSON file', () => {
    const data = { name: 'Zoher Ali', course: 'Blockchain Development', grade: 'A-' };
    blockchain.addBlock({ data });

    const fileContent = fs.readFileSync(TEST_CHAIN_PATH, 'utf-8');
    const parsed = JSON.parse(fileContent);

    expect(parsed).toHaveLength(2);
    expect(parsed[1].data).toEqual(expect.objectContaining(data));
  });
});
