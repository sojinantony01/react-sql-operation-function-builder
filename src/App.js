import React, { Component } from 'react'
import Operation from './lib'
class App extends Component {

  constructor(props) {
      super(props);
      this.state = {
       
      };
  }

  render() {
    return (<div className='col-md-8'>
      <Operation
         type={'ALL'}
         value={this.state.value}
         attributes={[
                {name: 'col-1', source_alias: 'tab1', source_name:'tableOne'},
                {name: 'col-2', source_alias: 'tab1', source_name:'tableOne'},
                {name: 'column-1', source_alias: 'tab2', source_name:'tableTwo'}
         ]}
         onChange={(e) => {console.log('value', e); this.setState({value:e})}}/>               
    </div>)
  }
}

export default App;
