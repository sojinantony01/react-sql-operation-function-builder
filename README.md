# react-sql-operation-function-builder

Package helps you to generate simple and complex sql friendly operations and functions. you can use sql table columns and variables 

## Getting Started

Make sure you have include bootstrap in your project

```
value = ''
```
```
npm react-sql-operation-function-builder

```
<!-- ## demo
[Live demo](https://sojinantony01.github.io/react-cron-generator/) -->

![alt text](https://raw.githubusercontent.com/sojinantony01/react31-31.png)

![alt text](https://raw.githubusercontent.com/sojinantony01/reac1-57.png)


```
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


```
## props

| Prop | Description | Default
| --- | --- | -- |
| value | syntax  |  |
| onChange |  |  |
 
## Acknowledgments
*antd
*viswanath lekshmanan
