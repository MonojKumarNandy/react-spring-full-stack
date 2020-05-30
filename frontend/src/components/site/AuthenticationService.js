
import axios from 'axios';


class AuthenticationService {

    handleLogin(username, password) {
        //alert("arer")
        //console.log("erer")
        const options = { headers: { authorization: this.createBasicAuthToken(username, password) } }
        return axios.get(`http://localhost:8086/authenticate`, options)

    }




    createBasicAuthToken(username, password) {
        return 'Basic ' + window.btoa(username + ":" + password)
    }


    registerSuccessfulLoginForJwt(username, role, token) {
        sessionStorage.setItem("username", username)
        sessionStorage.setItem("role", role)
        sessionStorage.setItem("token", this.createJWTToken(token))

    }

    createJWTToken(token) {
        return 'Bearer ' + token
    }


}


export default new AuthenticationService();

