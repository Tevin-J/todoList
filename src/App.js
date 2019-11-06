import React from 'react';
import './App.css';
import TodoListHeader from "./TodoListHeader";
import TodoListTasks from "./TodoListTasks";
import TodoListFooter from "./TodoListFooter";

class App extends React.Component {

        tasks = [
        {name: 'CSS', isDone: true, priority: 'low'},
        {name: 'JavaScript', isDone: false, priority: 'medium'},
        {name: 'HTML', isDone: true, priority: 'low'},
        {name: 'React.js', isDone: false, priority: 'high'},
    ];  /*6 вынесли данные из метода render и сделали tasks не переменной а свойством объекта*/

    filterValue = 'Active'; /*10 вынесли filterValue в отдельное свойство компоненты App*/

    render = () => {
        /*const tasks = [
            {name: 'CSS', isDone: true, priority: 'low'},
            {name: 'JavaScript', isDone: false, priority: 'medium'},
            {name: 'HTML', isDone: true, priority: 'low'},
            {name: 'React.js', isDone: false, priority: 'high'},
        ];*/ /*3 выенсли данные из TodoListTasks в App, дальше выносим данные из метода render, делаем переменную tasks
        не переменной, а свойством объекта*/
        return (
            <div className="App">

                <div className="todoList">
                    <TodoListHeader/>
                    {/*<TodoListTasks tasks={tasks}/>*/} {/*таким образом вызываем TodoListTasks для 3*/}
                    <TodoListTasks tasks={this.tasks}/> {/*вызываем компоненту для 6*/}
                    {/*<TodoListFooter filterValue='Completed'/>*/} {/*9 Здесь мы при вызове компоненты прописывали свойство
                    filterValue, вынесем его как совойство объекта App*/}
                    <TodoListFooter filterValue={this.filterValue}/> {/*вызываем компоненту для 10. Прописали свойсто
                    filterValue через this, так как мы уже обращаемся к объекту this - свойству компоненты App.*/}
                </div>
            </div>
        );
    }
}

export default App;

