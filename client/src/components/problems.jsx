import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Problems = () => {
    const [problems, setProblems] = useState([]);
    const [problem, setProblem] = useState({
        name: '',
        description: '',
        sampleInput: '',
        sampleOutput: '',
        constraints: ''
    });
    const [editingName, setEditingName] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchProblems();
    }, []);

    const fetchProblems = async () => {
        try {
            const response = await axios.get('http://localhost:5000/problems');
            setProblems(response.data);
        } catch (error) {
            console.log('Error fetching the problems:', error);
        }
    };

    const handleChange = (e) => {
        setProblem({ ...problem, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingName) {
                await axios.put(`http://localhost:5000/problems/${editingName}`, problem);
            } else {
                await axios.post('http://localhost:5000/problems', problem);
            }
            fetchProblems();
            setProblem({ name: '', description: '', sampleInput: '', sampleOutput: '', constraints: '' });
            setEditingName(null);
        } catch (error) {
            console.log('Error submitting the problem:', error);
        }
    };

    const handleEdit = (problem) => {
        setProblem(problem);
        setEditingName(problem.name);
    };

    const handleDelete = async (name) => {
        try {
            await axios.delete(`http://localhost:5000/problems/${name}`);
            fetchProblems();
        } catch (error) {
            console.error('Error deleting problem:', error);
        }
    };
    const handleNavigateToDashboard = () => {
        navigate('/dashboard'); // Adjust the path if your dashboard route is different
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4">
        <button
                onClick={handleNavigateToDashboard}
                className="absolute top-4 right-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
                Go to Dashboard
            </button>
            <h1 className="text-2xl mb-4">Manage Problems</h1>
            <form onSubmit={handleSubmit} className="mb-4">
                <div className="mb-4">
                    <label className="block text-gray-700">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={problem.name}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Description</label>
                    <textarea
                        name="description"
                        value={problem.description}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    ></textarea>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Sample Input</label>
                    <textarea
                        name="sampleInput"
                        value={problem.sampleInput}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    ></textarea>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Sample Output</label>
                    <textarea
                        name="sampleOutput"
                        value={problem.sampleOutput}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    ></textarea>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Constraints</label>
                    <textarea
                        name="constraints"
                        value={problem.constraints}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    ></textarea>
                </div>
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    {editingName ? 'Update Problem' : 'Add Problem'}
                </button>
            </form>
            <div className="bg-white p-4 rounded shadow-md">
                <h2 className="text-xl mb-4">Problem List</h2>
                <ul>
                    {problems.map((prob) => (
                        <li key={prob._id} className="mb-2 flex justify-between items-center">
                            <span>{prob.name}</span>
                            <div>
                                <button onClick={() => handleEdit(prob)} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mr-2">
                                    Edit
                                </button>
                                <button onClick={() => handleDelete(prob.name)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Problems;
