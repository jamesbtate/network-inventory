// import React from 'react'
// import ReactDOM from 'react-dom'


class YesNoInput extends React.Component {
    render() {
        return (
            <span class="right">
                <label for={this.props.name + "_yes"}>Yes</label>
                <input type="radio" name={this.props.name} id={this.props.name + "_yes"} value="yes" />
                <label for={this.props.name + "_no"}>No</label>
                <input type="radio" name={this.props.name} id={this.props.name + "_no"} value="no" />
            </span>
        )
    }
}


class ClassForm extends React.Component {
    render() {
        return (
            <form action="/class/edit" method="post">
                <label class="left" for="name">Name:</label>
                <input class="right" size="24" type="text" name="name" />
                <br />
                <label class="left">Allow Other Attributes:</label>
                <YesNoInput name="allow_other_attributes" />

                <h3 class="left">Attributes</h3>

                <input class="left ui-button ui-corner-all ui-widget" type="button" value="Add Attribute" />

                <br />
                <br />
                <hr width="100%"/>
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

ReactDOM.render(<ClassForm />, document.getElementById('root'));