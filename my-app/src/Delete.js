// DeleteTaskById.jsx
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function DeleteTaskById() {
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const deleteTask = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/task/delete/${id}`, 
                    {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (response.ok) {
                    navigate('/tasks'); // Redirect to tasks or task list page
                } else {
                    const data = await response.json(); // Parse JSON response for error message
                    alert(`Error: ${data.error}`); // Display custom error message
                    navigate('/'); // Redirect to tasks or task list page even if deletion fails
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Failed to delete task'); // Generic error message
                navigate('/'); // Redirect to tasks or task list page even if deletion fails
            }
        };

        deleteTask();
    }, [id, navigate]);

    return null; // or you can return a loading indicator or message
}

export default DeleteTaskById;
