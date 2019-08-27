import React, { Component } from 'react'
import I18,{i18Get} from '../i18';
import utils from '../utils/utils';
import { Select, Input } from 'antd';

class Round extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }


    render() {
     
      return ( <div>
          <div className="w_100 display_inline_block">
            <div className="width-115-px display_inline_block margin-top-5 ">
            <I18 tkey='Absolute value of ' />
            </div>
            <div className="width-160-px padding-right-left-2-per display_inline_block">
            <Select 
                id="type"
                value={this.state.params1}
                className="w_100"
                defaultActiveFirstOption={false}
                onChange={(e) => {this.setState({params1:e}); this.props.onChange(e, 'params1')}}
                placeholder={i18Get('Select Variable', utils.getLanguage())}
                notFoundContent={i18Get('Not Found', utils.getLanguage())} >
                {this.props.attributes}
            </Select>&nbsp;
            </div>

      </div>
      </div>
      )
    }
}



export default Round;