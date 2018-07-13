// import React from 'react'
// import ReactDOM from 'react-dom'


class TextInput extends React.Component {
    render() {
        return ( [
            <label class="left" for={ this.props.name }>{ this.props.display }:</label>,
            <input class="right" size={ this.props.size } type="text" name={ this.props.name } />,
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
                <label for={this.props.name + "_yes"}>Yes</label>
                <input type="radio" name={this.props.name} id={this.props.name + "_yes"} value="yes" />
                <label for={this.props.name + "_no"}>No</label>
                <input type="radio" name={this.props.name} id={this.props.name + "_no"} value="no" />
            </span>
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
            values: []
        }
        this.addValue = this.addValue.bind(this)
    }
    addValue() {
        this.setState({
            values: [...this.state.values, ""]
        })
    }
    render() {
        return (
            <EditForm action="/attribute/edit">
                <NameInput />
                <TextInput name="display" display="Display Name" size="24" />
                <DescriptionInput />
                <YesNoInput name="multi_value" display="Allow Multiple Values"/>
                <YesNoInput name="free_form" display="Free Form"/>
                <h3 class="left">Values</h3>
                <div class="left" id="added_values">
                {this.state.values.map((value, i) => (
                    <input key={i} type="text" />
                ))}
                </div>
                <input class="left ui-button ui-corner-all ui-widget" type="button" value="Add Value" onClick={this.addValue}/>
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
