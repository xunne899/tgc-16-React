import React from 'react'

export default function AlertBox(props) {
    return <React.Fragment>
        <div style={{
            'backgroundColor': props.bgcolor
        }}>
            {props.msg}
        </div>

    </React.Fragment>

}