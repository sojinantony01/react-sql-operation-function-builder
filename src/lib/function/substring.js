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
     
      return (<div>
       
        <div className="width-60-px  display_inline_block margin-bottom-10">
            <InputNumber   min={0} maxLength={8} type='Number' onChange={(e) => this.props.onChange(e, 'params3')}/>
            </div>
            <div className="width-160-px display_inline_block margin-top-5 text_align_center margin-bottom-10 padding-right-left-2-per">
            
            <I18 tkey='characters starting at' />
            </div>
            <div className="width-60-px  display_inline_block margin-bottom-10">
            <InputNumber  min={0} maxLength={8}  type='Number' onChange={(e) => this.props.onChange(e, 'params2')}/>
            </div>
            <div className="width-35-px  display_inline_block margin-left-10 margin-top-5">
            <I18 tkey='from' />
            </div>
            <div className="width-125-px display_inline_block   ">
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
      
      )
    }
}


export default Round;