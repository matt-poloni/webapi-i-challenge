import React from 'react';
import axios from 'axios';
import './App.css';

const baseURL = 'http://localhost:5000/api/users';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
    }
  }

  componentDidMount() {
    axios.get(`${baseURL}`)
      .then(res => this.setState({ users: res.data }))
      .catch(err => console.log(err.response))
  }

  render() {
    return (
      <div className="App">
        {this.state.users.map(user => {
          return (
            <p key={user.id}>
              <strong>{user.name}: </strong>
              {user.bio}
            </p>
          )
        })}
      </div>
    );
  }
}

export default App;
