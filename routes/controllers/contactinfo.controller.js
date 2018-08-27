const ContactInfo = require('../models/contactinfo.model.js');
// Create and Save a new ContactInfo
exports.mapContactInfo = (contactinfo)=>{
    return {
        FirstName: contactinfo.FirstName,
        Address: contactinfo.Address,
        KennelName: contactinfo.KennelName,
        LastName: contactinfo.LastName,
        Email: contactinfo.Email,
        Mobile: contactinfo.Mobile,
        HomeNumber: contactinfo.HomeNumber,
        DogsNSWMemberNumber: contactinfo.DogsNSWMemberNumber,
        Website: contactinfo.Website,
        Facebook: contactinfo.Facebook
    };
}

exports.create = (req, res) => {
    // Create a Dog
    const contactinfo = new ContactInfo(exports.mapContactInfo({}));

    // Save Dog in the database
    contactinfo.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Dog."
        });
    });
};

// Find a single contactinfo with a contactinfoId
exports.findOne = (req, res) => {
    ContactInfo.find()
  .then(contactinfo => {

      if (contactinfo.length == 0) {
          console.log("Have to make one")
          return exports.create(req, res, {});
          
      }
      res.send(contactinfo[0]);
  }).catch(err => {
      if (err.kind === 'ObjectId') {
          return res.status(404).send({
              message: "ContactInfo not found with id " 
          });
      }
      return res.status(500).send({
          message: "Error retrieving contactinfo with id " 
      });
  });
};

// Update a contactinfo identified by the contactinfoId in the request
exports.update = (req, res) => {
    // Find contactinfo and update it with the request body
    ContactInfo.findByIdAndUpdate(req.params.contactinfoId, exports.mapContactInfo(req.body), { new: true })
    .then(contactinfo => {
        if (!contactinfo) {
            return res.status(404).send({
                message: "ContactInfo not found with id " + req.params.contactinfoId
            });
        }
        res.send(contactinfo);
    }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "ContactInfo not found with id " + req.params.contactinfoId
            });
        }
        return res.status(500).send({
            message: "Error updating contactinfo with id " + req.params.contactinfoId
        });
    });
};