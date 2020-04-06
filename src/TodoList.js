import React from 'react';
import './App.css';
import AddNewItemForm from "./AddNewItemForm";
import TodoListTasks from "./TodoListTasks";
import TodoListFooter from "./TodoListFooter";
import TodoListTitle from "./TodoListTitle";
import {connect} from "react-redux";
import {addTask, changeTask, getTasks, removeTodoList} from "./reducer";
import preloader from './assets/preloader.gif'

class TodoList extends React.Component {
    componentDidMount() {
        this.restoreState()
    }

    restoreState = () => {
        let todoListId = this.props.id
        this.props.getTasks(todoListId)

    }

    state = {
        filterValue: 'All',
    };

    addTask = (newText) => {
        let todoListId = this.props.id
        this.props.addTask(todoListId, newText)
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
        this.props.changeTask(todoListId, taskId, changedTask)

    }
    onRemoveTodoListClick = () => {
        let todoListId = this.props.id
        this.props.removeTodoList(todoListId)

    }
    render = () => {
        let {tasks = []} = this.props
        return (
            <div className="App">
                <div className="todoList">
                    <div className="todoList-header">
                        <div className='todoListTitle'>
                            <TodoListTitle title={this.props.title} id={this.props.id}/>
                            <button className='removeTodoListButton' onClick={this.onRemoveTodoListClick}>x</button>
                        </div>
                        <AddNewItemForm addItem={this.addTask} title={this.props.title}/>
                    </div>
                    {this.props.todoList.isFetching
                        ? <img src={preloader} className='img'/>
                        : <TodoListTasks changeTitle={this.changeTitle} todoListId={this.props.id}
                                         changeStatus={this.changeStatus} tasks={tasks.filter(task => {
                            switch (this.state.filterValue) {
                                case 'All':
                                    return true;
                                case 'Active':
                                    return !task.status;
                                case 'Completed':
                                    return task.status;
                                default:
                                    return true;
                            }
                        })}/>}

                    <TodoListFooter changeFilter={this.changeFilter} filterValue={this.state.filterValue}/>
                </div>
            </div>
        );
    }
}

const ConnectedTodoList = connect(null, {addTask, changeTask, removeTodoList, getTasks})(TodoList)
export default ConnectedTodoList;

