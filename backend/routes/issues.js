const express = require('express');
const router = express.Router();

let Issue = require('./models/issue');

router.route('/issues')
    .get((req, res) => {
        Issue.find((err, issues) => {
            if(err) {
                console.log(err);
            } else {
                res.json(issues);
            }
        });
    });

router.route('/issues/:id')
    .get((req, res) => {
        Issue.findById(req.params.id, (err, issue) => {
            if(err) {
                console.log(err);
            } else {
                res.json(issue);
            }
        });
    });

router.route('/issues/add')
    .get((req, res) => {
        let issue = new Issue(req.body);
        issue.save()
            .then(issue => {
                res.status(200).json({'issue': 'Added successfully'});
            })
            .catch(err => {
                res.status(400).send('Failed to create new record');
            });
    });

router.route('/issues/update/:id')
    .post((req, res) => {
        Issue.findById(rq.params.id, (err, issue) => {
            if(!issue) {
                return next(new Error('Could not load Document'));
            } else {
                issue.title = req.body.title;
                issue.responsible = req.body.responsible;
                issue.description = req.body.description;
                issue.severity = req.body.severity;

                issue.save()
                    .then(issue => {
                        res.json('Update done');
                    })
                    .catch(err => {
                        res.status(400).send('Update failed');
                    });
            }
        });
    });

router.route('/issues/delete/:id')
    .get((req, res) => {
        Issue.findByIdAndRemove({_id: req.params.id}, (err, issue) => {
            if(err) {
                res.json(err);
            } else {
                res.json('Removed successfully');
            }
        })
    });

module.exports = router;