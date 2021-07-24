export const MANAGE_USER = 'MANAGE_USER';
export const ADD_TO_OWNED_NGO = 'ADD_TO_OWNED_NGO';

export function manageUser (user) {
    return {
        type: MANAGE_USER,
        payload: user
    };
}

export function addToOwnedNGO (ngoId) {
    return {
        type: ADD_TO_OWNED_NGO,
        payload: ngoId
    };
}
