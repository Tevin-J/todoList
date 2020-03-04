import React from 'react';
import {connect} from "react-redux";

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

    onIsDoneChanged = (event) => {
        this.props.changeStatus(this.props.task.id, event.currentTarget.checked);
    };

    onTitleChanged = (event) => {
        this.props.changeTitle(this.props.task.id, event.currentTarget.value)
    }
    onRemoveTaskButtonClick = () => {
        this.props.removeTask(this.props.todoListId, this.props.task.id)
    }
    render() {

        let priorityClass = this.props.priority;
        if (this.props.priority === 'high') {
            priorityClass = 'filter-high';
        } else if (this.props.priority === 'medium') {
            priorityClass = 'filter-medium';
        } else {
            priorityClass = 'filter-low';
        };
        let classesForTask = this.props.task.isDone ? 'todoList-task done' : 'todoList-task';
        return (
            <div className='taskInfo'>
                <div className={classesForTask}>
                    <input onChange={this.onIsDoneChanged} type="checkbox" checked={this.props.task.isDone}/>
                    { this.state.editMode ? <input autoFocus={true} onBlur={this.deactivateEditMode} value={this.props.task.name}
                                                   onChange={this.onTitleChanged}/> : <span onClick={this.activateEditMode}
                                                                                            className={priorityClass}>
                {this.props.task.id} - {this.props.task.name}</span> }
                </div>
                <button className='removeTaskButton' onClick={this.onRemoveTaskButtonClick}>x</button>
            </div>


        )
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        removeTask(todoListId, taskId) {
            const action = {
                type: 'REMOVE-TASK',
                todoListId,
                taskId
            }
            dispatch(action)
        }
    }
}
const ConnectedTodoListTask = connect(null, mapDispatchToProps)(TodoListTask)
export default ConnectedTodoListTask;