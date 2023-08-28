import { FaTrash, FaEdit } from 'react-icons/fa';
import { Button, colors } from '@mui/material';
import { useState } from 'react';
import './dashboard.scss';

const Table = ({
    currentTable,
    setMainCheckbox,
    mainCheckbox,
    handleDelete,
    handleRowSelection,
    selectedRows,
    handleEdit,
    handleConfirmEdit,
}) => {
    const [editedUserValues, setEditedUserValues] = useState({});
    const handleUserEditing = (event) => {
        setEditedUserValues({
            ...editedUserValues,
            [event.target.name]: event.target.value,
        });
    };

    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>
                            <input type='checkbox'
                                className='my-checkbox'
                                checked={mainCheckbox}
                                onChange={() => {
                                    handleRowSelection(-1, !mainCheckbox);
                                    setMainCheckbox((prevMainCheckbox) => {
                                        return !prevMainCheckbox;
                                    })
                                }}
                            />
                        </th>
                        <th width="160">Name</th>
                        <th width="160">Email</th>
                        <th width="160">Role</th>
                        <th width="160">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentTable.map(user => {
                        return (
                            <tr 
                            data-testid = 'user-row'
                            key={user.id} 
                            style={{backgroundColor:selectedRows.includes(user.id) ? 'darkgrey':'#fafafa'}}
                            >
                                <td>
                                    <input type='checkbox'
                                        className='my-checkbox'
                                        checked={selectedRows.includes(user.id)}
                                        onChange={() => {
                                            handleRowSelection(user.id)
                                        }
                                        }
                                    />
                                </td>
                                {!user.isEdit && (
                                    <>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.role}</td>
                                        <td>
                                            <Button onClick={() => { handleEdit(user) }}>
                                                <FaEdit />
                                            </Button>
                                            <Button style={{color:'maroon'}} onClick={() => { handleDelete(user.id) }}>
                                                <FaTrash />
                                            </Button>
                                        </td>
                                    </>
                                )}

                                {user.isEdit && (
                                    <>
                                        <td>
                                            <input
                                                type="text"
                                                name="name"
                                                defaultValue={user.name}
                                                onChange={(e)=>handleUserEditing(e)}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="email"
                                                name="email"
                                                defaultValue={user.email}
                                                onChange={(e)=>handleUserEditing(e)}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                name="role"
                                                defaultValue={user.role}
                                                onChange={(e)=>handleUserEditing(e)}
                                            />
                                        </td>

                                        <td>
                                            <Button
                                            onClick={()=>handleConfirmEdit(user, editedUserValues)}
                                            >
                                                Confirm Edit
                                            </Button>

                                        </td>
                                    </>
                                )}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    )
}

export default Table;