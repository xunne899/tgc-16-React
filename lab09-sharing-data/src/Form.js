import React from 'react'

export default function Form(props) {


    return <React.Fragment>
        <div>
            <input type="text"
                name="name"
                placeholder="Enter name here"
                value={props.name}
                onChange={props.update} />

            <input type="text"
                name="email"
                placeholder="Enter email here"
                value={props.email}
                onChange={props.update}
                />
        </div>
        <button>Register</button>
    </React.Fragment>


}