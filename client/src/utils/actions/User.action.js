export const MANAGE_USER = 'MANAGE_USER';
export const ADD_TO_NGO = 'ADD_TO_NGO';

export function manageUser (user) {
    return {
        type: MANAGE_USER,
        payload: user
    };
}

export function addToNGO (ngoId) {
    return {
        type: ADD_TO_NGO,
        payload: ngoId
    };
}
