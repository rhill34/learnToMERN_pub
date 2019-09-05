/**
 * Creating User
 * @param {JSON} user 
 */
const create = (user) => {
    return fetch('/api/users/', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    .then((response) => {
        return response.json()
    }).catch((err) => console.log(err))
}
/**
 * Listing the users
 */
const list = () => {
    return fetch('/api/users/', {
        method: 'GET',
    }).then(response => {
        return response.json()
    }).catch((err)=>console.log(err))
}
/**
 * Read a user profile
 * @param {JSON} params 
 * @param {String} credentials 
 */
const read = (params, credentials) => {
    return fetch('/api/users/' + params.userId, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer' + credentials.t
        }
    }).then((response) => {
        return response.json()
    }).catch((err) => console.log(err))
}
/**
 * Updating Users data
 * @param {JSON} params 
 * @param {JSON} credentials 
 * @param {JSON} user 
 */
const update =(params, credentials, user) =>{
    return fetch('/api/users/' + params.userId, {
        method: 'PUT',
        headers: {
            'Accept' : 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + credentials.t
        },
        body: JSON.stringify(user)
    }).then((response) => {
        return response.json()
    }).catch((err) => {
        console.log(err)
    })
}
/**
 * Deleting a user
 * @param {JSON} params 
 * @param {JSON} credentials 
 */
const remove =(params,credentials) => {
    return fetch('/api/users/' + params.userId, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ credentials.t
        }
    }).then((response) => {
        return response.json()
    }).catche((err) => {
        console.log(err)
    })
}

export { 
    create, 
    list, 
    read, 
    update,
    remove 
}