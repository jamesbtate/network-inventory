import React from "react";
import {Link} from "react-router-dom";
import {ListHeader} from "./misc";

export class Attribute extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            items: []
        }
    }
    componentDidMount() {
        // pull data from server and render in table
        var jqxhr = $.ajax({
            type: "GET",
            url: '/attribute',
            dataType: 'json'
        })
        .done((data) => {
            this.setState({
                items: data
            });
            console.log("success");
            console.log(data);
        })
        .fail(function() {
            console.log("error getting attributes");
        });
    }
    render() {
        return (
            <div>
                <ListHeader title="Attributes" addRoute="/attribute/edit" />
                <div className="content">
                    <table className="data_list" id="attribute">
                        <thead><tr><th></th><th>ID</th><th>Name</th>
                            <th>Description</th></tr></thead>
                        <tbody>
                        {this.state.items.map((item) =>
                            <tr key={item.id}>
                                <td>
                                    <Link to={"/attribute/edit/" + item.id}>
                                        <img className="table_icon" src="/static/icons/edit_16.png" />
                                    </Link>
                                    <img className="table_icon" src="/static/icons/trash_16.png" />
                                </td>
                                <td>{item.id}</td>
                                <td>{item.display_name}</td>
                                <td>{item.description}</td></tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}
