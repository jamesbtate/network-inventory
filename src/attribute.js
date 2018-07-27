import React from "react";
import {ListHeader} from "./misc";

export class Attribute extends React.Component {
    render() {
        return (
            <div>
                <ListHeader title="Attributes" addRoute="/attribute/edit" />
            </div>
        );
    }
}
