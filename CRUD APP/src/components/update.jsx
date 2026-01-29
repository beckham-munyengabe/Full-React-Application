import React from "react";
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";   
import axios from "axios";  

export default function Update(){
    // FIX 1: Destructure id so it's a string, not an object
    const { id } = useParams(); 
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    const [values, setValues] = useState({
        name: '',
        age: ''
    });

    useEffect(() => {
        axios.get(`http://localhost:5000/users/${id}`)
            .then((res) => {
                // To fill the inputs automatically, we set values
                setValues({
                    name: res.data.name || '',
                    age: res.data.age || ''
                });
                setUsers(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [id]); // Added [id] to prevent infinite loops

    const HandleUpdate = (e) => {
        e.preventDefault();
        // FIX 2: Send the 'values' state instead of an empty object
        axios.put(`http://localhost:5000/update-user/${id}`, values)
        .then(() => {
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
            {/* FIX 3: Wrapped spread operator in curly braces {} */}
            <input type="text" value={values.name || ''} onChange={(e) => setValues({...values, name : e.target.value})}/><br/>
            Age:
            {/* FIX 3: Wrapped spread operator in curly braces {} */}
            <input type="number" value={values.age || ''} onChange={(e) => setValues({...values, age:e.target.value})}/><br/>
            <button type="submit">Update</button>
        </form>
        </>
    ) 
}