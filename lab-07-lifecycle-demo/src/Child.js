import React from 'react'

export default class Child extends React.Component {
    constructor(){
        super();
        console.log("Child's constructor has been called");
    }

    render() {
        console.log("Child's render has been called");
        return <React.Fragment>
            <h1>Child</h1>
        </React.Fragment>
    }
    componentDidMount() {
        console.log("Child's componentDidMount is called");
    }
}