import React, { FC, useState } from 'react';
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

    const onTaskClicked = () => {
        const newCompletedStatus = !isCompleted;
        setIsCompleted(newCompletedStatus);
        onClickedCallback(index, newCompletedStatus);
    }

    return (
        <div className='ListItemRow'>
            <button className={isCompleted ? 'ListItemClickable CompletedTask' : 'ListItemClickable NotCompletedTask'} onClick={() => onTaskClicked()}>
                <span className='ListItemContent'>{data.name}</span>
                {isCompleted && (
                    <span className='ListItemCheckmark'><FontAwesomeIcon icon={icon({ name: 'check' })} style={{ marginRight: '.3rem' }} size="2x" /></span>
                )}
            </button>
            <button className='ListItemDeleteButton' onClick={() => onDeleteCallback(index)}>
                <FontAwesomeIcon icon={icon({ name: 'xmark' })} />
            </button>
        </div>
    );
}

export default TodoListTask;