export const isAdmin = (user) => {
    const rolesKey = `${process.env.REACT_APP_JWT_CUSTOM_NAMESPACE}/roles`;
    const roles = user && user[rolesKey];
    return roles.includes('admin');
}

export const isWorker = (user) => {
    const rolesKey = `${process.env.REACT_APP_JWT_CUSTOM_NAMESPACE}/roles`;
    const roles = user && user[rolesKey];
    return roles.includes('worker');
}