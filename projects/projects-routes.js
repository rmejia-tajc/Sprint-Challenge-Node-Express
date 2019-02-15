// import the express package
const express = require('express');

const ProjectsDb = require('./projectModel.js');

const router = express.Router(); // notice the Uppercase "R" in Router

// custom middleware
const nameDescriptionCompletedCheck = (req, res, next) => {
    if (!req.body.name || !req.body.description || !req.body.completed) {
        res.status(400).json({ errorMessage: "Please provide a name, description, and whether completed for the project." });
      } else {
        next();
      }
};


// GET
router.get('/', async (req, res) => {
    try {
        const projects = await ProjectsDb.get();
        res.status(200).json(projects);
    } catch (error) {
        // log error to database
        console.log(error);
        res.status(500).json({ error: "The projects information could not be retrieved." });
    }
});

// GET by id
router.get('/:id', async (req, res) => {
    try {

        const project = await ProjectsDb.get(req.params.id);

        if (project) {
            res.status(200).json(project);
        } else {
            res.status(404).json({ message: "The project with the specified ID does not exist." });
        }
    } catch (error) {
        // log error to database
        console.log(error);
        res.status(500).json({ error: "The project information could not be retrieved." });
    } 
});

// GET project actions by id
router.get('/:id/actions', async (req, res) => {
    try {

        const project = await ProjectsDb.getProjectActions(req.params.id);

        if (project.length > 0) {
            res.status(200).json(project);
        } else {
            res.status(404).json({ message: "The project with the specified ID does not exist." });
        }
    } catch (error) {
        // log error to database
        console.log(error);
        res.status(500).json({ error: "The project information could not be retrieved." });
    } 
});

// POST
router.post('/', nameDescriptionCompletedCheck, async (req, res) => {
    
    try {
        const project = await ProjectsDb.insert(req.body);
        res.status(201).json(project);
    } catch (error) {
        //log error to database
        console.log(error);
        res.status(500).json({ error: "There was an error while saving the project to the database" });
    }    
        
});

// PUT
router.put('/:id', nameDescriptionCompletedCheck, async (req, res) => {
     
    try {
        const project = await ProjectsDb.update(req.params.id, req.body);

        if (project) {
            res.status(200).json(project);
        } else {
            res.status(404).json({ message: "The project with the specified ID does not exist." });
        }
    } catch (error) {
        // log error to database
        console.log(error);
        res.status(500).json({ error: "The project information could not be modified." });
    }
    
});

//DELETE
router.delete('/:id', async (req, res) => {
    try {
        const count = await ProjectsDb.remove(req.params.id);

        if (count > 0) {
            res.status(204).end();
        } else {
            res.status(404).json({ message: "The project with the specified ID does not exist." });
        }
    } catch (error) {
        // log error to database
        console.log(error);
        res.status(500).json({ error: "The project could not be removed. Please check that the project's post(s) have been removed first." });
    }
});


module.exports = router; //notice the "s" in exports