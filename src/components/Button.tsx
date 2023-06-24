import React from 'react';

type BtnPropsType = {
    name: string
    callback: () => void
    className?: string
}
export const Button = (props: BtnPropsType) => {
    return (
        <button onClick={props.callback} className={props.className}>{props.name}</button>
    );
};
