import React from 'react';

class TodoListTask extends React.Component {

    onIsDoneChanged = (event) => {
        this.props.changeStatus(this.props.task, event.currentTarget.checked);
    };
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
            <div className={classesForTask}>
                <input onChange={this.onIsDoneChanged} type="checkbox" checked={this.props.task.isDone}/>
                <span className={priorityClass}>{this.props.task.name}</span> {/*поместили CSS-класс из App.css в этот тэг*/}
            </div>
        )
    }
}

export default TodoListTask;