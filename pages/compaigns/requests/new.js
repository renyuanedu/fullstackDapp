import React,{Component} from 'react';
import { Form,Input,Button,Message } from 'semantic-ui-react';
import Layout from '../../../components/layout';
import Campaign from '../../../ethernum/campaign';
import web3 from '../../../ethernum/web3';
import {Router,Link} from '../../../routes';

class CompaignNew extends Component{

 state={
   description:'',
   errorMessage:'',
   value:'',
   reciptientAddress:''

 };

 static async getInitialProps(props){
   const {address} = props.query;
   return {address};
 }


 onSubmit= async()=>{
   event.preventDefault();
   const campaign = Campaign(this.props.address);
   const accounts = await web3.eth.getAccounts();
   const {description,value,reciptientAddress} = this.state;
   this.setState({loading:true});

   try{
     await campaign.methods.createRequest(description,web3.utils.toWei(value,'ether'),reciptientAddress).send({
       from:accounts[0]

     });
     Router.pushRoute(`/compaigns/${this.props.address}/requests`)
   }catch(err){
     this.setState({errorMessage:err.message});
   }
   this.setState({loading:false});
 }

  render(){


    return(
      <Layout>
      <Link route={`/compaigns/${this.props.address}/requests`}>
       <a>返回</a>
      </Link>
      <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                  <Form.Field>
                        <label>请求描述：</label>
                        <Input
                        value={this.state.description}
                        onChange={event=>this.setState({description:event.target.value})}
                        />
                  </Form.Field>
                  <Form.Field>
                        <label>请求金额：(ether)</label>
                        <Input
                        value={this.state.value}
                        onChange={event=>this.setState({value:event.target.value})}
                        />
                  </Form.Field>
                  <Form.Field>
                        <label>受益人地址：</label>
                        <Input
                        value={this.state.recipentAddress}
                        onChange={event=>this.setState({recipentAddress:event.target.value})}
                        />
                  </Form.Field>

        <Message error header="错误提示" content={this.state.errorMessage}/>
        <Button primary loading={this.state.loading}>增加请求</Button>
      </Form>
      </Layout>
    );
  }
}

export default CompaignNew;
