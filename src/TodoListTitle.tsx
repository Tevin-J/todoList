import React, {ChangeEvent, ChangeEventHandler, KeyboardEventHandler} from 'react';
import './App.css';
import {connect} from "react-redux";
import {changeTodoList} from "./reducer";
import {AppStateType} from "./store";
type StateType = {
    title: string
    isEditMode: boolean
}
type OwnPropsType = {
    title: string
    id: string
}
type MapDispatchToPropsType = {
    changeTodoList: (id: string, title: string) => void
}
type PropsType = OwnPropsType & MapDispatchToPropsType
class TodoListTitle extends React.Component<PropsType, StateType> {
    state: StateType = {
        title: this.props.title,
        isEditMode: false
    }
    onTitleChanged = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({title: e.currentTarget.value.trimLeft()})
    }
    onEnterPress = (e: any/*KeyboardEvent<HTMLInputElement>*/) => {
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
const connectedTodoListTitle = connect<{}, MapDispatchToPropsType, OwnPropsType, AppStateType>(null, {changeTodoList})(TodoListTitle)
export default connectedTodoListTitle;

