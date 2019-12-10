import React from 'react';
import './App.css';
import TodoList from "./TodoList";
import AddNewItemForm from "./AddNewItemForm";

class App extends React.Component {
    nextTodoListId = 0;
    state = {
        todoLists: [
            /*{id: 0, title: 'What to learn?'},
            {id: 1, title: 'Week tasks'},
            {id: 2, title: 'Year tasks'}*/
        ],
    }
    componentDidMount() {
        this.restoreState()
    }
    addTodoList = (title) => {
        let newTodoList = {
            id: this.nextTodoListId,
            title: title
        }
        this.nextTodoListId++;
        this.setState({todoLists: [...this.state.todoLists, newTodoList]}, ()=>{this.saveState()})
    }
    saveState = () => {
        let stateAsString = JSON.stringify(this.state);
        localStorage.setItem('todoList-state', stateAsString)
    }
    restoreState = () => {
        let state = this.state;
        let stateAsString = localStorage.getItem('todoList-state');
        if (stateAsString != null) {
            state = JSON.parse(stateAsString)
        }
        this.setState(state, () => {
            this.state.todoLists.forEach(todoList => {
                if (todoList.id >= this.nextTodoListId) {
                    this.nextTodoListId++;
                }
            })
        })
    }
    render = () => {
        const todoLists = this.state.todoLists.map(todoList =>
            <TodoList id={todoList.id} title={todoList.title}/>)
        return (
            <>
                <div>
                    <AddNewItemForm addItem={this.addTodoList}/>
                </div>
                <div className="App">
                    {todoLists}
                </div>
            </>

        );
    }
}

export default App;

