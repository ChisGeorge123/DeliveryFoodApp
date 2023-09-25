import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserServices from '../services/UserServices';

function ListUserComponent() {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    const deleteUser = (id) => {
        UserServices.deleteUser(id).then(res => {
            setUsers(users.filter(user => user.id !== id));
        });
    };

    const viewUser = (id) => {
        navigate(`/view-user/${id}`);
    };

    const editUser = (id) => {
        navigate(`/add-user/${id}`);
    };

    
    useEffect(() => {
        UserServices.getUsers().then(res => {
            if (res.data == null) {
                
            }
            setUsers(res.data);
        });
    }, []);

    return (
        <div>
            <h2 className="text-center">Users List</h2>
            <br />
            <div className="row" style={{textAlign:'center'}}>
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>User Address</th>
                            <th>User Email Id</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id}>
                                <td>{user.username}</td>
                                <td>{user.adress}</td>
                                <td>{user.email}</td>
                                <td>
                                    <button
                                        onClick={() => editUser(user.id)}
                                        className="btn btn-info"
                                    >
                                        Update
                                    </button>
                                    <button
                                        style={{ marginLeft: '10px' }}
                                        onClick={() => deleteUser(user.id)}
                                        className="btn btn-danger"
                                    >
                                        Delete
                                    </button>
                                    <button
                                        style={{ marginLeft: '10px' }}
                                        onClick={() => viewUser(user.id)}
                                        className="btn btn-info"
                                    >
                                        View
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ListUserComponent;