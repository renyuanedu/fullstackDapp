import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x0f44953b9a70a7c48a8650808bbf250b72d495e1'
)
export default instance;
