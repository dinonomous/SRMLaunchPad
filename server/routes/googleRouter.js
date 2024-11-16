const express = require('express');
const { listFolderContents, listRootFolders } = require('../controllers/driveController');
const passport = require("passport");
require("../config/passport");

const router = express.Router();

router.get('/files/:folderId', passport.authenticate("jwt", { session: false }), listFolderContents);
 
router.get('/files', passport.authenticate("jwt", { session: false }), listRootFolders);

module.exports = router;
