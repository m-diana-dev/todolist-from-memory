import React from 'react';
import './App.css';
import {TodoList} from "./TodoList";

function App() {
    const tasks1 = [
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ReactJS", isDone: false},
        {id: 4, title: "ReactJS2", isDone: false}
    ]
    const tasks2 = [
        {id: 1, title: "Hello world", isDone: true},
        {id: 2, title: "I am Happy", isDone: false},
        {id: 3, title: "Yo", isDone: false}
    ]
    const title1 = 'Title 1';
    const title2 = 'Title 2';

    return (
        <>
            <TodoList tasks={tasks1} title={title1}/>
            <TodoList tasks={tasks2} title={title2}/>
        </>
)
    ;
}

export default App;
