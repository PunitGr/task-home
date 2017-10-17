// @flow
import React from "react";
import { connect } from "react-redux";

import { editMember } from "../../actions";

type Props = {
    editMember: Function,
    data: Object,
    id: number
};

const Member = (props: Props) => {
    const { data } = props;
    return (
        <div onClick={() => { props.editMember(props.id); }}>
            <div className="member">
                <div className="round-image" />
                <div className="member__element">
                    <span>{data.firstName} {data.lastName}</span>
                    <span>{data.phoneNumber}</span>
                    <span>{data.email}</span>
                </div>
            </div>
            <hr />
        </div>
    );
};

const mapDispatchToProps = dispatch => ({
    editMember: editId => dispatch(editMember(editId))
});

export default connect(null, mapDispatchToProps)(Member);
