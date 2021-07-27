
export function includesOrg (userOrgs, orgId) {

    for (let org of userOrgs) {
        if (org.id === +orgId) return true;
    }

    return false;
}

export function isThisUser (userState, userId) {
    // if (userState.id) console.log('Type of userState.id', typeof userState.id);
    console.log('Typeof UserId', typeof userId);
    if (userState && userState.id === +userId) {
        return true;
    }

    return false;
}