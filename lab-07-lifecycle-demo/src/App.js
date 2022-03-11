import React from 'react'
import Child from "./Child"

class App extends React.Component {
  constructor() {
    // in JavaScript, if we do inheritance, we have call the parent
    // class constructor
    super();  // <-- call the parent class constructor
    console.log("App's constructor is called");
  }

  state = {
    'number': 0
  }

  render() {
    console.log("App's render is called");
    return <React.Fragment>
      <h1>App</h1>
      <Child/>
      <Child/>
    </React.Fragment>
  }
  componentDidMount() {
    // will only be once
    console.log("App's componentDidMount is called");

  }
}

export default App;

