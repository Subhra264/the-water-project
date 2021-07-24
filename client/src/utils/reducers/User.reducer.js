import { ADD_TO_OWNED_NGO, MANAGE_USER } from '../actions/User.action';

export const INITIAL_USER_STATE = null;

export default function UserReducer (state, action) {
    switch (action.type) {
        case MANAGE_USER:
            return action.payload;
        case ADD_TO_OWNED_NGO:
            const ngos = [...state.owned_orgs];
            ngos.push(action.payload);
            return {
                ...state,
                owned_orgs: ngos
            };
        default:
            return null;
    }
}