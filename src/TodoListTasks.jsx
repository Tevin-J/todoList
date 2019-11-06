import React from 'react';
import './App.css';
import TodoListTask from "./TodoListTask";

class TodoListTasks extends React.Component {
    render = () => {

        /*const tasksElements = [
            <TodoListTask name={this.props.tasks[0].name} isDone={this.props.tasks[0].isDone}/>,
            <TodoListTask name={this.props.tasks[1].name} isDone={this.props.tasks[1].isDone}/>,
            <TodoListTask name={this.props.tasks[2].name} isDone={this.props.tasks[2].isDone}/>,
            <TodoListTask name={this.props.tasks[3].name} isDone={this.props.tasks[3].isDone}/>
        ];*/ /*4 создали массив JSX элементов, чтоб отрисовать уже не отдельно каждый элемент, а весь массив. Однако,
        здесь мы снова захардкодили данные, а мы хотим получить массив JSX-элементов автоматически на базе массива
        JS-объектов tasks. Для этого воспользуемся методом map*/

        const tasksElements = this.props.tasks.map(task => <TodoListTask name={task.name} isDone={task.isDone} priority={task.priority}/>);
        /*5 используем метод map. создаем новый массив, достаем массив tasks из App при помощи this.props.tasks,
        используем map. task - условное обозначение, туда мы помещаем атрибут name и isDone из того массива, над которым
        используем метод map. далее эти ключи со значениями объектов преобразованного методом map массива = атрибуты
        тэгов TodoListTask используются при оформлении тэга в файле TodoListTask.jsx*/

       /* const tasks = [
            {name: 'CSS', isDone: true},
            {name: 'JavaScript', isDone: false},
            {name: 'HTML', isDone: true},
            {name: 'React.js', isDone: false},
        ];*/ /*2 В данном случае TodoListTasks компонента хранит данные. Чем меньше компонент
        создает данные, тем лучше. Но компоненте данные все равно нужны, и она может их брать
        из props. Выносим массив данных в компоненту App.*/

        return (

            <div className="todoList-tasks">
                {/*<TodoListTask name='CSS' isDone={true}/>
                <TodoListTask name='JavaScript' isDone={false}/>
                <TodoListTask name='HTML' isDone={true}/>
                <TodoListTask name='React.js' isDone={false}/>*/} {/*1 выносим данные в массив объектов, чтоб они были
                отдельно от разметки. Вставляем его перед return*/}
                {/*<TodoListTask name={tasks[0].name} isDone={tasks[0].isDone}/>
                <TodoListTask name={tasks[1].name} isDone={tasks[1].isDone}/>
                <TodoListTask name={tasks[2].name} isDone={tasks[2].isDone}/>
                <TodoListTask name={tasks[3].name} isDone={tasks[3].isDone}/>*/} {/*вызов компоненты для 2*/}
                {/*<TodoListTask name={this.props.tasks[0].name} isDone={this.props.tasks[0].isDone}/>
                <TodoListTask name={this.props.tasks[1].name} isDone={this.props.tasks[1].isDone}/>
                <TodoListTask name={this.props.tasks[2].name} isDone={this.props.tasks[2].isDone}/>
                <TodoListTask name={this.props.tasks[3].name} isDone={this.props.tasks[3].isDone}/>*/} {/*вызов компоненты
                для 3. В данном случае проблема в том, TodoListTasks жестко прописывает 4 компоненты TodoListTask. А нам
                нужно чтоб она отрисовывала ровно столько объектов, сколько будет в массиве tasks. Для этого будем
                использовать метод map */}
                {tasksElements} {/*вызов компоненты для 4 и 5*/}
            </div>
        );
    }
}

export default TodoListTasks;

