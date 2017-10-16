// @flow
import React from "react";

type Props = {
    onEditChange: Function,
    data: Object,
    id: number
};

export default (props: Props) => {
    const { data } = props;
    return (
        <div onClick={() => { props.onEditChange(true, props.id); }} role="button">
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
