import React from 'react'
import Form from './Form'
import AlertBox from './AlertBox'
import Confirmation from './Confirmation'

class App extends React.Component {
  state = {
    name:'',
    email:''
  }

  updateFormField = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

 
  render() {
    return (
      <React.Fragment>
        <AlertBox bgcolor="orange" msg="Please enter your email and name"/>
        <Form name={this.state.name} 
              email={this.state.email}
              update={this.updateFormField}/>
        <Confirmation
          name={this.state.name}
          email={this.state.email}
        />
      </React.Fragment>
    );
  }
}

export default App;
