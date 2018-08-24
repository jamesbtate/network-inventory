import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import {AttributeForm} from "./AttributeForm";
import {Attribute} from "./attribute";
import {ClassForm} from "./ClassForm";
import {Class} from "./class";
import {Device} from "./device";
import {Home} from "./home.js";

//function classEditPage() {
//    ReactDOM.render(<ClassForm />, document.getElementById('root'));
//}

//function attributeEditPage() {
//    ReactDOM.render(<AttributeForm />, document.getElementById('root'));
//}

//attributeEditPage();

export class Main extends React.Component {
    render() {
        return (
            <Router><div id="router-root">
                <div className="sidebar">
                    <Link to="/">Home</Link>
                    <Link to="/attribute">Attributes</Link>
                    <Link to="/class">Classes</Link>
                    <Link to="/device">Devices</Link>
                </div>
                <div className="page">
                    <Route exact path="/" component={Home} />
                    <Route exact path="/attribute" component={Attribute} />
                    <Route path="/attribute/edit" component={AttributeForm} />
                    <Route path="/class" component={Class} />
                    <Route path="/class/edit" component={ClassForm} />
                    <Route path="/device" component={Device} />
                </div>
            </div></Router>
        );
    }
}

ReactDOM.render(<Main />, document.getElementById('root'));
