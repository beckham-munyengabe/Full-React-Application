import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Dashboard() {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        axios.get("http://localhost:5000/users")
            .then((res) => {
                setUsers(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
  
    // Delete user function
    const DeleteUser = (id) => {
        const readToDelete = window.confirm("Are you sure you want to delete this user?");
        if (readToDelete) {
            axios.delete(`http://localhost:5000/delete/${id}`)
            .then(() => {
                console.log("User deleted successfully");
                navigate(0);
                
            });
        }       
    }

    return (
        <div className="p-6">
            <div className="overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                        <tr>
                            <th className="px-6 py-3">Name</th>
                            <th className="px-6 py-3">Age</th>
                            <th className="px-6 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    {users.map((u,index)=>{
                        return (
                            <tr key={index}>
                                <td className="px-6 py-4">{u.name}</td>
                                <td className="px-6 py-4">{u.age}</td>
                                <td>
                                    <button onClick={() => DeleteUser(u.id)}>Delete</button>
                                    <Link to={`/update/${u.id}`}>Update</Link> 
                                </td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Dashboard;