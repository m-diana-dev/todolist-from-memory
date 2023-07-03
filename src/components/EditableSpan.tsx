import React, {ChangeEvent, useState} from 'react';

type EditableSpanPropsType = {
    title: string
    onChange:(title: string)=>void
}
export const EditableSpan = (props: EditableSpanPropsType) => {
    const [modeInput, setModeInput] = useState(false);
    const [inputTitle, setInputTitle] = useState(props.title);
    const onDoubleClickHandler = () => {
        setModeInput(true);
    }
    const onBlurHandler = () => {
        setModeInput(false);
        props.onChange(inputTitle)
    }
    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setInputTitle(e.currentTarget.value)
    }
    return (
        modeInput
            ? <input autoFocus onBlur={onBlurHandler} value={inputTitle} onChange={onChangeHandler}/>
            : <span onDoubleClick={onDoubleClickHandler}>{props.title}</span>
    );
};
