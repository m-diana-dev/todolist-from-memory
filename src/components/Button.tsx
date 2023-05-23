import React from 'react';

type ButtonPropsType = {
    name: string
    callback: ()=>void
    className?: string
}

export const Button: React.FC<ButtonPropsType> = ({name, callback, ...restProps}) => {
    const onclickHandler = () => {
        callback();
    }
    return (
        <button className={restProps.className} onClick={onclickHandler}>{name}</button>
    );
};
