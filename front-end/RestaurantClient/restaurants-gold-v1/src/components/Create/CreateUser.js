import React, { useState, useEffect } from 'react';
import UserServices from '../services/UserServices';
import { useNavigate, useParams } from 'react-router-dom';

function CreateUserComponent() {
    const { id } = useParams();
    const [username, setUsername] = useState('');
    const [adress, setAdress] = useState('');
    const [email, setEmail] = useState('');
    const [password,setPassword]=useState('');
    const navigate = useNavigate();

    useEffect(() => {
        
            UserServices.getUserById(id).then((res) => {
                let user = res.data;
                setUsername(user.username);
                setAdress(user.adress);
                setEmail(user.email);
                setPassword(user.password)
            });
        
    }, [id]);

    const saveOrUpdateUser = (e) => {
        e.preventDefault();
        const user = { username, adress, email,password };

         {
            UserServices.updateUser(user, id).then(() => {
                navigate('/admin');
            });
        }
    }

    const cancel = () => {
        navigate('/admin');
    }

    const getTitle = () => {
        return <h3 className="text-center">Update User</h3>;
    }

    return (
        <div>
            <br />
            <div className="container">
                <div className="row">
                    <div className="card col-md-6 offset-md-3 offset-md-3">
                        {getTitle()}
                        <div className="card-body">
                            <form>
                                <div className="form-group">
                                    <label> Username: </label>
                                    <input
                                        placeholder="Username"
                                        name="username"
                                        className="form-control"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label> Address: </label>
                                    <input
                                        placeholder="Address"
                                        name="address"
                                        className="form-control"
                                        value={adress}
                                        onChange={(e) => setAdress(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label> Email: </label>
                                    <input
                                        placeholder="Email"
                                        name="email"
                                        className="form-control"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <button className="btn btn-success" onClick={saveOrUpdateUser}>
                                    Save
                                </button>
                                <button
                                    className="btn btn-danger"
                                    onClick={cancel}
                                    style={{ marginLeft: '10px' }}
                                >
                                    Cancel
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateUserComponent;