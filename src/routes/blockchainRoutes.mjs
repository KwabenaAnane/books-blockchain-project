import {
  addBlock,
  getAllBlocks,
  getBlock,
} from '../controllers/blockchain-controller.mjs';
import { Router } from 'express';

const router = Router();

router.post('/mine', addBlock);
router.get('/blocks', getAllBlocks);
router.get('/block/:id', getBlock);

export default router;
