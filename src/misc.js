import React from 'react';
import {Link} from "react-router-dom";

export class ListHeader extends React.Component {
    // Header with page title and add button
    render() {
        return (
            <div className="header list_header">
                <h1 className="title align_left">{ this.props.title }</h1>
                { this.props.addRoute &&
                    <Link to={ this.props.addRoute }>
                        <button className="ui-button ui-corner-all ui-widget add_button align_right">
                            <span>
                            <img src="/static/icons/plus_bright.png" />
                            Add</span>
                        </button>
                    </Link>
                }
                <div className="clear_both"></div>
            </div>
        );
    }
}
