import AppError from '../models/appError.mjs'
import Blockchain from '../models/blockchain/Blockchain.mjs'

const blockchain = new Blockchain()

export const addBlock = (req, res, next) => {
  try {
    const { data } = req.body
    if (!data) throw new AppError('Bad Request, information not found', 400)

    blockchain.addBlock({ data })
    res.status(201).json({ success: true, statusCode: 201, block: blockchain.getLatestBlock() });
  } catch (err) {
    next(err)
  }
}
export const getAllBlocks = (req, res, next) => {
  try {
     res.status(200).json({ success: true, statusCode: 200, block: blockchain.getAllBlocks() });
  } catch (err) {
    next(err)
  }
}
export const getBlock = (req, res, next) => {
  try {
    const block = blockchain.getBlockById(req.params.id)
    if (!block) throw new AppError('Block not found', 404)

    res.status(200).json({ success: true, statusCode: 200, block: block });
  } catch (err) {
    next(err)
  }
}
