const PageContent = require('../models/pagecontent.model.js');
// Create and Save a new PageContent
exports.mapPageContent = (pagecontent)=>{
    return {
        Title: pagecontent.Title,
        Content: pagecontent.Content,
        UniqueName: pagecontent.UniqueName
    };
}

exports.create = (req, res, content) => {
    // Create a Dog
    const pagecontent = new PageContent(exports.mapPageContent(content));

    // Save Dog in the database
    pagecontent.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Dog."
        });
    });
};

// Find a single pagecontent with a pagecontentId
exports.findOne = (req, res) => {
    PageContent.find({UniqueName: req.params.UniqueName})
  .then(pagecontent => {

      if (pagecontent.length == 0) {
          console.log("Have to make one")
          return exports.create(req, res, { UniqueName: req.params.UniqueName });
          
      }
      res.send(pagecontent[0]);
  }).catch(err => {
      if (err.kind === 'ObjectId') {
          return res.status(404).send({
              message: "PageContent not found with id " 
          });
      }
      return res.status(500).send({
          message: "Error retrieving pagecontent with id " 
      });
  });
};

// Update a pagecontent identified by the pagecontentId in the request
exports.update = (req, res) => {
    // Find pagecontent and update it with the request body
    PageContent.findByIdAndUpdate(req.params.pagecontentId, exports.mapPageContent(req.body), { new: true })
    .then(pagecontent => {
        if (!pagecontent) {
            return res.status(404).send({
                message: "PageContent not found with id " + req.params.pagecontentId
            });
        }
        res.send(pagecontent);
    }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "PageContent not found with id " + req.params.pagecontentId
            });
        }
        return res.status(500).send({
            message: "Error updating pagecontent with id " + req.params.pagecontentId
        });
    });
};