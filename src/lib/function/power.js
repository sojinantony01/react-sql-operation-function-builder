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
     
      return (<div className="padding-bottom-10 w_100">
         
            <div className="width-160-px display_inline_block    ">
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
            <div className="width-35-px display_inline_block margin-top-5  padding-left-8">
              <I18 tkey='^' />
            </div>
            <div className="width-60-px  display_inline_block">
       
              <InputNumber className="" min={0} maxLength={8} type='Number' onChange={(e) => this.props.onChange(e, 'params2')}/>
            </div>
            </div>
           
           
     
      )
    }
}


export default Round;