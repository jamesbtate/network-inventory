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
