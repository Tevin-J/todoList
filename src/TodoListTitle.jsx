import React from 'react';
import './App.css';
import {connect} from "react-redux";
import {changeTodoList} from "./reducer";

class TodoListTitle extends React.Component {
    state = {
        title: this.props.title,
        isEditMode: false
    }
    onTitleChanged = (e) => {
        this.setState({title: e.currentTarget.value.trimLeft()})
    }
    onEnterPress = (e) => {
        if (e.key === 'Enter') {
            this.deactivateEditMode()
        }
    }
    activateEditMode = () => {
        this.setState({isEditMode: true})
    }
    deactivateEditMode = () => {
        this.setState({isEditMode: false})
        this.props.changeTodoList(this.props.id, this.state.title)
    }
    render = () => {
        return (
            <>
            {this.state.isEditMode
                ? <input value={this.state.title} onChange={this.onTitleChanged} onBlur={this.deactivateEditMode}
                onKeyPress={this.onEnterPress} autoFocus={true}/>
                : <h3 className="todoList-header__title" onDoubleClick={this.activateEditMode}>{this.props.title}</h3>}
            </>
        );
    }
}
const connectedTodoListTitle = connect(null, {changeTodoList})(TodoListTitle)
export default connectedTodoListTitle;

