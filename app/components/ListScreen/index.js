// @flow
import React, { Component } from "react";
import { connect } from "react-redux";

import Modal from "../Modal";
import Member from "../Member";
import { showStatus } from "../../actions";

type Props = {
    members: Object,
    editId: ?number,
    show: ?boolean,
    showStatus: Function
};

class ListScreen extends Component<Props> {
    renderMembers = () => {
        const { members } = this.props;
        if (members) {
            const keys = Object.keys(members);
            if (keys.length) {
                return keys.map(id => <Member data={members[id]} id={id} key={id} />);
            }
        }
        return null;
    }

    render() {
        const { members, editId, show } = this.props;
        let len;
        let modalElement;
        let memberId = 1;
        const data = {
            firstName: "",
            lastName: "",
            role: "regular",
            phoneNumber: "",
            email: ""
        };

        if (members) {
            len = Object.keys(members).length;
            memberId = len > 0 ? parseInt(Object.keys(members)[len - 1], 10) + 1 : 1;
        }

        modalElement = (<Modal
            id={memberId}
            show={show}
            data={data}
        />);

        if (editId) {
            modalElement = (<Modal
                id={editId}
                data={members[editId]}
            />);
        }

        return (
            <div>
                {
                    show || editId != null
                        ? modalElement
                        : (
                            <div className="screen">
                                <div style={{ display: "flex", flexDirection: "row-reverse" }}>
                                    <a onClick={() => { this.props.showStatus(!show); }} className="icon">
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
    members: state.members,
    editId: state.editId,
    show: state.show
});

const mapDispatchToProps = dispatch => ({
    showStatus: show => dispatch(showStatus(show))
});

export default connect(mapStateToProps, mapDispatchToProps)(ListScreen);
