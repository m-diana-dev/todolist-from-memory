import React, {useState} from 'react';
import './App.css';
import {v1} from "uuid";
import {TodoList} from "./TodoList";


export type TodoListType = {
    id: string
    title: string
    filter: FilterType
}
export type TaskStateType = {
    [todoListId: string]: TaskType[]
}
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type FilterType = 'all' | 'active' | 'completed'

function App() {
    const todoListId1 = v1();
    const todoListId2 = v1();

    const [todoLists, setTodoLists] = useState<TodoListType[]>([
        {id: todoListId1, title: 'What to learn', filter: 'all'},
        {id: todoListId2, title: 'What to bye', filter: 'all'}
    ])
    const [tasks, setTasks] = useState<TaskStateType>({
            [todoListId1]: [
                {id: v1(), title: 'HTML&CSS', isDone: true},
                {id: v1(), title: 'JS', isDone: true},
                {id: v1(), title: 'React', isDone: false},
                {id: v1(), title: 'React', isDone: false},
                {id: v1(), title: 'React', isDone: false},
                {id: v1(), title: 'React', isDone: false},
            ],
            [todoListId2]: [
                {id: v1(), title: 'Orange', isDone: true},
                {id: v1(), title: 'Apple', isDone: true},
                {id: v1(), title: 'Bread', isDone: false},
            ]
        }
    )
    // const [filter, setFilter] = useState<FilterType>('all')

    const deleteTask = (idTask: string, idTodo: string) => {
        setTasks({...tasks, [idTodo]: tasks[idTodo].filter(el => el.id !== idTask)})
    }

    const addTask = (title: string, idTodo: string) => {
        setTasks({...tasks, [idTodo]: [{id: v1(), title: title, isDone: true}, ...tasks[idTodo]]})
    }
    const CheckTask = (idTask: string, isDone: boolean, idTodo: string) => {
        setTasks({...tasks, [idTodo]: tasks[idTodo].map(el => (el.id === idTask) ? {...el, isDone: isDone} : el)})
    }

    const changeTodoListFilter = (value: FilterType, idTodo: string) => {
        setTodoLists(todoLists.map(el => (el.id === idTodo) ? {...el, filter: value} : el))
    }
    const deleteTodoList = (idTodo: string) => {
        setTodoLists(todoLists.filter(el=>el.id!==idTodo));
    }


    const TodoListsComponents = todoLists.map(el => {
        const filterTasks = () => {
            switch (el.filter) {
                case 'active':
                    return tasks[el.id].filter(el => !el.isDone)
                case 'completed':
                    return tasks[el.id].filter(el => el.isDone)
                default:
                    return tasks[el.id];
            }
        }
        return (
            <TodoList
                key={el.id}
                tasks={filterTasks()}
                id={el.id}
                title={el.title}
                filter={el.filter}

                // setFilter={setFilter}
                changeTodoListFilter={changeTodoListFilter}
                deleteTodoList={deleteTodoList}

                deleteTask={deleteTask}
                addTask={addTask}
                CheckTask={CheckTask}/>
        )
    });

    return (
        <div className="App">
            {TodoListsComponents}
        </div>
    );
}

export default App;
