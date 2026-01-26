import React from "react";
import { useState, useEffect } from "react"; 
import { useNavigate, useParams } from "react-router-dom";   
import axios from "axios";  

export default function Update(){
    const id = useParams()
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:5000/users/${id}`)
            .then((res) => {
                setUsers(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, 
    );
    const user = users[0]
    const [name, setName] = useState( user.name);
    const [age, setAge] = useState(user.age);
    const HandleUpdate = (e) => {
        e.preventDefault();
        axios.Update(`http://localhost:5000/update-user/${id}`, {
            name,age
}).then(() => {
            alert("User Updated");
            navigate("/dashboard");
        }).catch((err) => {
            console.log(err);
        })
    }

return(
    <>
    <form onSubmit={HandleUpdate}>
        Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)}/><br/>
        Age:
        <input type="number" value={age} onChange={(e) => setAge(e.target.value)}/><br/>
        <button type="submit">Update</button>
    </form>
    </>
) 

}