import React, {ChangeEvent} from 'react';
import {connect} from "react-redux";
import {removeTask} from "./reducer";
import {TaskType} from "./types/entities";

enum PriorityClass {
    low = "low",
    Middle = 'Middle',
    High = 'High',
    Urgently = 'Urgently',
    Later = 'Later'
}

type StateType = {
    editMode: boolean
    title: string
    activeClass: string
}
type OwnPropsType = {
    task: TaskType
    changeStatus: (task: TaskType, status: number) => void
    todoListId: string
    changeTitle: (task: TaskType, newTitle: string) => void
}
type MapDispatchToPropsType = {
    removeTask: (todoListId: string, taskId: string) => void
}
type PropsType = OwnPropsType & MapDispatchToPropsType
class TodoListTask extends React.Component<PropsType, StateType> {

    state: StateType = {
        editMode: false,
        title: this.props.task.title,
        activeClass: ''
    }

    activateEditMode = () => {
        this.setState({editMode: true})
    }

    deactivateEditMode = () => {
        this.setState({editMode: false})
        this.props.changeTitle(this.props.task, this.state.title)
    }

    onStatusChanged = (event: ChangeEvent<HTMLInputElement>) => {
        debugger
        let status = event.currentTarget.checked ? 2 : 0;
        this.props.changeStatus(this.props.task, status);
    };

    onTitleChanged = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({title: event.currentTarget.value.trimLeft()})
    }
    onRemoveTaskButtonClick = () => {
        let todoListId = this.props.todoListId;
        let taskId = this.props.task.id;
        this.props.removeTask(todoListId, taskId)
    }
    render() {
        let priorityClass = this.props.task.priority;
        switch (priorityClass) {
            case 0:
                this.state.activeClass =  PriorityClass.low;
                break;
            case 1:
                this.state.activeClass = PriorityClass.Middle;
                break;
            case 2:
                this.state.activeClass = PriorityClass.High;
                break;
            case 3:
                this.state.activeClass = PriorityClass.Urgently;
                break;
            case 4:
                this.state.activeClass = PriorityClass.Later;
                break;
            default:
                this.state.activeClass =  PriorityClass.low;
                break
        }
        let classesForTask = this.props.task.status === 2 ? 'todoList-task done' : 'todoList-task';
        debugger
        return (
            <div className='taskInfo'>
                <div className={classesForTask}>
                    {this.props.task.status === 0
                        ? <input onChange={this.onStatusChanged} type="checkbox" checked={false}/>
                        : ''}
                    { this.state.editMode
                        ? <input autoFocus={true} onBlur={this.deactivateEditMode} value={this.state.title}
                                                   onChange={this.onTitleChanged}/>
                        : <span onDoubleClick={this.activateEditMode} className={this.state.activeClass}>
                            {this.props.task.title}
                          </span> }
                </div>
                <button className='removeTaskButton' onClick={this.onRemoveTaskButtonClick}>x</button>
            </div>
        )
    }
}

const ConnectedTodoListTask = connect<{}, MapDispatchToPropsType, OwnPropsType>(null, {removeTask})(TodoListTask)
export default ConnectedTodoListTask;