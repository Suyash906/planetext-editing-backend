const express = require('express');
const router = express.Router();
const File = require('../models/files');


router.post('/', async (req, res, next) => {
    const {
        fileName,
        fileText,
        fileExtension,
        type,
        updatedAt
    } = req.body;
    if (fileName === "") {
        return res.status(404).json('Invalid File Name');
    }
    if (fileExtension ==  null || fileExtension == ""){
        return res.status(404).json('Invalid File Type');   
    }
    
    try {
        const fileToBeSaved = {
            fileName,
            fileText,
            fileExtension,
            type,
            updatedAt
        };

        const newFile = new File(fileToBeSaved);
        await newFile.save();
        
        res.status(200).json(fileToBeSaved);
        
    } catch (err) {
        console.log(err);
        res.status(401).json('Server Error!!. Please try again later');
    }
});

router.get('/', async (req, res) => {
    try {
        const allFiles = await File.find({})
        res.status(200).json(allFiles);
        
    } catch(err) {
        const responseObject = {
            success: false,
            docs:[],
            result:`Server error`
        }
        res.status(500).json(responseObject);
    }
});

router.patch('/:fileName', async (req, res) => {
    try {
        const {fileName} = req.params;
        const body = req.body;
        
        const file = await File.findOne({ fileName: fileName })
        console.log(body)
        if (body.fileText){
            file.fileText = body.fileText
            file.updatedAt = Date.now()
        }
        console.log(file)
        await file.save(file);

        res.status(200).json(file);
    } catch(err) {
        const responseObject = {
            success: false,
            data:"",
            result:`Server error`
        }
        res.status(500).json(responseObject);
    }
});

module.exports = router;