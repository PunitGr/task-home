// @flow
import {
    ADD_MEMBER,
    DELETE_MEMBER,
    EDIT_MEMBER
} from "../constants";

export type Action = {
    id?: number,
    value?: Object
};

export function addMember(id: number, value: Object): Action {
    return {
        ADD_MEMBER,
        id,
        value
    }
}

export function deleteMember(id: number): Action {
    return {
        DELETE_MEMBER,
        id
    }
}

export function editMember(id: number, value: Object): Action {
    return {
        EDIT_MEMBER,
        id,
        value
    }
}
