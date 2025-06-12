const express = require('express');
const Bookmark = require('../models/Bookmark');
const validateToken = require('../middleware/validateTokenHandler');
const router = express.Router()

// add to bookmark
const addToBookmark = async (req, res) => {
    try {
        // check if bookmark present
        const checkBkmarkAvailable = await Bookmark.findOne({ id: parseInt(req.body.id), user_id: req.body.user_id })

        if (checkBkmarkAvailable) {
            res.status(400).json({ error: "Bookmarked Already" })
        }

        // add bookmark to db
        const bookmark = new Bookmark(req.body);
        await bookmark.save()
        res.status(201).json({ message: "created", bookmark })
    } catch (err) {

        //error
        res.status(500).json({ error: err.message })
    }
}

// fetch bookmark for a user
const getBookmark = async (req, res) => {
    try {
        // get user id parameter
        const id = req.params.user_id;
        console.log("Fetching bookmarks for user_id:", id);

        //fetch bookmark with user id
        const result = await Bookmark.find({ user_id: id }).select({ _id: 0 })
        res.status(200).json(result)
    } catch (err) {
        res.status(500).json({ error: "failed to fetch bookmark details" })
    }
}

// delete bookmark for a user
const deleteBookmark = async (req, res) => {
    try {
        // get bookmark id as parameter and user_id as a query 
        const id = req.params.id;
        console.log(id + " " + req.query.user_id)

        // find bookmark with that id
        const bookmark = await Bookmark.find({ id: parseInt(id) });
        if (!bookmark) {
            res.status(404).json({ error: "Bookmark not found" });
        }
        console.log(bookmark+" "+("user_id" in bookmark))

        // confirm the user_id present in that bookmark
        const bkmarkavailable = bookmark.find(e=>e.user_id==req.query.user_id)
        
            if (!bkmarkavailable) {
                return res.status(403).json({ error: "User don't have permission to delete other bookmarks" });
            }

            // delete the found bookmark
            await bkmarkavailable.deleteOne({ id: parseInt(id), user_id: String(req.query.user_id) })
            res.status(200).json(bookmark)
       

    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}
router.use(validateToken)
router.post("/", addToBookmark);
router.get("/:user_id", getBookmark);
router.delete("/:id", deleteBookmark)

module.exports = router;