import React, { FC, useEffect, useState } from 'react';
import TodoListTask from './TodoListTask';
import ItemAdder from './ItemAdder';
import { TaskData } from '../interfaces/TaskData';
import ProgressBar from './ProgressBar';
import { generateLocalStorageKeyForList as getLocalStorageKeyForListContent } from '../utils/utils';

interface TodoListViewProps {
    listIndex: number;
    listName: string;
}


const TodoListView: FC<TodoListViewProps> = ({ listIndex, listName }) => {
    const [tasks, setTasks] = useState<TaskData[]>([]);
    const [progressPercentage, setProgressPercentage] = useState<number>(0);

    // read tasks
    useEffect(() => {
        const readTasks = localStorage.getItem(getLocalStorageKeyForListContent(listIndex));
        if (readTasks) {
            const parsedArray = JSON.parse(readTasks);
            if (Array.isArray(parsedArray) && parsedArray.length > 0) {
                setTasks(parsedArray);
            }
        }
    }, [listIndex]);

    // save tasks
    useEffect(() => {
        const value = JSON.stringify(tasks);
        if (value) {
            localStorage.setItem(getLocalStorageKeyForListContent(listIndex), value);
        }
    }, [tasks, listIndex]);

    // update progress percentage
    useEffect(() => {
        const percentage = calculatePercentage(tasks);
        setProgressPercentage(percentage);
    }, [tasks]);

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

    const calculatePercentage = (tasks: TaskData[]): number => {
        if (tasks.length === 0) return 0;
        const completedTasks = tasks.filter((task) => task.isCompleted);
        return (completedTasks.length / tasks.length) * 100;
    };

    const resetProgress = () => {
        if (window.confirm('Reset all progress on this list?')) {
            const updatedTasks = tasks.map((task) => ({
                ...task,
                isCompleted: false,
            }));
            setTasks(updatedTasks);
        }
    };

    return (
        <div>
            <h2>{listName}</h2>

            {tasks.length > 0 && (
            <div className='ProgressOptionsContainer'>
                <div className='ProgressOptionsBar'><ProgressBar percentage={progressPercentage} label='Progress' /></div>
                <button
                    title='Reset all tasks to not completed'
                    className='ProgressOptionsResetButton'
                    onClick={() => resetProgress()}>Reset</button>
            </div>)}

            {tasks.map((taskData, index) => (
                <TodoListTask data={taskData} index={index} onClickedCallback={setTaskCompletedState} onDeleteCallback={deleteTask} key={index} />
            ))}

            <ItemAdder placeholderText='New Task Name' onAddItemCallback={addTask} />
        </div>
    );
}

export default TodoListView;
