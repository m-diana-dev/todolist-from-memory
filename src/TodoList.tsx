import React, {ChangeEvent,KeyboardEvent, MouseEvent, useState} from 'react';
import {filterType, TaskType} from "./App";
import './App.css'
import {Button} from "./components/Button";

type TodoListPropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (id:string)=>void
    filter:filterType
    setFilter: (filter: filterType)=>void
    addTask: (title:string)=>void
    CheckedTask: (id: string, checkedValue:boolean)=>void
}

export const TodoList = (props: TodoListPropsType) => {

    const [inputTitle, setInputTitle] = useState('');
    const [error, setError] = useState('');
    const onClickFilterHandler = (filterTitle: filterType) => {
        props.setFilter(filterTitle)
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setInputTitle(e.currentTarget.value);
    }
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError('');
        if(e.key==='Enter'){
            onClickAddHandler();
        }
    }

    const onClickAddHandler = () => {
        if(inputTitle.trim()!==''){
            props.addTask(inputTitle.trim());
            setInputTitle('');
        } else {
            setError('Invalid value');
        }
    }
    const onClickCheckedHandler = (id:string,e:boolean) =>{
        props.CheckedTask(id, e)//вызвало проблему, обратить внимание, повторить еще раз
    }

    return (
        <div>
            <h3>W{props.title}</h3>
            <div>
                <input value={inputTitle} onChange={onChangeHandler} onKeyDown={onKeyDownHandler} className={(error?'error':undefined)}/>
                <Button name={'+'} callback={onClickAddHandler}/>
            </div>
            { error && (<div className={'errorMessage'}>{error}</div>)}
            <ul>
                {props.tasks.map(el => {
                    const onClickRemoveHandler = (id: string) => {
                        props.removeTask(id);
                    }
                    return (
                        <li key={el.id} className={(el.isDone)?'isDone':undefined}>
                            <input type="checkbox" checked={el.isDone} onClick={(e:MouseEvent<HTMLInputElement>)=>{onClickCheckedHandler(el.id, e.currentTarget.checked)}}/>
                            <span>{el.title}</span>
                            <Button name={'x'} callback={()=>{onClickRemoveHandler(el.id)}}/>
                        </li>
                    )
                })
                }
            </ul>
            <div>
                <Button className={(props.filter==='all')?'activeFilter':undefined} name={'All'} callback={()=>{onClickFilterHandler('all')}}/>
                <Button className={(props.filter==='active')?'activeFilter':undefined} name={'Active'} callback={()=>{onClickFilterHandler('active')}}/>
                <Button className={(props.filter==='completed')?'activeFilter':undefined} name={'Completed'} callback={()=>{onClickFilterHandler('completed')}}/>
            </div>
        </div>
    );
};
