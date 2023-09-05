import React, { FC, useEffect, useState } from 'react';
import TodoListTask from './TodoListTask';

interface TodoListViewProps {
    listIndex: number;
    listName: string;
}

interface TaskData {
    name: string;
    isCompleted: boolean;
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
    }, [tasks]);

    return (
        <div>
            <h2>{listName}</h2>

            {tasks.map((taskData, index) => (
                <TodoListTask name={taskData.name} key={index} />
            ))}
            
        </div>
    );
}

export default TodoListView;
