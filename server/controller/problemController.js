const express = require('express');
const Problem = require('../models/problem');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

// Get all problems
router.get('/', async (req, res) => {
    try {
        const problems = await Problem.find();
        res.json(problems);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get a single problem by name
router.get('/:name', async (req, res) => {
    try {
        const problem = await Problem.findOne({ name: req.params.name });
        if (!problem) {
            return res.status(404).json({ message: 'Problem not found' });
        }
        res.json(problem);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Add a new problem
router.post('/', async (req, res) => {
    console.log(req.body);
    try {
        const { name, description, sampleInput, sampleOutput, constraints } = req.body;
        
        const existingProblem = await Problem.findOne({ name });
        if (existingProblem) {
            return res.status(400).json({ message: 'Problem with this name already exists' });
        }

        const newProblem = new Problem({
            problemId: uuidv4(),
            name,
            description,
            sampleInput,
            sampleOutput,
            constraints
        });

        await newProblem.save();

        res.status(201).json({ message: 'Problem created successfully' });
    } catch (error) {
        console.log(error.stack);
        res.status(500).json({ message: 'Server error' });
    }
});

// Update a problem by name
router.put('/:name', async (req, res) => {
    try {
        const { name, description, sampleInput, sampleOutput, constraints } = req.body;

        const updatedProblem = await Problem.findOneAndUpdate(
            { name: req.params.name },
            { name, description, sampleInput, sampleOutput, constraints },
            { new: true }
        );

        if (!updatedProblem) {
            return res.status(404).json({ message: 'Problem not found' });
        }
        res.status(201).json({ message: 'Problem updated successfully', problem: updatedProblem });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Delete a problem by name
router.delete('/:name', async (req, res) => {
    try {
        const deletedProblem = await Problem.findOneAndDelete({ name: req.params.name });

        if (!deletedProblem) {
            return res.status(404).json({ message: 'Problem not found' });
        }
        res.json({ message: 'Problem deleted successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
