const Dog = require('../models/dog.model.js');
// Create and Save a new Dog
exports.mapDog = (dog)=>{
    return {
        Name: dog.Name,
        Category: dog.Category,
        Nickname: dog.Nickname,
        Grading: dog.Grading,
        Achievements: dog.Achievements,
        Sire: dog.Sire,
        Dame: dog.Dame
    };
}
exports.create = (req, res) => {
    // Validate request
    if (!req.body.Name) {
        return res.status(400).send({
            message: "Dog Name can not be empty"
        });
    }

    // Create a Dog
    const dog = new Dog(exports.mapDog(req.body));

    // Save Dog in the database
    dog.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Dog."
        });
    });
};

// Retrieve and return all dogs from the database.
exports.findAll = (req, res) => {

    Dog.find(req.params.category? { Category: req.params.category }: null)
    .then(dogs => {
        res.send(dogs);
    }).catch(err => {

        res.status(500).send({
            message: err.message || "Some error occurred while retrieving dogs."
        });
    });
};

// Find a single dog with a dogId
exports.findOne = (req, res) => {
    Dog.findById(req.params.dogId)
  .then(dog => {
      if (!dog) {
          return res.status(404).send({
              message: "Dog not found with id " + req.params.dogId
          });
      }
      res.send(dog);
  }).catch(err => {
      if (err.kind === 'ObjectId') {
          return res.status(404).send({
              message: "Dog not found with id " + req.params.dogId
          });
      }
      return res.status(500).send({
          message: "Error retrieving dog with id " + req.params.dogId
      });
  });
};

// Update a dog identified by the dogId in the request
exports.update = (req, res) => {
    // Find dog and update it with the request body
    Dog.findByIdAndUpdate(req.params.dogId, exports.mapDog(req.body), { new: true })
    .then(dog => {
        if (!dog) {
            return res.status(404).send({
                message: "Dog not found with id " + req.params.dogId
            });
        }
        res.send(dog);
    }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Dog not found with id " + req.params.dogId
            });
        }
        return res.status(500).send({
            message: "Error updating dog with id " + req.params.dogId
        });
    });
};

// Delete a dog with the specified dogId in the request
exports.delete = (req, res) => {
    Dog.findByIdAndRemove(req.params.dogId)
    .then(dog => {
        if (!dog) {
            return res.status(404).send({
                message: "Dog not found with id " + req.params.dogId
            });
        }
        res.send({ message: "Dog deleted successfully!" });
    }).catch(err => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Dog not found with id " + req.params.dogId
            });
        }
        return res.status(500).send({
            message: "Could not delete dog with id " + req.params.dogId
        });
    });
};