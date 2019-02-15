// import the express package
const express = require('express');

const ProjectsDb = require('./projectModel.js');

const router = express.Router(); // notice the Uppercase "R" in Router


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






module.exports = router; //notice the "s" in exports