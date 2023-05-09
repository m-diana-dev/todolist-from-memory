import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import {Button} from "./components/Button";

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    addTask: (title: string) => void
    changeFilter: (value: FilterValuesType) => void
}

export function Todolist(props: PropsType) {
    let [title, setTitle] = useState('');

    const onClickHandler = () => {
        props.addTask(title);
        setTitle('');
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
    }
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && e.ctrlKey) {
            onClickHandler();
        }
    }
    const tsarChangeFilter = (titleFilter: FilterValuesType) => {
        props.changeFilter(titleFilter);
    }

    const mappedTasks = props.tasks.map(t => {

            const RemoveTaskHandler = () => {
                props.removeTask(t.id);
            }
            return (
                <li key={t.id}>
                    <input type="checkbox" checked={t.isDone}/>
                    <span>{t.title}</span>
                    <Button name={'x'} callback={RemoveTaskHandler}/>
                </li>
            )
        }
    )

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={title} onChange={onChangeHandler} onKeyDown={onKeyDownHandler}/>
            <Button name={'+'} callback={onClickHandler}/>
        </div>
        <ul>
            {mappedTasks}
        </ul>
        <div>
            <Button name={'All'} callback={() => {
                tsarChangeFilter('all')
            }}/>
            <Button name={'Active'} callback={() => {
                tsarChangeFilter('active')
            }}/>
            <Button name={'Completed'} callback={() => {
                tsarChangeFilter('completed')
            }}/>
        </div>
    </div>
}
