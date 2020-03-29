import React from 'react';
import './App.css';
import AddNewItemForm from "./AddNewItemForm";
import TodoListTasks from "./TodoListTasks";
import TodoListFooter from "./TodoListFooter";
import TodoListTitle from "./TodoListTitle";
import {connect} from "react-redux";
import {addTaskAC, changeTaskAC, removeTodolistAC, setTasksAC, updateTodoListTitleAC} from "./reducer";
import {api} from "./api";

class TodoList extends React.Component {
    componentDidMount() {
        this.restoreState()
    }
    restoreState = () => {
        let todoListId = this.props.id
        api.getTasks(todoListId)
            .then(response => {
                if (response.data.error === null) {
                    this.props.setTasks(response.data.items, todoListId)
                }
        })
    }

    state = {
        filterValue : 'All',
    };

    addTask = (newText) => {
        let todoListId = this.props.id
        api.createTask(todoListId, newText)
            .then(response => {
                if (response.data.resultCode === 0) {
                    this.props.addTask(response.data.data.item, todoListId)
                }
            })
    }

    changeFilter = (newFilterValue) => {
        this.setState({
            filterValue: newFilterValue
        });
    };

    changeStatus = (task, status) => {
        this.changeTask(task, {status: status})
    }

    changeTitle = (task, newTitle) => {
        this.changeTask(task, {title: newTitle})
    }

    changeTask = (task, obj) => {
        let todoListId = this.props.id;
        let taskId = task.id;
        let changedTask = {...task, ...obj};
        api.changeTask(todoListId, taskId, changedTask)
            .then(response => {
                if (response.data.resultCode === 0) {
                    this.props.changeTask(response.data.data.item)
                }
        })
    }
    onRemoveTodoListClick = () => {
        let todoListId = this.props.id
        api.removeTodoList(todoListId)
            .then(response => {
                if (response.data.resultCode === 0) {
                    this.props.removeTodoList(todoListId)
                }

            })
    }
    render = () => {
        let {tasks = []} = this.props
        return (
            <div className="App">
                <div className="todoList">
                    <div className="todoList-header">
                        <div className='todoListTitle'>
                            <TodoListTitle title={this.props.title} id={this.props.id} updateTodoListTitle={this.props.updateTodoListTitle}/>
                            <button className='removeTodoListButton' onClick={this.onRemoveTodoListClick}>x</button>
                        </div>
                        <AddNewItemForm addItem={this.addTask} title={this.props.title}/>
                    </div>
                    <TodoListTasks changeTitle={this.changeTitle} todoListId={this.props.id} changeStatus={this.changeStatus} tasks={tasks.filter(task => {
                        switch (this.state.filterValue) {
                            case 'All': return true;
                            case 'Active': return !task.status;
                            case 'Completed': return task.status;
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
            dispatch(addTaskAC(newTask, todoListId))
        },
        changeTask(task) {
            dispatch(changeTaskAC(task))
        },
        removeTodoList(todoListId) {
            dispatch(removeTodolistAC(todoListId))
        },
        setTasks(tasks, todoListId) {
            dispatch(setTasksAC(tasks, todoListId))
        },
        updateTodoListTitle(todoListId, todoListTitle) {
            dispatch(updateTodoListTitleAC(todoListId, todoListTitle))
        }
    }
}
const ConnectedTodoList = connect(null, mapDispatchToProps)(TodoList)
export default ConnectedTodoList;

