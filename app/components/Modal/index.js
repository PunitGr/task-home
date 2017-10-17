// @flow
import React, { Component } from "react";
import { connect } from "react-redux";

import {
    addMember,
    deleteMember,
    editMember,
    showStatus
} from "../../actions";

type Props = {
    addMember: Function,
    deleteMember: Function,
    editMember: Function,
    showStatus: Function,
    show: ?boolean,
    editId: ?boolean,
    data: ?Object,
    id: ?number
};

class Modal extends Component<Props> {
    firstName: ?HTMLInputElement;
    email: ?HTMLInputElement;
    lastName: ?HTMLInputElement;
    role: ?HTMLInputElement;
    phoneNumber: ?HTMLInputElement;

    handleClose = () => {
        if (this.props.editId) {
            this.props.editMember(null);
        } else {
            this.props.showStatus(false);
        }
    }


    handleSave = () => {
        if (this.firstName && this.firstName.value !== "" &&
            this.email && this.email.value !== "" &&
            this.phoneNumber && this.phoneNumber.value !== "" &&
            this.role && this.lastName) {
            this.props.addMember(this.props.id, {
                firstName: this.firstName.value,
                lastName: this.lastName.value,
                role: this.role.value,
                phoneNumber: this.phoneNumber.value,
                email: this.email.value
            });
        }

        if (this.props.show) {
            this.props.showStatus(false);
        } else {
            this.props.editMember(null);
        }
    }

    handleDelete = () => {
        this.props.editMember(null);
        this.props.deleteMember(this.props.id);
    }

    render() {
        const { data } = this.props;
        if (data && (this.props.show || this.props.editId)) {
            return (
                <div className="screen">
                    <div style={{ display: "flex", flexDirection: "row-reverse" }}>
                        <a onClick={this.handleClose} className="icon" role="button">
                            <i className="fa fa-times" aria-hidden="true" />
                        </a>
                    </div>
                    {
                        this.props.show
                            ? (
                                <div>
                                    <h2>Add Team Member</h2>
                                    <h5>Set email, phone number and role.</h5>
                                </div>
                            )
                            : (
                                <div>
                                    <h2>Edit Team Member</h2>
                                    <h5>Edit contact info and role.</h5>
                                </div>
                            )
                    }
                    <hr />
                    <h4>Info</h4>
                    <input
                        className="input-element"
                        type="text"
                        name="firstName"
                        ref={node => this.firstName = node}
                        placeholder="First Name"
                        defaultValue={data.firstName}
                    />
                    <input
                        className="input-element"
                        type="text"
                        name="lastName"
                        ref={node => this.lastName = node}
                        placeholder="Last Name"
                        defaultValue={data.lastName}
                    />
                    <input
                        className="input-element"
                        type="email"
                        name="email"
                        ref={node => this.email = node}
                        placeholder="Email"
                        defaultValue={data.email}
                    />
                    <input
                        className="input-element"
                        type="text"
                        name="phoneNumber"
                        ref={node => this.phoneNumber = node}
                        placeholder="Phone Number"
                        defaultValue={data.phoneNumber}
                    />
                    <hr />
                    <h4>Role</h4>
                    <div className="screen__radio">
                        <div>
                            <label htmlFor="regular">
                                Regular - Can't delete members
                            </label>
                            <input
                                id="regular"
                                className="input-element"
                                type="radio"
                                value="regular"
                                name="role"
                                ref={node => this.role = node}
                                defaultChecked={data.role === "regular"}
                            />
                        </div>
                        <hr />
                        <div >
                            <label htmlFor="admin">
                                Admin - Can delete members
                            </label>
                            <input
                                id="admin"
                                className="input-element"
                                type="radio"
                                value="admin"
                                name="role"
                                ref={node => this.role = node}
                                defaultChecked={data.role === "admin"}
                            />
                        </div>
                        <hr />
                    </div>
                    <div className="screen__btn-wrapper">
                        <button className="solid-btn" onClick={this.handleSave}>
                            Save
                        </button>
                        {
                            this.props.editId
                                ? (
                                    <button className="solid-btn solid-btn--ghost" onClick={this.handleDelete}>
                                        Delete
                                    </button>
                                )
                                : null
                        }
                    </div>
                </div>
            );
        }
        return null;
    }
}

const mapStateToProps = state => ({
    show: state.show,
    editId: state.editId
});

const mapDispatchToProps = dispatch => ({
    addMember: (id, value) => dispatch(addMember(id, value)),
    deleteMember: id => dispatch(deleteMember(id)),
    showStatus: show => dispatch(showStatus(show)),
    editMember: editId => dispatch(editMember(editId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
