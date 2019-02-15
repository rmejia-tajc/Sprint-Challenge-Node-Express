// import the express package
const express = require('express');

const ActionsDb = require('./actionModel.js');

const router = express.Router(); // notice the Uppercase "R" in Router


// custom middleware
const project_idDescriptionNotesCheck = (req, res, next) => {
    if (!req.body.project_id || !req.body.description || !req.body.notes) {
        res.status(400).json({ errorMessage: "Please provide a name, description, and whether completed for the project." });
      } else {
        next();
      }
};


// GET
router.get('/', async (req, res) => {
    try {
        const actions = await ActionsDb.get();
        res.status(200).json(actions);
    } catch (error) {
        // log error to database
        console.log(error);
        res.status(500).json({ error: "The actions information could not be retrieved." });
    }
});

// GET by id
router.get('/:id', async (req, res) => {
    try {

        const action = await ActionsDb.get(req.params.id);

        if (action) {
            res.status(200).json(action);
        } else {
            res.status(404).json({ message: "The action with the specified ID does not exist." });
        }
    } catch (error) {
        // log error to database
        console.log(error);
        res.status(500).json({ error: "The action information could not be retrieved." });
    } 
});

// POST
router.post('/', project_idDescriptionNotesCheck, async (req, res) => {
    
    try {
        const action = await ActionsDb.insert(req.body);
        res.status(201).json(action);
    } catch (error) {
        //log error to database
        console.log(error);
        res.status(500).json({ error: "There was an error while saving the action to the database" });
    }    
        
});

// PUT
router.put('/:id', project_idDescriptionNotesCheck, async (req, res) => {
     
    try {
        const action = await ActionsDb.update(req.params.id, req.body);

        if (action) {
            res.status(200).json(action);
        } else {
            res.status(404).json({ message: "The action with the specified ID does not exist." });
        }
    } catch (error) {
        // log error to database
        console.log(error);
        res.status(500).json({ error: "The action information could not be modified." });
    }
    
});

//DELETE
router.delete('/:id', async (req, res) => {
    try {
        const count = await ActionsDb.remove(req.params.id);

        if (count > 0) {
            res.status(204).end();
        } else {
            res.status(404).json({ message: "The action with the specified ID does not exist." });
        }
    } catch (error) {
        // log error to database
        console.log(error);
        res.status(500).json({ error: "The action could not be removed." });
    }
});


module.exports = router; //notice the "s" in exports