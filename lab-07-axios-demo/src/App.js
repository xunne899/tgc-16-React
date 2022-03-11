import React from 'react'
import axios from 'axios'

class App extends React.Component {
  state = {
    'foods': '',
    'loaded': false  // represents whether loading of data is done
  }
  async componentDidMount() {
    // don't put ./public in front
    let response = await axios.get('food.json');
    this.setState({
      'foods': response.data,
      'loaded': true
    })
  }

  renderFood() {
    let food = [];
    for (let f of this.state.foods) {
      food.push(<li key={f}>{f}</li>)
    }
    return food;
  }

  render() {
    return <React.Fragment>
      <h1>My Favourite Food</h1>
      { 
        this.state.loaded ?
          <ul>
          {this.renderFood()}
          </ul>
          :
          <h3>Loading...</h3>
      }
     
    </React.Fragment>

  }
}

export default App;
