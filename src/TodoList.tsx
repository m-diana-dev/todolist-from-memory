import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterType, TaskType} from "./App";
import {Button} from "./components/Button";
import './App.css';

type TodoListPropsType = {
    tasks: TaskType[]
    deleteTask: (id: string) => void
    setFilter: (filter: FilterType) => void
    addTask: (title: string) => void
    CheckTask: (id: string, isDone: boolean) => void
}
export const TodoList: React.FC<TodoListPropsType> = ({
                                                          tasks,
                                                          deleteTask,
                                                          setFilter,
                                                          addTask,
                                                          CheckTask,
                                                          ...restProps
                                                      }) => {
    const [inputTitle, setInputTitle] = useState('');
    const [error, setError] = useState('');
    const [btnName, setBtnName] = useState<FilterType>('all');

    const onClickDeleteHandler = (id: string) => {
        deleteTask(id);
    }
    const onClickFilterHandler = (filter: FilterType) => {
        setFilter(filter);
        setBtnName(filter);
    }

    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setInputTitle(e.currentTarget.value);
        setError('')
    }
    const onCLickInputHandler = () => {
        if (inputTitle.trim()) {
            addTask(inputTitle.trim());
            setInputTitle('')
        } else {
            setError('Error!!!!')
        }
    }
    const onKeyDownInputHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onCLickInputHandler();
        }
    }
    const onChangeCheckHandler = (id: string, e: boolean) => {
        CheckTask(id, e);
    }

    const errorStyle = (error) ? 'error' : undefined
    return (
        <div className="App">
            <div>
                <h3>What to learn</h3>
                <div>
                    <input className={errorStyle} value={inputTitle} onChange={onChangeInputHandler}
                           onKeyDown={onKeyDownInputHandler}/>
                    <Button className={errorStyle} name={'+'} callback={onCLickInputHandler}/>
                </div>
                {error && <div className='error-message'>{error}</div>}
                <ul>
                    {tasks.map(el => {
                            const taskStyle = (el.isDone) ? 'is-done' : undefined
                            return (
                                <li className={taskStyle} key={el.id}>
                                    <Button name={'delete'} callback={() => onClickDeleteHandler(el.id)}/>
                                    <input
                                        onChange={(e: ChangeEvent<HTMLInputElement>) => onChangeCheckHandler(el.id, e.currentTarget.checked)}
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
        </div>
    );
};
