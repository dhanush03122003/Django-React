import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Get_one.css';

function GetTaskById() {
    const { id } = useParams();
    const [task, setTask] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const getTask = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/task/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    setTask(data); // Update state with fetched task data
                } else {
                    const errorData = await response.json(); // Parse JSON response for error message
                    alert(`Error: ${errorData.error}`); // Display error message in alert
                    navigate('/'); // Redirect to tasks or task list page
                }
            } catch (error) 
            {
                console.error('Error:', error);
                alert('Failed to fetch task'); // Display generic error message
                navigate('/'); // Redirect to tasks or task list page on error
            }
        };

        getTask(); // Call function to fetch task data

    }, [id, navigate]);

    // Render task details regardless of whether task is fetched or not
    return (
        <div className="task-detail">
            <h1>Task Detail</h1>
            {task && (
                <div className="task-item">
                    <div className="task-heading">
                        <h2>Task Name</h2>
                        <p>{task.name}</p>
                    </div>
                    <div className="task-heading">
                        <h2>Description</h2>
                        <p>{task.description}</p>
                    </div>
                    <div className="task-heading">
                        <h2>Date</h2>
                        <p>{new Date(task.date).toLocaleDateString()}</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default GetTaskById;
