import React, {useState} from 'react';
import './App.css';
import {v1} from "uuid";
import {TodoList} from "./TodoList";

export type FilterType = 'all' | 'active' | 'completed';

export type TodoListsType = {
    id: string
    title: string
    filter: FilterType
}
export type TasksType = {
    [id: string]: TaskType[]
}
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

function App() {
    const tidoListId1 = v1();
    const tidoListId2 = v1();
    const [todoLists, setTodoLists] = useState<TodoListsType[]>(
        [
            {id: tidoListId1, title: 'What to learn', filter: 'all'},
            {id: tidoListId2, title: 'What to buy', filter: 'all'},
        ]
    );
    const [tasks, setTasks] = useState<TasksType>({
            [tidoListId1]: [
                {id: v1(), title: "HTML&CSS", isDone: true},
                {id: v1(), title: "JS", isDone: true},
                {id: v1(), title: "ReactJS", isDone: false},
                {id: v1(), title: "ReactJS2", isDone: false},
            ],
            [tidoListId2]: [
                {id: v1(), title: "Milk", isDone: true},
                {id: v1(), title: "Water", isDone: true},
            ]
        }
    );

    const DeleteTodoList = (idTodoList: string) => {
        setTodoLists(todoLists.filter(el => el.id !== idTodoList));
        delete tasks[idTodoList];
    }
    const DeleteTask = (idTodoList: string, idTask: string) => {
        setTasks({...tasks, [idTodoList]: tasks[idTodoList].filter(el => el.id !== idTask)})
    }

    const ChangeFilter = (idTodoList: string, filter: FilterType) => {
        setTodoLists(todoLists.map(el => el.id === idTodoList ? {...el, filter} : el))
    }

    const addTask = (idTodoList: string, title: string) => {
        setTasks({...tasks, [idTodoList]: [{id: v1(), title, isDone: false}, ...tasks[idTodoList]]})
    }

    const ChangeTask = (idTodoList: string, idTask: string, isDone: boolean) => {
        setTasks({...tasks, [idTodoList]: tasks[idTodoList].map(el => el.id === idTask ? {...el, isDone} : el)})
    }


    const todoListComponent = todoLists.map(el => {
        const filteredTasks = () => {
            if (el.filter === 'active') return tasks[el.id].filter(el => !el.isDone)
            if (el.filter === 'completed') return tasks[el.id].filter(el => el.isDone)
            return tasks[el.id]
        }
        return (
            <TodoList key={el.id}
                      id={el.id}
                      title={el.title}
                      filter={el.filter}
                      tasks={filteredTasks()}
                      DeleteTodoList={DeleteTodoList}
                      DeleteTask={DeleteTask}
                      ChangeFilter={ChangeFilter}
                      addTask={addTask}
                      ChangeTask={ChangeTask}/>
        )
    })

    return (
        <div className="App">
            {todoListComponent}
        </div>
    );
}

export default App;
