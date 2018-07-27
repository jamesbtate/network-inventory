import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import {AttributeForm} from "./inventory";
import {Attribute} from "./attribute";
import {ClassForm} from "./inventory";
import {Class} from "./class";
import {Device} from "./device";
import {Home} from "./home.js";

function classEditPage() {
    ReactDOM.render(<ClassForm />, document.getElementById('root'));
}

function attributeEditPage() {
    ReactDOM.render(<AttributeForm />, document.getElementById('root'));
}

//attributeEditPage();

export class Main extends React.Component {
    render() {
        return (
            <Router><div id="router-root">
                <div class="sidebar">
                    <Link to="/">Home</Link>
                    <Link to="/attribute">Attributes</Link>
                    <Link to="/class">Classes</Link>
                    <Link to="/device">Devices</Link>
                </div>
                <div class="content">
                    <Route exact path="/" component={Home} />
                    <Route exact path="/attribute" component={Attribute} />
                    <Route path="/attribute/edit" component={AttributeForm} />
                    <Route path="/class" component={Class} />
                    <Route path="/device" component={Device} />
                </div>
            </div></Router>
        );
    }
}

ReactDOM.render(<Main />, document.getElementById('root'));
