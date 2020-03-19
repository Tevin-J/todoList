import React from 'react';
import {connect} from "react-redux";
import {removeTaskAC} from "./reducer";

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
        this.props.changeStatus(this.props.task.id, status);
    };

    onTitleChanged = (event) => {
        this.props.changeTitle(this.props.task.id, event.currentTarget.value)
    }
    onRemoveTaskButtonClick = () => {
        this.props.removeTask(this.props.todoListId, this.props.task.id)
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
                    {this.props.task.status === 2
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
            const action = removeTaskAC(todoListId, taskId)
            dispatch(action)
        }
    }
}
const ConnectedTodoListTask = connect(null, mapDispatchToProps)(TodoListTask)
export default ConnectedTodoListTask;