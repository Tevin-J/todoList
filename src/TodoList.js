import React from 'react';
import './App.css';
import AddNewItemForm from "./AddNewItemForm";
import TodoListTasks from "./TodoListTasks";
import TodoListFooter from "./TodoListFooter";
import TodoListTitle from "./TodoListTitle";
import {connect} from "react-redux";

class TodoList extends React.Component {

    nextTaskId = 0;

    state = {
        filterValue : 'All',
    };

    addTask = (newText) => {
        let newTask = {id: this.nextTaskId, name: newText, isDone: false, priority: 'high'};
        this.nextTaskId++;
        this.props.addTask(newTask, this.props.id)
    }

    changeFilter = (newFilterValue) => {
        this.setState({
            filterValue: newFilterValue
        },  () => {this.saveState()});
    };

    changeStatus = (taskId, isDone) => {
        this.changeTask(taskId, {isDone: isDone})
    }

    changeTitle = (taskId, newTitle) => {
        this.changeTask(taskId, {name: newTitle})
    }

    changeTask = (taskId, obj) => {
        this.props.changeTask(this.props.id, taskId, obj)
    }
    onRemoveTodoListClick = () => {
        this.props.removeTodoList(this.props.id)
    }
    render = () => {

        return (
            <div className="App">
                <div className="todoList">
                    <div className="todoList-header">
                        <div className='todoListTitle'>
                            <TodoListTitle title={this.props.title}/>
                            <button className='removeTodoListButton' onClick={this.onRemoveTodoListClick}>x</button>
                        </div>
                        <AddNewItemForm addItem={this.addTask} title={this.props.title}/>
                    </div>
                    <TodoListTasks changeTitle={this.changeTitle} todoListId={this.props.id} changeStatus={this.changeStatus} tasks={this.props.tasks.filter(task => {
                        switch (this.state.filterValue) {
                            case 'All': return true;
                            case 'Active': return !task.isDone;
                            case 'Completed': return task.isDone;
                            default: return true;
                        }
                    })}/>
                    <TodoListFooter changeFilter={this.changeFilter} filterValue={this.state.filterValue}/>
                </div>
            </div>
        );
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        addTask(newTask, todoListId) {
            const action = {
                type: 'ADD-TASK',
                newTask,
                todoListId
            }
            dispatch(action)
        },
        changeTask(todoListId, taskId, obj) {
            const action = {
                type: 'CHANGE-TASK',
                todoListId,
                taskId,
                obj
            }
            dispatch(action)
        },
        removeTodoList(todoListId) {
            const action = {
                type: 'REMOVE-TODOLIST',
                todoListId
            }
            dispatch(action)
        }
    }
}
const ConnectedTodoList = connect(null, mapDispatchToProps)(TodoList)
export default ConnectedTodoList;

