import React from 'react'

export default function Confirmation(props){
    return <React.Fragment>
        <h1>Your registration is being processed</h1>
        <ul>
            <li>Name:{props.name}</li>
            <li>Email:{props.email}</li>
        </ul>
    </React.Fragment>
}