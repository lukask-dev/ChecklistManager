import React, { FC, useEffect, useState } from 'react';
import { TaskData } from '../interfaces/TaskData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'

interface TodoListTaskProps {
    data: TaskData;
    index: number;
    onClickedCallback: (index: number, isCompleted: boolean) => void;
    onDeleteCallback: (index: number) => void;
}

const TodoListTask: FC<TodoListTaskProps> = ({ data, index, onClickedCallback, onDeleteCallback }) => {

    const [isCompleted, setIsCompleted] = useState<boolean>(data.isCompleted);

    useEffect(() => {
        setIsCompleted(data.isCompleted);
    }, [data]);

    const onTaskClicked = () => {
        const newCompletedStatus = !isCompleted;
        setIsCompleted(newCompletedStatus);
        onClickedCallback(index, newCompletedStatus);
    }

    return (
        <div className='ListItemRow'>
            <button title={isCompleted ? 'Mark not completed' : 'Mark completed'}
                className={isCompleted ? 'ListItemClickable CompletedTask' : 'ListItemClickable NotCompletedTask'}
                onClick={() => onTaskClicked()}>
                <span className='ListItemContent'>
                    <FontAwesomeIcon icon={icon({ name: 'circle' })} size='2xs' />{'  '}
                    {data.name}
                </span>
                {isCompleted && (
                    <span className='ListItemCheckmark'><FontAwesomeIcon icon={icon({ name: 'check' })} style={{ marginRight: '.3rem' }} size='xl' /></span>
                )}
            </button>
            <button title='Delete Task' className='ListItemDeleteButton' onClick={() => onDeleteCallback(index)}>
                <FontAwesomeIcon icon={icon({ name: 'xmark' })} />
            </button>
        </div>
    );
}

export default TodoListTask;