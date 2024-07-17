import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Update.css'; // Import your CSS file

function UpdateTask() {
    const { id } = useParams(); // Extract task ID from URL params
    const navigate = useNavigate();

    const [task, setTask] = useState({
        name: '',
        description: '',
    });

    useEffect(() => {
        // Fetch task data based on ID when component mounts
        const fetchTask = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/task/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    setTask({
                        name: data.name,
                        description: data.description,
                    });
                } else {
                    const data = await response.json(); // Parse JSON response for error message
                    alert(`Error: ${data.error}`);
                    navigate('/tasks'); // Redirect to tasks on error
                    console.error('Failed to fetch task data');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchTask();
    }, [id, navigate]);

    const handleChange = (e) => {
        // Update task state based on form input changes
        const { name, value } = e.target;
        setTask(prevTask => ({
            ...prevTask,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:8000/api/task/update/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(task),
            });
            if (response.ok) {
                alert('Task updated successfully');
                navigate('/tasks'); // Redirect to tasks or task list page
            } else {
                const data = await response.json();
                alert(`Error: ${data.error}`);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to update task');
        }
    };

    return (
        <div className="update-task-container">
            <h1>Update Task</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={task.name}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        name="description"
                        value={task.description}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Update Task</button>
            </form>
        </div>
    );
}

export default UpdateTask;
