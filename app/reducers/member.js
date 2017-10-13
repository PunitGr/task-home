// @flow
import {
    ADD_MEMBER,
    DELETE_MEMBER,
    EDIT_MEMBER
} from "../constants";
import type { Action } from "../actions";

type State = Object;

export default function member(state: State = {}, action: Action): State {
    if (action.type === ADD_MEMBER || action.type === EDIT_MEMBER) {
        return {...state, [action.id]: action.value};
    }
    else if (action.type === DELETE_MEMBER) {
        if (action.id) {
            let { [action.id.toString()]: del, newState } = state;
            return newState;
        }
        return state;
    }
    return state;
}
