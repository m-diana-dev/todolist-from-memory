import React from 'react';

type ButtonPropsType = {
    name: string
    callback: ()=>void
    className?: string
}
export const Button: React.FC<ButtonPropsType> = (props) => {
    const {name, callback, className} = props
    return (
        <button className={className} onClick={callback}>{name}</button>
    );
};
