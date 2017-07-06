//@flow
import React from 'react';
import moment from 'moment';

import type { Task } from '../flow/types';

type Props = {
    tasks: Array<Task>,
    onEditTaskButtonClick: (id: string) => void,
    removeTask: (id: string) => void
}

const List = ({ tasks, onEditTaskButtonClick, removeTask } : Props) => {
    const renderTasks = () => {
        return tasks.map(task => {
            const { description, createdAt, done, _id } = task;
            return (
                <tr key={_id}>
                    <td>
                        {
                            done ? <strike style={{color: 'green'}}>{description}</strike>
                                : <span>{description}</span>
                        }
                    </td>
                    <td>{moment(createdAt).format('DD/MM/YYYY')} </td>
                    <td>
                        <i 
                            className="glyphicon glyphicon-edit" 
                            style={{fontSize:20, cursor: 'pointer'}} 
                            onClick={() => onEditTaskButtonClick(_id)}
                        >
                        </i>
                    </td>
                    <td> 
                        <i 
                            className="glyphicon glyphicon-remove" 
                            style={{fontSize:20, cursor: 'pointer'}} 
                            onClick={() => removeTask(_id)}
                        >
                        </i>
                    </td>
                </tr>
            )
        })
    }
    return (
        <div className="table-responsive">
            <table className="table">
                <thead>
                    <tr>
                        <th>Task </th>
                        <th>Data de Criacao</th>
                        <th>Editar </th>
                        <th>Excluir </th>
                    </tr>
                </thead>
                <tbody>
                    {renderTasks()}
                </tbody>
            </table>
          </div>
    )
}

export default List;