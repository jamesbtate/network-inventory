import React from "react";
import {ListHeader} from "./misc";

export class Device extends React.Component {
    render() {
        return (
            <div>
                <ListHeader title="Devices" addRoute="/device/edit" />
            </div>
        );
    }
}
