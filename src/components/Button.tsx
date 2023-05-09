import React from 'react';

type ButtonPropsType = {
    name: string
    callback: ()=>void
}

export const Button = (props:ButtonPropsType) => {

    const onclickHandler =()=>{
        props.callback();
    }

    return (
        <button onClick={onclickHandler}>{props.name}</button>
    );
};
