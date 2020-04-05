import React from 'react';
import './App.css';
import TodoList from "./TodoList";
import AddNewItemForm from "./AddNewItemForm";
import {connect} from "react-redux";
import {createTodoList, getTodoLists} from "./reducer";
import preloader from './assets/preloader.gif'

class App extends React.Component {

    componentDidMount() {
        this.restoreState()
    }

    restoreState = () => {
        this.props.getTodoLists()
    }

    addTodoList = (title) => {
        this.props.createTodoList(title)
    }

    render = () => {
        const todoLists = this.props.todoLists.map(todoList =>
            <TodoList id={todoList.id} title={todoList.title} tasks={todoList.tasks}/>)
        return (
            <>
                {this.props.isFetching ? <img className={'img'} src={preloader}/> : ''}
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
const mapStateToProps = (state) => {
    return {
        todoLists: state.todoLists,
        isFetching: state.isFetching
    }
}

const ConnectedApp = connect(mapStateToProps, {getTodoLists, createTodoList})(App)
export default ConnectedApp;

