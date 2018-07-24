import React from "react";
import ReactDOM from "react-dom";
import {AttributeForm} from "./inventory";
import {ClassForm} from "./inventory";

function classEditPage() {
    ReactDOM.render(<ClassForm />, document.getElementById('root'));
}

function attributeEditPage() {
    ReactDOM.render(<AttributeForm />, document.getElementById('root'));
}

attributeEditPage();
