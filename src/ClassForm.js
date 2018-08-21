import React from 'react'
import ReactDOM from 'react-dom'

import {EditForm} from './EditForm';
import {TextInput} from './inputs';
import {NameInput} from './inputs';
import {DescriptionInput} from './inputs';
import {YesNoInput} from './inputs';
import {DeleteButton} from './inputs';
import {ListHeader} from "./misc";

export class ClassForm extends React.Component {
    render() {
        return (
            <EditForm action="/class/edit">
                <NameInput />
                <YesNoInput name="allow_other_attributes" display="Allow Other Attributes"/>

                <h3 className="left">Attributes</h3>
                <div id="added_attributes">
                </div>
                <input className="left ui-button ui-corner-all ui-widget" type="button" value="Add Attribute" onClick={this.addAttribute}/>
            </EditForm>
        )
    }
}
