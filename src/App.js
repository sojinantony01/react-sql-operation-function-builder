import React, { Component } from 'react'
import Operation from './lib'
class App extends Component {

  constructor(props) {
      super(props);
      this.state = {
       
      };
  }

  render() {
    return (<div>
      <Operation
         replace={false}
        //  type={this.getType(this.state.showOperation)}
        //  onCancel={() => {this.setState({showOperation:false})}}
         value={this.state.value}
         attributes={this.getAttributesWithAlias([], 'A', 'a')}
         onChange={(e) => this.setState({value:e})}/>
                            
    </div>)
  }
  getAttributesWithAlias(data,alias,name) {
    data.map(d => {
        d.source_alias = alias;
        d.source_name = name
    })
    return data;
  }
}

export default App;
