# Todo List app in blockchain ethereum

### Prerequisites
(1) Install truffle suite
```
cd C:\Users\admin\Documents\Projects\softup\eth-todo-list
npm install --g --production windows-build-tools  (as admin)
npm install -g truffle@5.0.2
```

(2) Download Truffle Suite Ganache https://trufflesuite.com/ganache/ <br/>

(3) Add Metamask plugin in chrome and create a private network with the following details:
```
New RPC URL: HTTP://127.0.0.1:7545
Chain Id: 5777
```

##### Compile & Migrate/Deploy smart contract to the blockchain
```
npm install
truffle init
truffle compile
truffle migrate
```

##### Console
```
⚠️  Important ⚠️
If you're using an HDWalletProvider, it must be Web3 1.0 enabled or your migration will hang.


Starting migrations...
======================
> Network name:    'development'
> Network id:      5777
> Block gas limit: 6721975


1_initial_migration.js
======================

   Deploying 'Migrations'
   ----------------------
   > transaction hash:    0x3f278ec951d10461cd25edfbd3433796701ce9e926a48b984975afcc326959a1
   > Blocks: 0            Seconds: 0
   > contract address:    0xf6e1a5FF80D4addF64a61CCF6BE79a1449BCa20D
   > account:             0x38956331e4b70326EEc3D4D32018C47ecd1A541b
   > balance:             99.9899739
   > gas used:            206601
   > gas price:           20 gwei
   > value sent:          0 ETH
   > total cost:          0.00413202 ETH

   > Saving artifacts
   -------------------------------------
   > Total cost:          0.00413202 ETH


2_deploy_contracts.js
=====================

   Replacing 'TodoList'
   --------------------
   > transaction hash:    0x4e3f656a85c9cb8a298c82b790366f4ed63456bbd23dc5690b591dd591788f94
   > Blocks: 0            Seconds: 0
   > contract address:    0x86F272638ba892693FF27517738b0248a93c489a
   > account:             0x38956331e4b70326EEc3D4D32018C47ecd1A541b
   > balance:             99.98821184
   > gas used:            88103
   > gas price:           20 gwei
   > value sent:          0 ETH
   > total cost:          0.00176206 ETH

   > Saving artifacts
   -------------------------------------
   > Total cost:          0.00176206 ETH


Summary
=======
> Total deployments:   2
> Final cost:          0.00589408 ETH
```

##### Ganache in Local
Deploying smart contract to the blockchain costs ethereum (gas). That's why the balance of the crypto currency has go down with 0.01 ETH.
Truffle by default uses the first account inside this wallet to pay those fees. 
<img src="./doc/ganache.JPG" width="80%" height="auto">


##### Retrieve smart contracts
```
truffle console
todoLost = await TodoList.deployed()
truffle(development)> todoList.address
truffle(development)> taskCount = await todoList.taskCount()
truffle(development)> taskCount.toNumber()

task = await todoList.tasks(1)
task
task.content
```

####  Run web app
Copy from Ganache the private key and import it in the wallet.

<img src="./doc/import_into_private_wallet.JPG" width="80%" height="auto">

```
npm run dev
```


### Links
- [Ganache - Personal Ethereum blockchain used to run tests, execute commands in local](https://trufflesuite.com/ganache/)
- [Youtube tutorial](https://www.youtube.com/watch?v=coQ5dg8wM2o)