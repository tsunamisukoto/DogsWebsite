const Link = require('../models/link.model.js');
// Create and Save a new Link
exports.mapLink = (link)=>{
    return {
        Title: link.Title,
        Content: link.Content,
        URL: link.URL

    };
}

exports.create = (req, res) => {
    // Create a Dog
    const link = new Link(exports.mapLink(req.body));

    // Save Dog in the database
    link.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Dog."
        });
    });
};

// Find a single link with a linkId
exports.findOne = (req, res) => {
    Link.find()
  .then(link => {
      res.send(link);
  }).catch(err => {
      if (err.kind === 'ObjectId') {
          return res.status(404).send({
              message: "Link not found with id " 
          });
      }
      return res.status(500).send({
          message: "Error retrieving link with id " 
      });
  });
};

// Update a link identified by the linkId in the request
exports.update = (req, res) => {
    // Find link and update it with the request body
    Link.findByIdAndUpdate(req.params.linkId, exports.mapLink(req.body), { new: true })
    .then(link => {
        if (!link) {
            return res.status(404).send({
                message: "Link not found with id " + req.params.linkId
            });
        }
        res.send(link);
    }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Link not found with id " + req.params.linkId
            });
        }
        return res.status(500).send({
            message: "Error updating link with id " + req.params.linkId
        });
    });
};
// Delete a dog with the specified dogId in the request
exports.delete = (req, res) => {
    Link.findByIdAndRemove(req.params.linkId)
    .then(dog => {
        if (!dog) {
            return res.status(404).send({
                message: "Link not found with id " + req.params.linkId
            });
        }
        res.send({ message: "Dog deleted successfully!" });
    }).catch(err => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Dog not found with id " + req.params.linkId
            });
        }
        return res.status(500).send({
            message: "Could not delete dog with id " + req.params.linkId
        });
    });
};