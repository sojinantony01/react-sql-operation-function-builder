import React, { Component } from 'react'
import I18,{i18Get} from '../i18';
import utils from '../utils/utils';
import { Select, InputNumber } from 'antd';

class Round extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }


    render() {
     
      return (
      <div>
      <div className=" w_100">
      <div className="width-50-px display_inline_block margin-top-5 padding-right-4">
            <I18 tkey='Ignore ' />
            </div>
            <div className="width-60-px  display_inline_block margin-bottom-10">
            <InputNumber className="" type='Number' min={0} onChange={(e) => this.props.onChange(e, 'params2')}/>
            </div>
            <div className="width-100-px display_inline_block margin-top-5 padding-right-left-2-per">
            <I18 tkey='characters from' />
            </div>
            
            
            
            
            <div className="width-160-px  display_inline_block">
            <Select 
                id="type"
                value={this.state.params1}
                className="w_100"
                defaultActiveFirstOption={false}
                onChange={(e) => {this.setState({params1:e}); this.props.onChange(e, 'params1')}}
                placeholder={i18Get('Select Variable', utils.getLanguage())}
                notFoundContent={i18Get('Not Found', utils.getLanguage())} >
                {this.props.attributes}
            </Select>
            </div>
            </div>
            
     
      </div>
      )
    }
}



export default Round;