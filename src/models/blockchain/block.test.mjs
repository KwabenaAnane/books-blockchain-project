import { describe } from 'vitest';
import Block from './Block.mjs';
import { GENESIS_BLOCK } from './genesis.mjs';

describe('Block', () => {
  describe('genesis() function', () => {
    const genesisBlock = Block.genesis();

    // Test 1. Är genesis blocket en referens till Block klassen...
    it('should return an instance of the Block class', () => {
      expect(genesisBlock instanceof Block).toBeTruthy();
    });
    // Test 2. Kontrollera så att genesis blocket innehåller korrekt start data...
    it('should return the genesis data', () => {
      expect(genesisBlock).toEqual(GENESIS_BLOCK);
    });
  });
});
