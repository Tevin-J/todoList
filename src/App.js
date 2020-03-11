import React from 'react';
import './App.css';
import TodoList from "./TodoList";
import AddNewItemForm from "./AddNewItemForm";
import {connect} from "react-redux";
import {addTodolistAC} from "./reducer";

class App extends React.Component {
    nextTodoListId = 0;

    addTodoList = (title) => {
        let newTodoList = {
            id: this.nextTodoListId,
            title: title,
            tasks: [] /*добавили необходимое свойство tasks,чтоб при добавлении нового tdl не падала ошибка*/
        }
        this.nextTodoListId++;
        this.props.addTodoList(newTodoList)
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
        }
    }
}
const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App)
export default ConnectedApp;

