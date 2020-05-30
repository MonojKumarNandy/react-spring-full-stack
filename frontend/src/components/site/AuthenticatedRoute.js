import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'

class AuthenticatedRoute extends Component {
    render() {
        if (sessionStorage.getItem("username")!==null) {
            return <Route {...this.props} />
        } else {
            return <Redirect to="/login" />
        }

    }
}

export default AuthenticatedRoute