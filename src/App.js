import React from 'react';
import './App.css';
import TodoList from "./TodoList";
import AddNewItemForm from "./AddNewItemForm";
import {connect} from "react-redux";
import {addTodolistAC, setTodoListsAC} from "./reducer";
import {api} from "./api";

class App extends React.Component {

    componentDidMount() {
        this.restoreState()
    }

    restoreState = () => {
        api.getTodoLists()
            .then(response => {
                this.props.setTodoLists(response.data)
            })
    }

    addTodoList = (title) => {
        api.createTodoList(title)
            .then(response => {
                if (response.data.resultCode === 0) {
                    this.props.addTodoList(response.data.data.item)
                }
            })
    }

    render = () => {
        const todoLists = this.props.todoLists.map(todoList =>
            <TodoList id={todoList.id} title={todoList.title} tasks={todoList.tasks}/>)
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
const mapStateToProps = (state) => {
    return {
        todoLists: state.todoLists
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        addTodoList: (newTodoList) => {
            dispatch(addTodolistAC(newTodoList))
        },
        setTodoLists: (todoLists) => {
            dispatch(setTodoListsAC(todoLists))
        }
    }
}
const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App)
export default ConnectedApp;

