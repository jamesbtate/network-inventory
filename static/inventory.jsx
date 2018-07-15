// import React from 'react'
// import ReactDOM from 'react-dom'


class TextInput extends React.Component {
    render() {
        return ( [
            <label class="left" for={ this.props.name }>{ this.props.display }:</label>,
            <input class="right ui-corner-all ui-widget ui-widget-content" size={ this.props.size } type="text" name={ this.props.name } />,
        ] )
    }
}

class NameInput extends React.Component {
    render() {
        return (
            <TextInput name="name" display="Name" size="24" />
        )
    }
}

class DescriptionInput extends React.Component {
    render() {
        return (
            <TextInput name="description" display="Description" size="48" />
        )
    }
}

class YesNoInput extends React.Component {
    render() {
        return ( [
            <label class="left">{ this.props.display }:</label>,
            <span class="right">
                <label for={this.props.name + "_yes"} onClick={()=>this.props.onClick("yes")}>Yes</label>
                <input type="radio" name={this.props.name} id={this.props.name + "_yes"} value="yes" />
                <label for={this.props.name + "_no"} onClick={()=>this.props.onClick("no")}>No</label>
                <input type="radio" name={this.props.name} id={this.props.name + "_no"} value="no" />
            </span>
        ] )
    }
}

class DeleteButton extends React.Component {
    render() {
        return ( [
            <span class="right ui-button ui-corner-all ui-widget delete_button" onClick={this.props.onClick}>X</span>
        ] )
    }
}

class EditForm extends React.Component {
    render() {
        return (
            <form action={this.props.action} method="post">
                {this.props.children}
                <hr class="left" width="100%"/>
                <input class="left ui-button ui-corner-all ui-widget" type="submit" />
            </form>
        )
    }
    componentDidMount(prevProps, prevState) {
        $( "input[type='radio']" ).checkboxradio({
            icon: false
        });
    }
}

class ClassForm extends React.Component {
    render() {
        return (
            <EditForm action="/class/edit">
                <NameInput />
                <YesNoInput name="allow_other_attributes" display="Allow Other Attributes"/>

                <h3 class="left">Attributes</h3>
                <div id="added_attributes">
                </div>
                <input class="left ui-button ui-corner-all ui-widget" type="button" value="Add Attribute" onClick={addAttribute}/>
            </EditForm>
        )
    }
}

class AttributeForm extends React.Component {
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
        this.deleteValue = this.deleteValue.bind(this)
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
    setFreeForm(value) {
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
    render() {
        return (
            <EditForm action="/attribute/edit">
                <NameInput />
                <TextInput name="display" display="Display Name" size="24" />
                <DescriptionInput />
                <YesNoInput name="multi_value" display="Allow Multiple Values"/>
                <YesNoInput name="free_form" display="Free Form" onClick={this.setFreeForm} />
                { this.state.free_form ? ("") : ([
                    <div class="left">
                        <span class="h3">Values</span>
                        <input class="ui-button ui-corner-all ui-widget" type="button" value="Add Value" onClick={this.addValue}/>
                    </div>,
                    this.state.values.map((d) => ([
                        <input key={d.index} type="text" class="left ui-corner-all ui-widget" value={d.value} onChange={(e)=>this.attributeValueChange(e, d.index)} />,
                        <DeleteButton onClick={()=>this.deleteValue(d.index)} />
                    ]))
                ])}
            </EditForm>
        )
    }
}

function addAttribute() {
    // this doesn't work. need to use state to keep array of added
    //  attributes in ClassForm
    ReactDOM.render(<p>test</p>, document.getElementById('added_attributes'));
}

function classEditPage() {
    ReactDOM.render(<ClassForm />, document.getElementById('root'));
}

function attributeEditPage() {
    ReactDOM.render(<AttributeForm />, document.getElementById('root'));
}
