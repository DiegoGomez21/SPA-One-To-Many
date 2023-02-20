const db = require("../models");
const Comment = db.comments;
const Tutorial = db.tutorials;


exports.create = (req, res) => {
  if (!req.body.name || !req.body.text) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // create new comment
  const comment = {
    name: req.body.name,
    text: req.body.text,
    tutorialId: req.params.id
  };

  Comment.create(comment)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Comment."
      });
    });
};



// exports.create = (req, res) => {
//   if (!req.body.name || !req.body.text) {
//     res.status(400).send({
//       message: "Content can not be empty!"
//     });
//     return;
//   }

//   // create new comment
//   const comment = {
//     name: req.body.name,
//     text: req.body.text,
//     tutoriId: req.params.idal
//   };

//   Comment.create(comment)
//     .then(data => {
//       res.send(data);
//     })
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while creating the Comment."
//       });
//     });
// };

exports.findAll = (req, res) => {
  const id = req.params.id;

  Comment.findAll({ where: { tutorialid: id }, include: ["tutorial"] })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving comments."
      });
    });
};

