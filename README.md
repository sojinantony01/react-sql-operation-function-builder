# react-sql-operation-function-builder

Package helps you to generate simple and complex sql friendly operations and functions. Can use multiple sql table columns. also helps to build non sql syntax

## Getting Started

Make sure you have include bootstrap in your project.

You can simply generate syntax like
```
  POWER((Round(col-1) * 22) + ((col-2*10)/100), 2) 
```
```
npm -i react-sql-operation-function-builder

```
## demo
[Live demo](https://sojinantony01.github.io/react-sql-operation-function-builder/)



```
import React, { Component } from 'react'
import Operation from 'react-sql-operation-function-builder'
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



```
## props

| Prop | Description | Default
| --- | --- | -- |
| value | syntax  | '' |
| onChange |  |  |
| type | type of functions ('STRING','NUMBER', 'DATE','ALL') | ALL |
| attributes | table columns, can have multiple tables and columns, source name and source alias name is mandatory | [] |

 
## Acknowledgments
*antd
*viswanath lekshmanan
