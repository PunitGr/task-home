// @flow
import React, { Component } from "react";
import { connect } from "react-redux";

import { addMember, deleteMember } from "../../actions";

type Props = {
    addMember: Function,
    deleteMember: Function,
    onShowChange: Function,
    onEditChange: Function,
    id: ?number,
    show: ?boolean,
    edit: ?boolean,
    data: ?Object
};

type State = {
    firstName: string,
    lastName: string,
    role: string,
    phoneNumber: string,
    email: string
};

class Modal extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        const { data } = props;
        this.state = {
            firstName: data && data.firstName ? data.firstName : "",
            lastName: data && data.lastName ? data.lastName : "",
            role: data && data.role ? data.role : "regular",
            phoneNumber: data && data.phoneNumber ? data.phoneNumber : "",
            email: data && data.email ? data.email : ""
        };
    }
    state: State;

    handleChange = (e: Event) => {
        if (e.target instanceof HTMLInputElement) {
            const { name, value } = e.target;
            this.setState({
                [name]: value
            });
        }
    }

    toggleRadio = (role: string) => {
        this.setState({
            role
        });
    }

    handleClose = () => {
        if (this.props.edit) {
            this.props.onEditChange(false);
        } else {
            this.props.onShowChange(false);
        }
    }

    handleSave = () => {
        const {
            firstName, lastName, role, phoneNumber, email
        } = this.state;

        if (firstName !== "" && email !== "" && phoneNumber !== "") {
            this.props.addMember(this.props.id, {
                firstName,
                lastName,
                role,
                phoneNumber,
                email
            });
        }

        if (this.props.show) {
            this.props.onShowChange(false);
        } else {
            this.props.onEditChange(false);
        }
    }

    handleDelete = () => {
        this.props.onEditChange(false);
        this.props.deleteMember(this.props.id);
    }

    render() {
        if (this.props.show || this.props.edit) {
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
                        onChange={this.handleChange}
                        placeholder="First Name"
                        value={this.state.firstName}
                    />
                    <input
                        className="input-element"
                        type="text"
                        name="lastName"
                        onChange={this.handleChange}
                        placeholder="Last Name"
                        value={this.state.lastName}
                    />
                    <input
                        className="input-element"
                        type="email"
                        name="email"
                        onChange={this.handleChange}
                        placeholder="Email"
                        value={this.state.email}
                    />
                    <input
                        className="input-element"
                        type="text"
                        name="phoneNumber"
                        onChange={this.handleChange}
                        placeholder="Phone Number"
                        value={this.state.phoneNumber}
                    />
                    <hr />
                    <h4>Role</h4>
                    <div className="screen__radio">
                        <div onClick={() => this.toggleRadio("regular")}>
                            <label htmlFor="regular-radio" className={this.state.role === "regular" ? "label-highlight" : ""}>
                                Regular - Can't delete members
                            </label>
                            <input
                                className="input-element"
                                type="radio"
                                value="regular"
                                name="role"
                                checked={this.state.role === "regular"}
                            />
                        </div>
                        <hr />
                        <div onClick={() => this.toggleRadio("admin")}>
                            <label htmlFor="admin-radio" className={this.state.role === "admin" ? "label-highlight" : ""}>
                                Admin - Can delete members
                            </label>
                            <input
                                className="input-element"
                                type="radio"
                                value="admin"
                                name="role"
                                checked={this.state.role === "admin"}
                            />
                        </div>
                        <hr />
                    </div>
                    <div className="screen__btn-wrapper">
                        <button className="solid-btn" onClick={this.handleSave}>
                            Save
                        </button>
                        {
                            this.props.edit
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


const mapDispatchToProps = dispatch => ({
    addMember: (id, value) => dispatch(addMember(id, value)),
    deleteMember: id => dispatch(deleteMember(id))
});

export default connect(null, mapDispatchToProps)(Modal);
