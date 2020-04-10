import React from 'react';
import './App.css';
import TodoListTask from "./TodoListTask";
import {TaskType} from "./types/entities";
type OwnProps = {
    changeTitle: (task: TaskType, title: string) => void
    todoListId: string
    changeStatus: (task: TaskType, status: number) => void
    tasks: Array<TaskType>
}
type PropsType = OwnProps
class TodoListTasks extends React.Component<PropsType> {
    render = () => {

        const tasksElements = this.props.tasks.map(task => <TodoListTask task={task} changeStatus={this.props.changeStatus}
                            todoListId={this.props.todoListId} changeTitle={this.props.changeTitle}/>);
        return (
            <div className="todoList-tasks">
                {tasksElements}
            </div>
        );
    }
}

export default TodoListTasks;

