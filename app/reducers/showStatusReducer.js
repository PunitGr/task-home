// @flow
import {
    SHOW_STATUS
} from "../constants";

import type { Action } from "../actions";

type State = ?boolean;

export default function showStatusReducer(state: State = false, action: Action): State {
    if (action.type === SHOW_STATUS) {
        return action.show;
    }
    return state;
}
