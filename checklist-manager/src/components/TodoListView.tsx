import React, { FC, useEffect, useState } from 'react';
import TodoListTask from './TodoListTask';
import ItemAdder from './ItemAdder';
import { TaskData } from '../interfaces/TaskData';

interface TodoListViewProps {
    listIndex: number;
    listName: string;
}


const TodoListView: FC<TodoListViewProps> = ({ listIndex, listName }) => {
    const [tasks, setTasks] = useState<TaskData[]>([]);
    const localStorageKeyForTasks = 'tasks' + listIndex.toString();

    // read tasks
    useEffect(() => {
        const readTasks = localStorage.getItem(localStorageKeyForTasks);
        if (readTasks) {
            const parsedArray = JSON.parse(readTasks);
            if (Array.isArray(parsedArray) && parsedArray.length > 0) {
                setTasks(parsedArray);
            }
        }
    }, [localStorageKeyForTasks]);

    // save tasks
    useEffect(() => {
        const value = JSON.stringify(tasks);
        if (value) {
            localStorage.setItem(localStorageKeyForTasks, value);
        }
    }, [tasks, localStorageKeyForTasks]);

    const addTask = (newTaskName: string) => {
        const newTask: TaskData = {
            name: newTaskName,
            isCompleted: false,
        };
        setTasks([...tasks, newTask]);
    };

    const deleteTask = (index: number) => {
        setTasks((prevList) => {
            const updatedList = prevList.filter((_, i) => i !== index);
            return updatedList;
        });
    };

    const setTaskCompletedState = (index: number, isCompleted: boolean) => {
        const updatedTasks = [...tasks];
        updatedTasks[index].isCompleted = isCompleted;
        setTasks(updatedTasks);
    };

    return (
        <div>
            <h2>{listName}</h2>

            {tasks.map((taskData, index) => (
                <TodoListTask data={taskData} index={index} onClickedCallback={setTaskCompletedState} onDeleteCallback={deleteTask} key={index} />
            ))}

            <ItemAdder placeholderText='New Task Name' onAddItemCallback={addTask} />
        </div>
    );
}

export default TodoListView;
