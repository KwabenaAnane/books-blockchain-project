
**Students Blockchain API**

A Node.js application that mimics a blockchain, built as a REST API with endpoints to create, list, and retrieve blocks.

**Features**

* Create blocks in a blockchain
* List all blocks in a blockchain
* Retrieve a single block from the blockchain
* Blockchain data is written to a JSON file for persistence
* Error handling and logging using middleware and a physical error log
* Test-driven development (TDD) for block creation
* Proof of Work (PoW) validation for each block
* Centralized error handling and logging
* Complex object data type for blocks

**Requirements**

* Node.js 14 or higher
* Postman for testing

**Endpoints**

* `POST /mine`: Create a new block in the blockchain
* `GET /blocks`: List all blocks in the blockchain
* `GET /blocks/:id`: Retrieve a single block from the blockchain by ID

**Error Handling**

* Centralized error handling using middleware and a physical error log
* Error logging using `logger.mjs` from Lection 6

**Testing**

* Test-driven development (TDD) for block creation using Jest
* Proof of Work (PoW) validation for each block

**Blockchain**

* Blockchain data is written to a JSON file for persistence
* Each block is verified and validated using Proof of Work (PoW)

**Complex Object Data Type**

* Blocks contain complex object data, either an instance of a class or an anonymous object

**Usage**

1. Clone the repository and install dependencies using `npm install`
2. Start the server using `npm run dev`
3. Use Postman to test the endpoints


