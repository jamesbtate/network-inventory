import React from 'react'
import ReactDOM from 'react-dom'

import {TextInput} from './inputs';
import {NameInput} from './inputs';
import {DescriptionInput} from './inputs';
import {YesNoInput} from './inputs';
import {DeleteButton} from './inputs';
import {ListHeader} from "./misc";

export class EditForm extends React.Component {
    render() {
        return (
            <div className="form" action={this.props.action} method="post">
                <input type="hidden" value={this.props.id} />
                {this.props.children}
                <hr className="left" width="100%"/>
                <button className="left ui-button ui-corner-all ui-widget" onClick={this.props.onSubmit}>Submit</button>
            </div>
        )
    }
    componentDidMount(prevProps, prevState) {
        $( "input[type='radio']" ).checkboxradio({
            icon: false
        });
    }
}

export class ClassForm extends React.Component {
    render() {
        return (
            <EditForm action="/class/edit">
                <NameInput />
                <YesNoInput name="allow_other_attributes" display="Allow Other Attributes"/>

                <h3 className="left">Attributes</h3>
                <div id="added_attributes">
                </div>
                <input className="left ui-button ui-corner-all ui-widget" type="button" value="Add Attribute" onClick={addAttribute}/>
            </EditForm>
        )
    }
}

export class AttributeForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            values: [],
            free_form: true,
            nextIndex: 1
        }
        this.addValue = this.addValue.bind(this)
        this.setFreeForm = this.setFreeForm.bind(this)
        this.attributeValueChange = this.attributeValueChange.bind(this)
        this.onChange = this.onChange.bind(this)
        this.deleteValue = this.deleteValue.bind(this)
        this.submitS = this.submitS.bind(this);
    }
    addValue() {
        this.setState({
            values: [{index: this.state.nextIndex, value:""}, ...this.state.values],
            nextIndex: this.state.nextIndex + 1
        })
    }
    deleteValue(index) {
        this.setState({
            values: this.state.values.filter((_) => _.index !== index)
        })
    }
    onChange(e) {
        console.log(e.target.name + ": " + e.target.value);
        this.setState({ [e.target.name]: e.target.value });
    }
    setFreeForm(e, value) {
        onChange(e);
        this.setState({
            free_form: value === "yes" ? true : false
        })
    }
    attributeValueChange(e, index) {
        // e.target.value is the new value
        // index is the index attribute of the {} in values array
        for (var i=0; i<this.state.values.length; i++) {
            if (this.state.values[i].index === index) {
                this.state.values[i].value = e.target.value;
                this.forceUpdate();
                break;
            }
        }
    }
    submitS() {
        var data = this.state;
        var jqxhr = $.post('/attribute/edit', data)
        .done(function() {
            console.log("success");
        })
        .fail(function() {
            console.log( "error" );
        });

        event.preventDefault();
    }
    render() {
        return (
            <div>
                <ListHeader title="Edit Attribute" />
                <EditForm onSubmit={this.submitS}>
                    <NameInput onChange={this.onChange} />
                    <TextInput name="display" display="Display Name" size="24" onChange={this.onChange}/>
                    <DescriptionInput onChange={this.onChange} />
                    <YesNoInput name="multi_value" display="Allow Multiple Values" onChange={this.onChange} />
                    <YesNoInput name="free_form" display="Free Form" onChange={this.onChange} />
                    { this.state.free_form === true || this.state.free_form === "yes" ? ("") : ([
                        <div className="left">
                            <span className="h3">Values</span>
                            <input className="ui-button ui-corner-all ui-widget" type="button" value="Add Value" onClick={this.addValue}/>
                        </div>,
                        this.state.values.map((d) => ([
                            <input key={d.index} type="text" className="left ui-corner-all ui-widget" value={d.value} onChange={(e)=>this.attributeValueChange(e, d.index)} />,
                            <DeleteButton onClick={()=>this.deleteValue(d.index)} />
                        ]))
                    ])}
                </EditForm>
            </div>
        )
    }
}
