import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterType, TaskType} from "./App";
import {Button} from "./components/Button";
import './App.css';

type TodoListPropsType = {
    id: string
    title: string
    filter: FilterType
    tasks: TaskType[]

    // setFilter: (filter: FilterType) => void
    changeTodoListFilter: (value: FilterType, idTodo: string) => void
    deleteTodoList: (idTodo: string) => void

    deleteTask: (idTask: string, idTodo: string) => void
    addTask: (title: string, idTodo: string) => void
    CheckTask: (idTask: string, isDone: boolean, idTodo: string) => void
}
export const TodoList: React.FC<TodoListPropsType> = ({
                                                          id,
                                                          title,
                                                          filter,
                                                          tasks,
                                                          // setFilter,
                                                          changeTodoListFilter,
                                                          deleteTodoList,
                                                          deleteTask,
                                                          addTask,
                                                          CheckTask,
                                                          ...restProps
                                                      }) => {
    const [inputTitle, setInputTitle] = useState('');
    const [error, setError] = useState('');
    const [btnName, setBtnName] = useState<FilterType>('all');

    const onClickDeleteHandler = (idTask: string, idTodo: string) => {
        deleteTask(idTask, idTodo);
    }
    const onClickFilterHandler = (filter: FilterType) => {
        // setFilter(filter);
        changeTodoListFilter(filter, id)
        setBtnName(filter);
    }

    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setInputTitle(e.currentTarget.value);
        setError('')
    }
    const onCLickInputHandler = (idTodo: string) => {
        if (inputTitle.trim()) {
            addTask(inputTitle.trim(), idTodo);
            setInputTitle('')
        } else {
            setError('Error!!!!')
        }
    }
    const onKeyDownInputHandler = (e: KeyboardEvent<HTMLInputElement>, idTodo: string) => {
        if (e.key === 'Enter') {
            onCLickInputHandler(idTodo);
        }
    }
    const onChangeCheckHandler = (idTask: string, e: boolean, idTodo: string) => {
        CheckTask(idTask, e, idTodo);
    }

    const errorStyle = (error) ? 'error' : undefined
    return (
        <div>
            <h3>{title}</h3>
            <button onClick={()=>deleteTodoList(id)}>x</button>
            <div>
                <input className={errorStyle} value={inputTitle} onChange={onChangeInputHandler}
                       onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => onKeyDownInputHandler(e, id)}/>
                <Button className={errorStyle} name={'+'} callback={() => onCLickInputHandler(id)}/>
            </div>
            {error && <div className='error-message'>{error}</div>}
            <ul>
                {tasks.map(el => {
                        const taskStyle = (el.isDone) ? 'is-done' : undefined
                        return (
                            <li className={taskStyle} key={el.id}>
                                <Button name={'delete'} callback={() => onClickDeleteHandler(el.id, id)}/>
                                <input
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => onChangeCheckHandler(el.id, e.currentTarget.checked, id)}
                                    type="checkbox" checked={el.isDone}/>
                                <span>{el.title}</span>
                            </li>
                        )
                    }
                )}
            </ul>
            <div>
                <Button className={(btnName === 'all') ? 'active-filter' : undefined} name={'All'}
                        callback={() => onClickFilterHandler('all')}/>
                <Button className={(btnName === 'active') ? 'active-filter' : undefined} name={'Active'}
                        callback={() => onClickFilterHandler('active')}/>
                <Button className={(btnName === 'completed') ? 'active-filter' : undefined} name={'Completed'}
                        callback={() => onClickFilterHandler('completed')}/>
            </div>
        </div>
    );
};
