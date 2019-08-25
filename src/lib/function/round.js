import React, { Component } from 'react'
import I18,{i18Get} from '../../i18';
import utils from '../../utils/utils';
import { Select, InputNumber } from 'antd';

class Round extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }


    render() {
     
      return (<div>
        <div className="w_100 display_inline_block">
        <div className="width-48-px display_inline_block margin-top-5 margin-bottom-10">
            <I18 tkey='Round' />
            </div>
            <div className="width-160-px  display_inline_block margin-bottom-10">
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
            <div className="margin-left-5 width-35-px margin-top-5 display_inline_block padding-left-8 ">
            <I18 tkey='to' />
            </div>
            <div className="width-60-px  display_inline_block margin-right-10">
            <InputNumber   min={0} maxLength={8} type='Number' onChange={(e) => this.props.onChange(e, 'params2')}/>
            </div>
            <div className="width-110-px margin-top-5 display_inline_block  ">
            <I18 tkey='decimal places' />
            </div>
            </div>
            
           
            
           
      
      </div>
      )
    }
}



export default Round;