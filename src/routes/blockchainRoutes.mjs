import { addBlock,  getAllBlocks, getBlock } from '../controllers/blockchain-controller.mjs' 
import { Router } from 'express' 

const routes = Router()

routes.post('/mine', addBlock)
routes.get('/blocks', getAllBlocks)
routes.get('/block/:id', getBlock)

export default routes
