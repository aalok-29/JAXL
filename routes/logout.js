const router = require("express").Router();

logOut = async (req, res) => {
    try {
    if(req.token._id) {delete req.token._id;

    res.send();
    }
    else {
                res.send({result: 'ERROR', message: 'User is not logged in.'});
            }
    }catch (e) {
            res.status(500).send("logged out")
        }
    }

    module.exports=logOut;