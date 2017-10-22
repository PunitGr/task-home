// @flow
import {
    ADD_MEMBER,
    DELETE_MEMBER,
    SHOW_STATUS,
    EDIT_MEMBER
} from "../constants";

export type Action = {
    type: string,
    id?: number,
    value?: Object,
    show?: boolean,
    editId?: number
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

export function showStatus(show: boolean): Action {
    return {
        type: SHOW_STATUS,
        show
    };
}

export function editMember(editId: number): Action {
    return {
        type: EDIT_MEMBER,
        editId
    };
}
