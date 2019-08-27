import React, { Component } from 'react'
import I18,{i18Get} from './i18';
import utils from './utils/utils';
import {Select, Button, Input, Popover } from 'antd'
import constants from './constants/condition-functions.json';
import Round from './function/round'
import Left from './function/left';
import Right from './function/right';
import Trim from './function/trim';
import Ignore from './function/ignore';
import Substring from './function/substring';
import Absolute from './function/absolute';
import Power from './function/power';
import Concat from './function/concat';
import 'antd/dist/antd.css';
import './main.css';
const Option = Select.Option
const ops = ['+','-','*','/','(',')'];
const operations = ['+','-','*','/','^']

class Operation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value:[],
            attributes: this.props.attributes ? this.props.attributes : [],
            variables:[]
        };
    }
    componentWillMount() {
        if(this.props.value) {
            this.state.value.push(this.props.value) 
        }  
    }
    getAttributes() {
        let options = []
        this.state.attributes.map(d => {
            options.push(<Option key={d.source_alias + '.' + d.name} >{d.name}</Option>)
        })
        this.state.variables.map(d => {
            options.push(<Option key={'var.' + d.name + ' '} >{d.name}</Option>)
        })
        return options;
    }

    getOperations() {
        return ops.map(d=> {
            return <button onClick={() => this.setState({value: this.getValue(d,'op')})} className='operations_ops'>{d}</button>
        })
    }

    getFunctions() {
        switch(this.props.type) {
            case 'NUMBER' :
            case 'DECIMAL' : {
                return constants.numberFunctions.map(d => {
                    return <Option key={d.name} >{d.name}</Option>
                })
            }
            case 'STRING' : {
                return constants.stringFunctions.map(d => {
                    return <Option key={d.name} >{d.name}</Option>
                })
            }
            case 'STRING' : {
                return constants.stringFunctions.map(d => {
                    return <Option key={d.name} >{d.name}</Option>
                })
            }
            case 'DATE' :
            case 'DATETIME' : {
                return constants.dateFunctions.map(d => {
                    return <Option key={d.name} >{d.name}</Option>
                })
            }
            default: {
                return constants.allFunctions.map(d => {
                    return <Option key={d.name} >{d.name}</Option>
                })
            }
        }
        
    }
    getNumberOfArgs(name, type) {
        switch(type) {
            case 'STRING' : 
                for(let i =0; i < constants.stringFunctions.length; i++) {
                    if(constants.stringFunctions[i].name === name) {
                        return constants.stringFunctions[i].args
                    }
                }
                break;
            
            case 'NUMBER':
            case 'DECIMAL': 
                for(let i = 0; i < constants.numberFunctions.length; i++) {
                    if(constants.numberFunctions[i].name === name) {
                        return constants.numberFunctions[i].args
                    }
                }
                break;
            case 'DATE':
            case 'DATETIME': 
                for(let i = 0; i < constants.dateFunctions.length; i++) {
                    if(constants.dateFunctions[i].name === name) {
                        return constants.dateFunctions[i].args
                    }
                }
                break; 
            default:  
                for(let i = 0; i < constants.allFunctions.length; i++) {
                    if(constants.allFunctions[i].name === name) {
                        return constants.allFunctions[i].args
                    }
                }
            break;
        }
    }
    onAttributesChange(e, param) {
        this.setState({[param]: e, invalidFuncArgs:false});
    }
    getFunctionalArgsColumns() {
       switch(this.state.func) {
            case 'ROUND': {
                    return <Round attributes={this.getAttributes()} onChange={this.onAttributesChange.bind(this)} />
            }
            case 'LEFT': {
                return <Left attributes={this.getAttributes()} onChange={this.onAttributesChange.bind(this)} />
            }
            case 'RIGHT': {
                return <Right attributes={this.getAttributes()} onChange={this.onAttributesChange.bind(this)} />
            }
            case 'TRIM': {
                return <Trim attributes={this.getAttributes()} onChange={this.onAttributesChange.bind(this)} />
            }
            case 'IGNORE': {
                return <Ignore attributes={this.getAttributes()} onChange={this.onAttributesChange.bind(this)} />
            }
            case 'SUBSTRING': {
                return <Substring attributes={this.getAttributes()} onChange={this.onAttributesChange.bind(this)} />
            }
            case 'ABS': {
                return <Absolute attributes={this.getAttributes()} onChange={this.onAttributesChange.bind(this)} />
            }  
            case 'POWER': {
                return <Power attributes={this.getAttributes()} onChange={this.onAttributesChange.bind(this)} />
            }
            case 'CONCAT': {
                return <Concat attributes={this.getAttributes()} onChange={this.onAttributesChange.bind(this)} />
            }
            default : {
                return <div></div>
            }   
       } 
    }
    getFuncValue() {
        if(!this.state.func) {
            return false
        }
        let value = '';
        let count = this.getNumberOfArgs(this.state.func, this.props.type);
        value = value + this.state.func + '('
        for(let i = 0 ; i< count; i++) {
            if(this.state['params'+(i+1)]) {
                value = value + this.state['params'+(i+1)] + (i == count-1 ? '': ', ');
            } else {
                return false;
            }
        }
        value= value + ')';
        return value
    }
    addFunction() {
        let value = this.getFuncValue() 
        let prevState = this.state;
        if(value) {
            prevState.value = this.getValue(value);
            prevState.func = undefined;
            prevState.params1 = undefined;
            prevState.params2 = undefined;
            prevState.params3 = undefined;
        } else {
            prevState.invalidFuncArgs = true;
        }
        this.setState(prevState)  
    }
    validate() {
        let value = this.state.value;
        let valid = true;
        let curDateFound = false;
        let otherOperationsFound = false;
        let numReg = /^[0-9]*$/
        //Check start or end with operation
        if(operations.indexOf(value[0]) !== -1 || operations.indexOf(value[value.length - 1]) !== -1 ) {
            valid = false;
        }
        //Check openClose brackets
        let numberOfBracket = 0;
        value.map(d => {
            if(d === '(') {
                numberOfBracket++;
            }else  if( d=== ')') {
                numberOfBracket--;
            }
            if(d.search('CURDATE') !== -1) {
                curDateFound = true;
            } else if(d !== '+' && d !== '-' && d !== '(' && d !== ')' && !numReg.test(d)) {
                    otherOperationsFound = true
            }
        })
        if(curDateFound && otherOperationsFound) {
                valid = false;
                utils.showError(i18Get('Current date must be followed by "+" or "-" only',utils.getLanguage()))
                return valid;
        }
        if(numberOfBracket !== 0) {
            valid = false;
        }
        if(!valid) {
            utils.showError(i18Get('Invalid syntax', utils.getLanguage()))
        }
        return valid;
    }
    onApply() {
        if(this.validate()) {
            let value = this.getFinalStringValue(this.state.value);
            let reg;
            let new_val = value;
            while (new_val.search('var.') !== -1) {
                this.state.variables.map(d => {
                    reg = new RegExp('var.'+d.name, 'g');
                    new_val = new_val.replace(reg, d.value);
                }) 
            }
            if(new_val.search('CURDATE') !== -1 && !new_val.startsWith('(') && !new_val.endsWith(')')) {
               new_val = `(${new_val})`
            }
            this.props.onChange(new_val)
        }
        
    }
    getFinalStringValue(val) {
        let value = ''
        val.map(d => {
            value += ' ' + d;
        })
        return value
    }
    getValue(data, type) {
        if(data !== '(' && data !== ')') {
            if(type === 'op') {
                if(operations.indexOf(this.state.value[this.state.value.length-1]) !== -1) {
                    utils.showInfo('Operations cannot be used consecutively')
                    return this.state.value;
                }
            } else if(this.state.value.length && ops.indexOf(this.state.value[this.state.value.length-1]) === -1) {
                utils.showInfo('Operands must have operations in between')
                return this.state.value;
            }
        }
        
        if(data) {
            this.state.value.push(data)
        }
        return this.state.value;
    }
    render() {
        return (
                <div className=''>
                    <div className='width-50-per margin-right-4per display_inline_block'>
                        <div className='w_100 display_inline_block action_sign_container'>
                               {this.getOperations()}     
                        </div>
                        <div className='w_100 operation_variable_container border-radius-0'>  
                            <div className="container-fluid">    
                                <label className=""><I18 tkey='Variable' /></label>
                                <div className="row margin-bottom-10">
                                    <div className="col-md-8 col-sm-8">
                                        <Select 
                                            id="type"
                                            value={this.state.column}
                                            className="w_100"
                                            defaultActiveFirstOption={false}
                                            onChange={(e) => this.setState({column:e})}
                                            placeholder={i18Get('Select Variable', utils.getLanguage())}
                                            notFoundContent={i18Get('Not Found', utils.getLanguage())} >
                                            {this.getAttributes()}
                                        </Select>
                                    </div>
                                    <div className="col-md-4 col-sm-4 text_align_center">
                                        <Button className="w_100" onClick={() => this.setState({value: this.getValue(this.state.column, 'val'), column:undefined})} ><I18 tkey='Add' /></Button>
                                    </div>
                                </div> 
                                <label><I18 tkey='Fixed' /></label>
                                <div className="row">
                                    <div className="col-md-8 col-sm-8">

                                         <Input type='text' value={this.state.fixedVal} onChange={(e) => this.setState({fixedVal:e.target.value})} />
                                    </div>
                                    <div className="col-md-4 col-sm-4  text_align_center">
                                        <Button className="w_100" onClick={() => this.setState({value: this.getValue(this.state.fixedVal,'val'), fixedVal:undefined})} ><I18 tkey='Add' /></Button>      
                                    </div>
                                </div>
                            </div> 
                        </div>
                       
                        <div className='w_100  operation_variable_container'>    
                            <div className="container-fluid position_relative">   
                                {this.state.invalidFuncArgs && <span className='user_invalid fixed_label' ><I18 tkey='Invalid function or arguments' /></span>}
                                <label><I18 tkey='Function' /></label>
                                <div className="row ">
                                    <div className="col-md-8 col-sm-8 padding-bottom-10 ">
                                        <Select 
                                            id="type"
                                            value={this.state.func}
                                            className="w_100"
                                            defaultActiveFirstOption={false}
                                            onChange={(e) => this.setState({func:e, invalidFuncArgs:false})}
                                            placeholder={i18Get('Select Function', utils.getLanguage())}
                                            notFoundContent={i18Get('Not Found', utils.getLanguage())} >
                                            {this.getFunctions()}
                                        </Select>
                                    </div>
                                    <div className="col-md-4 col-sm-4 padding-bottom-21">&nbsp;</div>
                                    <div className="container-fluid">
                                        
                                        {this.state.func &&this.getFunctionalArgsColumns()}
                                       
                                    </div>
                                    <div className="col-md-offset-8 col-sm-offset-8 col-md-4 col-sm-4 padding-bottom-10 text_align_center">                                 
                                        <Button className="w_100" onClick={this.addFunction.bind(this)} ><I18 tkey='Add' /></Button>      
                                    </div>
                                  
                                </div>
                            </div>
                        </div>  
                    </div>           
                    <div className='width-46-per display_inline_block'>
                    <div className='w_100  operation_formula_container'>  
                        <div className="formula_head_container">
                            <label className='w_100' ><I18 tkey='Formula' /></label>
                        </div>
                            <label className='w_100 padding-5' >{this.getStringValue(this.state.value)}</label>
                        </div>
                        <div className="text_align_center margin-top-10">
                            <Button className="margin-right-10" onClick={this.clearVal.bind(this)}><I18 tkey='Clear' /></Button>
                            <Popover
                                content={<div><Input type='string' onChange={(e)=> this.setState({variableName: e.target.value.replace(/ /g,'')})} value={this.state.variableName}/> <div className='text_align_right margin-top-10'><Button onClick={this.addVariable.bind(this)}><I18 tkey='Ok' /></Button></div></div>}
                                title="Variable name"
                                trigger="click"
                                visible={this.state.variableNameVisible}
                                onVisibleChange={(e) => this.setState({variableNameVisible:e})}
                                >
                               <Button><I18 tkey='Add as variable' /></Button>
                            </Popover>
                        </div>
                        <Button className='apply_button' type='primary' onClick={this.onApply.bind(this)}><I18 tkey='Apply' /></Button>
                    </div>
                </div>)
    }

    getStringValue(val) {
        let value = ''
        let reg = ''
        let alias = []
        this.state.attributes.map(d => {
            if(alias.findIndex(p=> p.source_alias === d.source_alias) === -1) {
                alias.push({source_alias:d.source_alias, source_name:d.source_name})
            }
        })
       
        val.map(d => {
            alias.map(dd=> {
                reg =  new RegExp(dd.source_alias, 'g');
                d = d.replace(reg, dd.source_name);
            })

            value += d + ' ';
        })
        while (value.search('var.') !== -1) {
            this.state.variables.map(dd => {
                reg = new RegExp('var.'+dd.name, 'g');
                value = value.replace(reg, dd.value);
            }) 
        }
        return value
    }
    clearVal() {
        let prevState = this.state;
        prevState.value.pop()
        this.setState(prevState)
    }
    addVariable() {
        if(this.state.variableName) {
            if((this.state.attributes.findIndex((p) => p.name === this.state.variableName) == -1) && (this.state.variables.findIndex((p) => p.name === this.state.variableName) == -1)) {
                if(this.validate()) {
                    let prevState = this.state;
                    prevState.variableNameVisible = false;
                    prevState.variables.push({name:this.state.variableName + ' ', value: `(${this.getFinalStringValue(this.state.value)})`});
                    prevState.variableName = '';
                    prevState.value = [];
                    this.setState(prevState)
                }
               
            }
            else {
                utils.showInfo(i18Get('Variable already exists'))
            }
            
        }
       
    }
}   




export default Operation;