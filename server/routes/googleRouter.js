const express = require('express');
const { listFolderContents, listRootFolders } = require('../controllers/driveController');

const router = express.Router();

router.get('/files/:folderId', listFolderContents);

router.get('/files', listRootFolders);

module.exports = router;
