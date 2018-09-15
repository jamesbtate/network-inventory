import React from 'react';
import {ListHeader} from "./misc";

export class TextInput extends React.Component {
    render() {
        return ( [
            <label key="1" className="left" htmlFor={ this.props.name }>{ this.props.display }:</label>,
            <input key="2" className="right ui-corner-all ui-widget ui-widget-content"
                size={ this.props.size } type="text" name={ this.props.name }
                onChange={this.props.onChange} value={this.props.value}/>,
        ] )
    }
}

export class NameInput extends React.Component {
    render() {
        return (
            <TextInput name="name" display="Name" size="24"
                onChange={this.props.onChange} value={this.props.value}/>
        )
    }
}

export class DescriptionInput extends React.Component {
    render() {
        return (
            <TextInput name="description" display="Description" size="48"
                onChange={this.props.onChange} value={this.props.value} />
        )
    }
}

export class YesNoInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.name,
            value: this.props.value,
        };
        this.onChange = this.onChange.bind(this);
        this.makeEvent = this.makeEvent.bind(this);
        console.log("name:", this.props.name, "value:", this.props.value)

    }
    onChange(value) {
        this.setState({value: value});
        var e = {};
        e.target = {};
        e.target.name = this.props.name;
        e.target.value = value;
        //var e = this.makeEvent();
        this.props.onChange(e);
    }
    makeEvent() {
        var e = {};
        e.target = {};
        e.target.name = this.state.name;
        e.target.value = this.state.value;
        return e;
    }
    render() {
        if (this.props.value !== undefined) {
            if (this.props.value === 1) {
                $("#" + this.props.name + "_yes").attr("checked","checked").change();
            } else if (this.props.value === 0) {
                $("#" + this.props.name + "_no").attr("checked","checked").change();
            }
        }
        return ( [
            <label key="5" className="left">{ this.props.display }:</label>,
            <span key="6" className="right">
                <label htmlFor={this.props.name + "_yes"} onClick={()=>this.onChange("yes")}>Yes</label>
                <input type="radio" name={this.props.name} id={this.props.name + "_yes"} value="yes" />
                <label htmlFor={this.props.name + "_no"} onClick={()=>this.onChange("no")}>No</label>
                <input type="radio" name={this.props.name} id={this.props.name + "_no"} value="no" />
            </span>
        ] )
    }
}

export class DeleteButton extends React.Component {
    render() {
        return ( [
            <span className="right ui-button ui-corner-all ui-widget delete_button" onClick={this.props.onClick}>X</span>
        ] )
    }
}
