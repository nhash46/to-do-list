import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/layout/Header'
import Todos from './components/Todos';
import AddTodo from './components/AddTodo';
import About from './components/pages/About'
import {v4 as uuid} from "uuid"; 
import axios from 'axios';

import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    todos: []
  }

  componentDidMount() {
    // get request
    axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10')
      .then(res => this.setState({ todos: res.data}));
  }

  // Toggle complete 
  markComplete = (id) => {
    this.setState({ todos: this.state.todos.map(todo => {
      if(todo.id === id){
        todo.completed = !todo.completed
      }
      return todo;
    }) });
  }

  // Delete Todo
  delTodo = (id) => {
     // spread operator ([...) which copies over the contents of the array in accordance to filter - i.e. those ids which do not match the id passed via parameter (id being deleted)
    axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .then(res =>this.setState({ todos: [...this.state.todos.filter(todo => todo.id !== id)] }));
   
  }

  // Add Todo
  addTodo = (title) => {
    axios.post('https://jsonplaceholder.typicode.com/todos', {
      title,
      completed: false
    })
      .then(res => this.setState({ todos: [...this.state.todos, res.data] }));
    /**
    const newTodo = {
      id: uuid(),
      title, 
      completed: false
    }
     */
  }

  render() {
    return (
      <Router>
        <div className="App">
          <div className="container">
            <Header/>
            <Route exact path="/" render={props => (
              <React.Fragment>
                <AddTodo addTodo={this.addTodo}/>
                <Todos todos= {this.state.todos} markComplete={this.markComplete} delTodo={this.delTodo}/>
              </React.Fragment>
            )}/>
            <Route path="/about" component={About}/>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
