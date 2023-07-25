import React, {ChangeEvent, useState} from 'react';


type EditableSpanPropsType = {
    title: string
    changeTitle: (title: string)=>void
}
export const EditableSpan: React.FC<EditableSpanPropsType> = (props) => {
    const {title, changeTitle} = props
    const [editMode, setEditMode] = useState(false)
    const [titleInput, setTitleInput] = useState(title)

    const onBlurHandler = () => {
        setEditMode(false)
        changeTitle(titleInput)
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitleInput(e.currentTarget.value)
    }
    return (
        <div>
            {editMode
                ? <input onBlur={onBlurHandler} value={titleInput} onChange={onChangeHandler}/>
                : <span onDoubleClick={() => setEditMode(true)}>{title}</span>
            }
        </div>
    );
};
