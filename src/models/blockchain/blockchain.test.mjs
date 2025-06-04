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
    const data = { id: 's002', name: 'Bob', course: 'Blockchain', grade: 'B' };

    blockchain.addBlock({ data });
    expect(blockchain.chain.at(-1).data).toEqual(data);
  });

  it('should return the latest block', () => {
    const data = { id: 's002', name: 'Bob', course: 'Blockchain', grade: 'B' };
    blockchain.addBlock({ data });

    const latest = blockchain.getLatestBlock();
    expect(latest.data).toEqual(data);
  });

  it('should find a block by its ID', () => {
    const data = { id: 's003', name: 'Charlie', course: 'PoW', grade: 'A+' };
    blockchain.addBlock({ data });

    const addedBlock = blockchain.getLatestBlock();
    const found = blockchain.getBlockById(addedBlock.id);

    expect(found).toBeDefined();
    expect(found.id).toBe(addedBlock.id);
    expect(found.data).toEqual(data);
  });

  it('should save the blockchain data to a JSON file', () => {
    const data = { id: 's004', name: 'Dana', course: 'API', grade: 'A-' };
    blockchain.addBlock({ data });

    const fileContent = fs.readFileSync(TEST_CHAIN_PATH, 'utf-8');
    const parsed = JSON.parse(fileContent);

    expect(parsed).toHaveLength(2);
    expect(parsed[1].data).toEqual(data);
  });

});
