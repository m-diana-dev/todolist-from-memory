import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button} from "./Button";


type AddItemFormPropsType = {
    addTitle: (title: string) => void
}
export const AddItemForm = (props: AddItemFormPropsType) => {
    const [inputTitle, setInputTitle] = useState('');
    const [error, setError] = useState('');
    const OnChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setInputTitle(e.currentTarget.value);
        setError('');
    }

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter'){
            OnAddTitleHandler();
        }
    }
    const OnAddTitleHandler = () => {
        if (inputTitle.trim() !== '') {
            props.addTitle(inputTitle.trim())
            setInputTitle('');
        } else {
            setError('Error');
        }
    }
    return (
        <div>
            <input className={error ? 'error' : undefined} type="text" onChange={OnChangeInputHandler} onKeyDown={onKeyDownHandler}
                   value={inputTitle}/>
            <Button name={'+'} callback={OnAddTitleHandler}/>
            {error && <div className='errorMessage'>{error}</div>}
        </div>
    );
};
