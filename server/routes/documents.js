const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const auth = require('../middleware/auth');
const checkRole = require('../middleware/role');
const Document = require('../models/Document');

const storage = multer.diskStorage({
    destination: './uploads/',
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 10000000 }
}).single('file');

const uploadWithLogging = (req, res, next) => {
    upload(req, res, (err) => {
        if (err) {
            console.error('[Backend] Multer error:', err);
            return res.status(500).json({ message: 'Upload error: ' + err.message });
        }
        next();
    });
};

router.post('/', [auth, checkRole(['admin', 'editor']), uploadWithLogging], async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file selected' });
        }

        let tags = [];
        if (req.body.tags) {
            try {
                tags = JSON.parse(req.body.tags);
            } catch (e) {
                tags = Array.isArray(req.body.tags) ? req.body.tags : req.body.tags.split(',');
            }
        }

        const newDoc = new Document({
            user: req.user.id,
            filename: req.file.filename,
            originalName: req.file.originalname,
            path: req.file.path,
            mimetype: req.file.mimetype,
            size: req.file.size,
            tags: tags,
            versions: [{
                filename: req.file.filename,
                originalName: req.file.originalname,
                path: req.file.path,
                mimetype: req.file.mimetype,
                size: req.file.size
            }]
        });

        const doc = await newDoc.save();
        res.json(doc);
    } catch (err) {
        console.error('[Backend] Error saving document:', err);
        res.status(500).json({ message: 'Server Error: ' + (err.message || 'Unknown error') });
    }
});

router.post('/:id/version', [auth, checkRole(['admin', 'editor']), upload], async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file selected' });
        }

        const doc = await Document.findById(req.params.id);
        if (!doc) {
            console.error('[Backend] Document not found');
            return res.status(404).json({ message: 'Document not found' });
        }

        if (req.body.tags) {
            try {
                const tags = JSON.parse(req.body.tags);
                doc.tags = tags;
            } catch (e) {
                doc.tags = Array.isArray(req.body.tags) ? req.body.tags : req.body.tags.split(',');
            }
        }

        const newVersion = {
            filename: req.file.filename,
            originalName: req.file.originalname,
            path: req.file.path,
            mimetype: req.file.mimetype,
            size: req.file.size,
            createdAt: Date.now()
        };

        doc.filename = req.file.filename;
        doc.originalName = req.file.originalname;
        doc.path = req.file.path;
        doc.mimetype = req.file.mimetype;
        doc.size = req.file.size;

        if (!doc.versions) {
            doc.versions = [];
        }
        doc.versions.push(newVersion);

        await doc.save();
        res.json(doc);
    } catch (dbErr) {
        console.error('[Backend] Database error:', dbErr.message);
        res.status(500).send('Server Error');
    }
});

router.get('/', auth, async (req, res) => {
    try {
        const { search } = req.query;
        let query = { user: req.user.id };

        if (search) {
            query.originalName = { $regex: search, $options: 'i' };
        }

        const documents = await Document.find(query).sort({ createdAt: -1 });
        res.json(documents);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
