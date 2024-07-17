// Home.js
import React from 'react';
import './Home.css'; // Optional: for styling the home component

function Home() {
    return (
        <div className="home-container">
            <h1>Welcome to the Task Management App</h1>
            <nav>
                <ul>
                    <li>
                        <a href="/task/create" target="_blank" rel="noopener noreferrer">Create Task</a>
                    </li>
                    <li>
                        <a href="/tasks" target="_blank" rel="noopener noreferrer">View All Tasks</a>
                    </li>
                    <li>
                        <a href="/task/1" target="_blank" rel="noopener noreferrer">View Task by ID (Example: ID=1)</a>
                    </li>
                    <li>
                        <a href="/task/update/1" target="_blank" rel="noopener noreferrer">Update Task (Example: ID=1)</a>
                    </li>
                    <li>
                        <a href="/task/delete/1" target="_blank" rel="noopener noreferrer">Delete Task (Example: ID=1)</a>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default Home;
