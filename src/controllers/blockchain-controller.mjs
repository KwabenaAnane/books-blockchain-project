import AppError from '../models/appError.mjs'
import  blockchain  from '../models/blockchain/blockchain-instance.mjs'

export const addBlock = (req, res, next) => {
  try {
    const { data } = req.body
    if (!data) throw new AppError('Missing data', 400)

    blockchain.addBlock({ data })
    res.status(201).json(blockchain.getLatestBlock())
  } catch (err) {
    next(err)
  }
}
export const getAllBlocks = (req, res, next) => {
  try {
    res.json(blockchain.getAllBlocks())
  } catch (err) {
    next(err)
  }
}
export const getBlock = (req, res, next) => {
  try {
    const block = blockchain.getBlockByIndex(req.params.index)
    if (!block) throw new AppError('Block not found', 404)
    res.json(block)
  } catch (err) {
    next(err)
  }
}
