import fs from 'fs'
import blockchain from './blockchain-instance.mjs'


const students = JSON.parse(fs.readFileSync('../../data/students.json', 'utf-8'))


students.forEach(student => {
  blockchain.addBlock({ data: student })
})

console.log('✅ All students imported to blockchain.json')
