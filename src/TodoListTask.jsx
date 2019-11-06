import React from 'react';

class TodoListTask extends React.Component {
    render() {

        let priorityClass = this.props.priority;
        if (this.props.priority === 'high') {
            priorityClass = 'filter-high';
        } else if (this.props.priority === 'medium') {
            priorityClass = 'filter-medium';
        } else {
            priorityClass = 'filter-low';
        }; /*создали переменную, которая принимает значение свойства priority объекта task,
        с помощью конструкции if-else в зависимости от того, какое значение указано в priority,
        присвоили priorityClass необходимое значение CSS-класса из App.css*/

        return (
            <div className="todoList-task">
                <input type="checkbox" checked={this.props.isDone}/>
                <span className={priorityClass}>{this.props.name}</span> {/*поместили CSS-класс из App.css в этот тэг*/}
            </div>
        )
    }
}

export default TodoListTask;