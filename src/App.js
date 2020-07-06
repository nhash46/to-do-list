import React from 'react';
import Header from './components/layout/Header'
import Todos from './components/Todos';
import AddTodo from './components/AddTodo';

import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    todos: [
      {
        id: 1,
        title: 'Take out the trash',
        completed: false
      },
      {
        id: 2,
        title: 'Dinner with wife',
        completed: false
      },
      {
        id: 3,
        title: 'Meeting with boss',
        completed: false
      }
    ]
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
    this.setState({ todos: [...this.state.todos.filter(todo => todo.id !== id)] });
  }

  // Add Todo
  addTodo = (title) => {
    console.log(title);
  }

  render() {
    return (
      <div className="App">
        <div className="container">
          <Header/>
          <AddTodo addTodo={this.addTodo}/>
          <Todos todos= {this.state.todos} markComplete={this.markComplete} delTodo={this.delTodo}/>
        </div>
      </div>
    );
  }
}

export default App;
