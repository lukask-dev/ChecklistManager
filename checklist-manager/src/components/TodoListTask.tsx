import React, { FC } from 'react';

interface TodoListTaskProps {
    name: string;
}

const TodoListTask: FC<TodoListTaskProps> = ({ name }) => {
    return (
        <div>
            {name}
        </div>
    );
}

export default TodoListTask;