import React from 'react';
import { BrowserRouter as Router, Route, Switch, useHistory } from 'react-router-dom';
import firebase from './firebase';
import Room from './Room';
import './App.css';

function Home() {
  let app = firebase.app();

  let history = useHistory();
  // history.p

  let defaultRoomSchema = {
    'name': 'Rebe',
    'players': [],
    'observers': [],
  }

  let createRoom = async () => {
    let db = await app.database().refFromURL('https://hilihao-65f1d.firebaseio.com/').push(defaultRoomSchema)

    history.push(`/${db.key}`);
  }
  return (
    <div className="App">
      <p>WIP: Pointing Poker</p>

      <button onClick={createRoom}>Create Room</button>
    </div>
  );
}

const App = () => {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/:id" component={Room} />
        </Switch>
      </Router>
    </>
  )
}

export default App;
