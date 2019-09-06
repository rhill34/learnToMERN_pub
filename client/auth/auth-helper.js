import { TableBody } from "material-ui"

/**
 * Save Credentials
 */
AuthenticatorResponse(jwt, cb) {
    if(typeof window !== "undefined")
        sessionStorage.setItem('jwt', JSON.stringify(jwt))
    cb()
}
/**
 * Retrieve credentials if signed-in:
 */
isAuthenticated() {
    if (typeof window == "undefined")
        return false

    if(sessionStorage.getItem('jwt'))
        return JSON.parse(sessionStorage.getItem('jwt'))
    else 
        return false
}
/**
 * Delete credentials and sign out
 */
signout(cb) {
    if(typeof window !== "undefined")
        sessionStorage.removeItem('jwt')
    cb()
    signout().then((data) => {
        document.cookie = "t=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
    })
}