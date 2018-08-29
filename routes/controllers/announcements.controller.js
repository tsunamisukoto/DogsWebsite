const Announcement = require('../models/announcement.model.js');
// Create and Save a new Announcement
exports.mapAnnouncement = (announcement)=>{
    return {
        Title: announcement.Title,
        Content: announcement.Content
    };
}

exports.create = (req, res) => {
    // Create a Dog
    const announcement = new Announcement(exports.mapAnnouncement(req.body));

    // Save Dog in the database
    announcement.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Dog."
        });
    });
};

// Find a single announcement with a announcementId
exports.findOne = (req, res) => {
    Announcement.find().sort({ createdAt: -1 }).limit(10)
  .then(announcement => {
      res.send(announcement);
  }).catch(err => {
      if (err.kind === 'ObjectId') {
          return res.status(404).send({
              message: "Announcement not found with id " 
          });
      }
      return res.status(500).send({
          message: "Error retrieving announcement with id " 
      });
  });
};

// Update a announcement identified by the announcementId in the request
exports.update = (req, res) => {
    // Find announcement and update it with the request body
    Announcement.findByIdAndUpdate(req.params.announcementId, exports.mapAnnouncement(req.body), { new: true })
    .then(announcement => {
        if (!announcement) {
            return res.status(404).send({
                message: "Announcement not found with id " + req.params.announcementId
            });
        }
        res.send(announcement);
    }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Announcement not found with id " + req.params.announcementId
            });
        }
        return res.status(500).send({
            message: "Error updating announcement with id " + req.params.announcementId
        });
    });
};
// Delete a dog with the specified dogId in the request
exports.delete = (req, res) => {
    Announcement.findByIdAndRemove(req.params.announcementId)
    .then(dog => {
        if (!dog) {
            return res.status(404).send({
                message: "Link not found with id " + req.params.announcementId
            });
        }
        res.send({ message: "Dog deleted successfully!" });
    }).catch(err => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Dog not found with id " + req.params.announcementId
            });
        }
        return res.status(500).send({
            message: "Could not delete dog with id " + req.params.announcementId
        });
    });
};