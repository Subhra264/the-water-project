
export function includesOrg (userOrgs, orgId) {

    for (let org of userOrgs) {
        if (org.id === +orgId) return true;
    }

    return false;
}