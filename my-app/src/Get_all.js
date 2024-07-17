import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import './Get_all.css';

function TaskList() {
    const [tasks, setTasks] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/tasks/');
                if (response.ok) 
                {
                    const data = await response.json();
                    setTasks(data);
                }
                else
                {
                    const errorData = await response.json(); // Parse JSON response for error message
                    alert(`Error: ${errorData.error}`); // Display error message in alert
                    navigate('/'); // Redirect to tasks or task list page
                }

            } catch (error) {
                console.error('Error:', error);
                alert('Failed to fetch tasks'); // Display generic error message
                navigate('/'); // Redirect to home or error page
            }
        };

        fetchTasks();
    }, [navigate]);

    return (
        <div className="task-list">
            <h1>Task List</h1>
            <ul>
                {tasks.map(task => (
                    <li key={task.id}>
                        <div className="task-item">
                            <div className="task-heading">
                                <h2>Task Id</h2>
                                <p>{task.id}</p>
                            </div>
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
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TaskList;
