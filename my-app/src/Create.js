import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';


import './Create.css';
function Create_task() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newTask = {
            name: name,
            description: description,
        };

        try {
            const response = await fetch('http://localhost:8000/api/task/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newTask)
            });

            if (!response.ok) 
            {
                const errorData = await response.json();
                alert(`Failed to create task: ${errorData.error}`);
                navigate('/'); 
            }

            const data = await response.json();
            console.log('Task created:', data);
            setName('');
            setDescription('');
            navigate('/tasks'); // Redirect to home or task list page
        } catch (error) 
        {
            console.error('Error:', error);
            alert(`Failed to create task: ${error}`);
            navigate('/'); 
        }
    };

    return (
        <div className="task-list">
            <h1>Task List</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Task Name:</label>
                    <input 
                        type="text" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                    />
                </div>
                <div>
                    <label>Description:</label>
                    <input 
                        type="text" 
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)} 
                    />
                </div>
                <button type="submit">Create Task</button>
            </form>
        </div>
    );
}

export default Create_task;
