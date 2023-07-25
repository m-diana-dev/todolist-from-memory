import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {Button} from "../Button/Button";


type AddComponentPropsType = {
    addNewItem: (title: string) => void
}
export const AddComponent: React.FC<AddComponentPropsType> = (props) => {
    const {addNewItem} = props
    const [title, setTitle] = useState('')
    const [error, setError] = useState('')
    const addItemHandler = () => {
        if (title.trim()) {
            addNewItem(title.trim())
            setTitle('')
        } else {
            setError('Error!')
        }
    }
    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError('')
    }
    const onKeyUpTitleHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if(e.key==='Enter'){
            addItemHandler()
        }
    }

    const inputStyle = error ? 'errorInput' : undefined
    return (
        <div>
            <input type="text" value={title} onChange={onChangeTitleHandler} onKeyUp={onKeyUpTitleHandler} className={inputStyle}/>
            <Button name={"+"} callback={addItemHandler}/>
            {error && <div className={'errorText'}>{error}</div>}
        </div>
    );
};
