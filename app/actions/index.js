// @flow
import {
    ADD_MEMBER,
    DELETE_MEMBER
} from "../constants";

export type Action = {
    type: string,
    id?: number,
    value?: Object
};

export function addMember(id: number, value: Object): Action {
    return {
        type: ADD_MEMBER,
        id,
        value
    };
}

export function deleteMember(id: number): Action {
    return {
        type: DELETE_MEMBER,
        id
    };
}
