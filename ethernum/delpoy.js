const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
//const {interface,bytecode} = require('./compile');
const compileFactory = require('./build/CampaignFactory.json');

const provider = new HDWalletProvider(
  'wonder estate apart exist ability diesel elder screen mass space edit around' ,  //助记词
  'https://ropsten.infura.io/v3/bcf63d5a09d24c19b743541d0c86f0fd',  //https://infura.io/里的地址
);
const web3 = new Web3(provider);

const deploy = async ()=>{
  //console.log(compileFactory.interface);
  const accounts = await web3.eth.getAccounts();
  //console.log('attemp to deploy',accounts[0]);
  //const result = await new web3.eth.Contract(JSON.parse(interface)).deploy({data:'0x'+bytecode,arguments:['mark']})
//  .send({from:accounts[0],gas:'1000000'});

  const result = await new web3.eth.Contract(JSON.parse(compileFactory.interface)).deploy({data:'0x'+compileFactory.bytecode})
  .send({from:accounts[0],gas:'1000000'});

  console.log('contract deployed to',result.options.address);
}

deploy();
