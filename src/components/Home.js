import React,{ useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { ACCESS_TOKEN_NAME } from '../constants/apiContants';

function Home(props) {
    useEffect(() => {
        if (!localStorage.getItem(ACCESS_TOKEN_NAME)) redirectToLogin()
    })
    function redirectToLogin() {
    props.history.push('/login');
    }
    return(
        <div className="mt-2">
            Home page content
        </div>
    )
}

export default withRouter(Home);