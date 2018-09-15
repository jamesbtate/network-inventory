import React from 'react'
import ReactDOM from 'react-dom'
import {NotificationManager} from 'react-notifications';

import {EditForm} from './EditForm';
import {TextInput} from './inputs';
import {NameInput} from './inputs';
import {DescriptionInput} from './inputs';
import {YesNoInput} from './inputs';
import {DeleteButton} from './inputs';
import {ListHeader} from "./misc";

export class AttributeForm extends React.Component {
    constructor(props, match) {
        super(props);
        this.state = {
            values: [],
            free_form: true,
            next_index: 1
        };
        this.addValue = this.addValue.bind(this);
        this.setFreeForm = this.setFreeForm.bind(this);
        this.attributeValueChange = this.attributeValueChange.bind(this);
        this.onChange = this.onChange.bind(this);
        this.deleteValue = this.deleteValue.bind(this);
        this.submit = this.submit.bind(this);
        console.log("match:", this.props.match);
        // console.log("id:", this.props.match.params.id);
        if (this.props.match.params.id !== undefined) {
            this.loadData(this.props.match.params.id);
        }
    }
    loadData (id) {
        console.log('loading data for attribute id ' + id);
        var jqxhr = $.ajax({
            type: "GET",
            url: '/attribute/' + id,
            dataType: 'json',
            context: this
        })
        .done(function(data) {
            NotificationManager.success('Retrieved Attribute.');
            console.log(data);
            this.setState({
                id: data.id,
                name: data.name,
                display_name: data.display_name,
                description: data.description,
                free_form: data.free_form,
                multi_value: data.multi_value,
                values: data.values,
                next_index: data.next_index
            });

        })
        .fail(function(jqxhr) {
            if (jqxhr.status === 404) {
                NotificationManager.error(jqxhr.responseText, 'Error retrieving attribute.');
            } else {
                NotificationManager.error(jqxhr.statusText, 'Error retrieving attribute.');
            }
        });
    }
    addValue() {
        this.setState({
            values: [{index: this.state.next_index, value:""}, ...this.state.values],
            next_index: this.state.next_index + 1
        })
    }
    deleteValue(index) {
        this.setState({
            values: this.state.values.filter((_) => _.index !== index)
        })
    }
    onChange(e) {
        // console.log(e.target.name + ": " + e.target.value);
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
    submit() {
        var data = JSON.stringify(this.state);
        var jqxhr = $.ajax({
            type: "POST",
            url: '/attribute/edit',
            data: data,
            contentType: "application/json"
        })
        .done(function() {
            //console.log("success");
            NotificationManager.success('Added Attribute.');
        })
        .fail(function(jqxhr) {
            //console.log( "error" );
            //console.log(jqxhr);
            if (jqxhr.status === 400) {
                NotificationManager.error(jqxhr.responseText, 'Error adding attribute.');
            } else {
                NotificationManager.error(jqxhr.statusText, 'Error adding attribute.');
            }
        });

        //event.preventDefault();
    }
    render() {
        return (
            <div>
                <ListHeader title="Edit Attribute" />
                <EditForm onSubmit={this.submit}>
                    <NameInput onChange={this.onChange} value={this.state.name}/>
                    <TextInput name="display_name" display="Display Name" size="24"
                        onChange={this.onChange} value={this.state.display_name}/>
                    <DescriptionInput onChange={this.onChange} value={this.state.description}/>
                    <YesNoInput name="multi_value" display="Allow Multiple Values"
                        onChange={this.onChange} value={this.state.multi_value} />
                    <YesNoInput name="free_form" display="Free Form"
                        onChange={this.onChange} value={this.state.free_form} />
                    { this.state.free_form === true ||
                        this.state.free_form === "yes" ||
                        this.state.free_form === 1 ? ("") : ([
                        <div key="left" className="left">
                            <span className="h3">Values</span>
                            <input className="ui-button ui-corner-all ui-widget" type="button" value="Add Value" onClick={this.addValue}/>
                        </div>,
                        this.state.values.map((d) => ([
                            <input key={"i" + d.index} type="text" className="left ui-corner-all ui-widget" value={d.value} onChange={(e)=>this.attributeValueChange(e, d.index)} />,
                            <DeleteButton key={"d" + d.index} onClick={()=>this.deleteValue(d.index)} />
                        ]))
                    ])}
                </EditForm>
            </div>
        )
    }
}
