import React from 'react';
import './App.css';
import TodoList from "./TodoList";
import AddNewItemForm from "./AddNewItemForm";
import {connect} from "react-redux";
import {addTodolistAC, setTodoListsAC} from "./reducer";
import axios from "axios";

class App extends React.Component {

    componentDidMount() {
        this.restoreState()
    }

    restoreState = () => {
        axios.get(`https://social-network.samuraijs.com/api/1.1/todo-lists`,
            {withCredentials: true}
            ).then(response => {
                this.props.setTodoLists(response.data)
            })
    }

    addTodoList = (title) => {
        axios.post(`https://social-network.samuraijs.com/api/1.1/todo-lists`,
            {title: title},
            {
                withCredentials: true,
                headers: {'API-KEY': 'f28b0cf7-313a-42c3-9df8-994bce274198'}
            }
        ).then(response => {
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

