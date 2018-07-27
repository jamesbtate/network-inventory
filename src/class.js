import React from "react";
import {ListHeader} from "./misc";

export class Class extends React.Component {
    render() {
        return (
            <div>
                <ListHeader title="Classes" addRoute="/class/edit" />
            </div>
        );
    }
}
