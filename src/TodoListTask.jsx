import React from 'react';
import {connect} from "react-redux";
import {removeTaskAC} from "./reducer";
import axios from 'axios'

class TodoListTask extends React.Component {

    state = {
        editMode: false
    }

    activateEditMode = () => {
        this.setState({editMode: true})
    }

    deactivateEditMode = () => {
        this.setState({editMode: false})
    }

    onStatusChanged = (event) => {
        let status = event.currentTarget.checked ? 2 : 0;
        this.props.changeStatus(this.props.task, status);
    };

    onTitleChanged = (event) => {
        this.props.changeTitle(this.props.task, event.currentTarget.value)
    }
    onRemoveTaskButtonClick = () => {
        let todoListId = this.props.todoListId;
        let taskId = this.props.task.id;
        axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todoListId}/tasks/${taskId}`,
            {
                withCredentials: true,
                headers: {'API-KEY': 'f28b0cf7-313a-42c3-9df8-994bce274198'}
            }
            ).then(response => {
                this.props.removeTask(todoListId, taskId)
        })

    }
    render() {
        debugger
        let priorityClass = this.props.task.priority;
        switch (priorityClass) {
            case 0:
                priorityClass ='Low';
                break;
            case 1:
                priorityClass = 'Middle';
                break;
            case 2:
                priorityClass = 'High';
                break;
            case 3:
                priorityClass = 'Urgently';
                break;
            case 4:
                priorityClass = 'Later'
        }
        let classesForTask = this.props.task.status === 2 ? 'todoList-task done' : 'todoList-task';
        return (
            <div className='taskInfo'>
                <div className={classesForTask}>
                    {this.props.task.status === 0
                        ? <input onChange={this.onStatusChanged} type="checkbox" checked={this.props.task.status}/>
                        : ''}
                    { this.state.editMode
                        ? <input autoFocus={true} onBlur={this.deactivateEditMode} value={this.props.task.name}
                                                   onChange={this.onTitleChanged}/>
                        : <span onClick={this.activateEditMode} className={priorityClass}>
                            {this.props.task.id} - {this.props.task.title}
                          </span> }
                </div>
                <button className='removeTaskButton' onClick={this.onRemoveTaskButtonClick}>x</button>
            </div>


        )
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        removeTask(todoListId, taskId) {
            dispatch(removeTaskAC(todoListId, taskId))
        }
    }
}
const ConnectedTodoListTask = connect(null, mapDispatchToProps)(TodoListTask)
export default ConnectedTodoListTask;