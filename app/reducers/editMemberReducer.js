// @flow
import {
    EDIT_MEMBER
} from "../constants";

import type { Action } from "../actions";

type State = ?number;

export default function editMemberReducer(state: State = null, action: Action): State {
    if (action.type === EDIT_MEMBER) {
        return action.editId;
    }
    return state;
}
