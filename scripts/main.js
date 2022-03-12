const Dapps = () => {
  const web3 = new Web3(Web3.givenProvider);
  let account = "";
  let contract;
  let gasOptions = {
    gas: 3000000,
    gasPrice: 2100000000
  }
  
  const init = (abi, address, _gasOptions={}) => {
    Object.assign(gasOptions, _gasOptions);

    // コントラクト取得
    contract = new web3.eth.Contract(abi, address);
    // アカウント情報の取得
    web3.eth.requestAccounts((error, results) => {
      account = results[0];
    });
  }

  // return Promise
  const getMessage = () => {
    return contract.methods.message().call({from: account});
  }

  // return Promise
  const setMessage = (val) => {
    const _options = {...{from: account}, ...gasOptions}

    return contract.methods.setMessage(val).send(_options);
  }

  return {
    init: init,
    getMessage: getMessage,
    setMessage: setMessage
  }
}

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

const address = "0xcd670236033d0bfb668cd83828c214c3af04b897";
const formElm = document.getElementById('sendMessageForm');

const dapps = Dapps();
dapps.init(abi, address);
dapps.getMessage().then((result, error) => {
  const h2Elm = document.getElementById('message');
  h2Elm.innerText = result;
});

formElm.addEventListener('submit', (e) => {
  e.preventDefault();

  const inputElm = document.getElementById('inputMessage');
  const val = inputElm.value;
  if (!val) return console.error('empty value');
  dapps.setMessage(val).then((result, error) => {
    alert('コンストラクトの更新処理をリクエストしました');
  });
});