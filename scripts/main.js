const address = "0xcd670236033d0bfb668cd83828c214c3af04b897";
const abi = [
  {
    "constant": false,
    "inputs": [
      {
        "name": "newMessage",
        "type": "string"
      }
    ],
    "name": "setMessage",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "message",
    "outputs": [
      {
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }
];
    
let account;
let contract;
const h2Elm = document.getElementById('message');

const web3 = new Web3(Web3.givenProvider);
console.log('--------web3', web3.currentProvider);
web3.eth.getAccounts((error, results) => {
  account = results[0];
  contract = new web3.eth.Contract(abi, address);
  console.log("contract -----", contract)
  contract.methods.message().call({from: account}, (error, result) => {
    console.log("message ------", error, result);
    h2Elm.innerText = result;
  });
  
  
  const formElm = document.getElementById('sendMessageForm');
  formElm.addEventListener('submit', (e) => {
    e.preventDefault();
    const inputElm = document.getElementById('inputMessage');
    const val = inputElm.value;
    contract.methods.setMessage(val).send({
      from: account,
      gas: 3000000,
      gasPrice: 2100000000
    }, (error, result) => {
    console.log("setMessage ------", error, result);
      error
      alert('');
    });
  });
});