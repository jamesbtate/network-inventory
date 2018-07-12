// import React from 'react'
// import ReactDOM from 'react-dom'

class Form1 extends React.Component {
  render() {
    return (
      <form action="/class/edit" method="post">
        <label class="left" for="name">Name:</label>
        <input class="right" size="24" type="text" name="name" />
        <br />
        <label class="left">Allow Other Attributes:</label>
        <span class="right">
          <label for="allow_other_attributes_yes">Yes</label>
          <input type="radio" name="allow_other_attributes" id="allow_other_attributes_yes" value="yes" />
          <label for="allow_other_attributes_no">No</label>
          <input type="radio" name="allow_other_attributes" id="allow_other_attributes_no" value="no" />
        </span>

        <h3 class="left">Attributes</h3>

        <input class="left ui-button ui-corner-all ui-widget" type="button" value="Add Attribute" />

        <br />
        <br />
        <hr width="100%"/>
        <input class="left ui-button ui-corner-all ui-widget" type="submit" />
      </form>
    )
  }
}

ReactDOM.render(<Form1 />, document.getElementById('root'));