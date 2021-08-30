import React, { useState, useEffect } from 'react'
import { Route, Redirect } from 'react-router-dom'
import UserClient from '../APIClients/UserClient'

export default ({ component: Component, ...rest }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        let mounted = true;
        if (mounted) {
            UserClient.getUser((user, error) => {
                if (error) {
                    setUser(error);
                } else {
                    setUser(user);
                }
            });
        }
        return () => mounted = false;
    }, [])

    if(user === null) {
        return <div>Loading User...</div>
    }

    return <Route {...rest} render={(props) => {
        if(!user.error)
            return <Component {...rest} user={user}/>
        else return <Redirect to={{pathname: "/", state:{from: props.location}}}/>
    }}/>
}
