// @flow
import React, { Component } from "react";
import { connect } from "react-redux";

import Modal from "../Modal";
import Member from "../Member";

type Props = {
    members: Object
};

type State = {
    show: boolean,
    edit: boolean,
    id: ?number
};

class ListScreen extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            show: false,
            edit: false,
            id: undefined
        };
    }
    state: State;

    handleShow = (show: boolean) => {
        this.setState({
            show
        });
    }

    handleEdit = (edit: boolean, id: number) => {
        this.setState({
            edit,
            id
        });
    }

    renderMembers = () => {
        const { members } = this.props;
        if (members) {
            const keys = Object.keys(members);
            if (keys.length) {
                return keys.map(id => <Member data={members[id]} id={id} key={id} onEditChange={this.handleEdit} />);
            }
        }
        return null;
    }

    render() {
        const { members } = this.props;
        let len;
        let modalElement;
        let memberId = 1;

        if (members) {
            len = Object.keys(members).length;
            memberId = len > 0 ? parseInt(Object.keys(members)[len - 1], 10) + 1 : 1;
        }

        modalElement = (<Modal
            id={memberId}
            show={this.state.show}
            onShowChange={this.handleShow}
        />);

        if (this.state.edit) {
            modalElement = (<Modal
                id={this.state.id}
                edit={this.state.edit}
                onEditChange={this.handleEdit}
                data={members[this.state.id]}
            />);
        }

        return (
            <div>
                {
                    this.state.show || this.state.edit
                        ? modalElement
                        : (
                            <div className="screen">
                                <div style={{ display: "flex", flexDirection: "row-reverse" }}>
                                    <a onClick={() => { this.setState({ show: !this.state.show }); }} className="icon">
                                        <i className="fa fa-plus" aria-hidden="true" />
                                    </a>
                                </div>
                                <div>
                                    <h2>Team Members</h2>
                                    {
                                        members && len
                                            ? (
                                                len === 1
                                                    ? (
                                                        <h5>You have only 1 team member.</h5>
                                                    )
                                                    : (<h5>You have {len} team members.</h5>)
                                            )
                                            : (<h5>You don't have any team members.</h5>)
                                    }
                                </div>
                                <hr />
                                {this.renderMembers()}
                            </div>
                        )
                }
            </div>
        );
    }
}

const mapStateToProps = state => ({
    members: state
});

export default connect(mapStateToProps, null)(ListScreen);
