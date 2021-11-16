const express = require('express')
const router = express.Router()

const Tutorial = require('../../models/tutorial')

router.get('/rss', (req, res) => {
  const data = [
    {
      "title": "Reuters ahead with news of U.S. selecting Qatar to be its diplomatic representative in Afghanistan"
    },
    {
      "title": "Reuters reveals Saudi Arabia in talks to refinance, downsize $16 bln loan"
    },
    {
      "title": "Reuters first to report Italy, UniCredit to end Monte dei Paschi sale talks; market reacts"
    },
    {
      "title": "Reuters exclusively reports Germany cuts 2021 GDP growth forecast, lifts 2022 estimate"
    },
    {
      "title": "Reuters exclusively reports Turkey’s state banks likely to follow central bank and slash rates"
    },
    {
      "title": "Reuters exclusively reports BOJ discussing phasing out pandemic support as economy reopens"
    },
    {
      "title": "Reuters reveals U.S. to lift restrictions Nov 8 for vaccinated foreign travelers; market reacts"
    },
    {
      "title": "Reuters ahead with key Turkish Central Bank news; market reacts"
    },
    {
      "title": "Reuters ahead with news of German economic growth downgrade"
    },
    {
      "title": "Reuters reveals U.S. Senator Cotton delays vote on Biden’s pick for powerful China job at Commerce"
    }
  ]

  res.json(data)
})

// Create a new Tutorial
router.post("/", (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Tutorial
  const tutorial = new Tutorial({
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false
  });

  // Save Tutorial in the database
  tutorial
    .save(tutorial)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial."
      });
    });
});

// Retrieve all Tutorials
router.get("/", (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

  Tutorial.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
});

// Retrieve all published Tutorials
router.get("/published", (req, res) => {
  Tutorial.find({ published: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
});

// Retrieve a single Tutorial with id
router.get("/:id", (req, res) => {
  const id = req.params.id;

  Tutorial.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Tutorial with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Tutorial with id=" + id });
    });
});

// Update a Tutorial with id
router.put("/:id", (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Tutorial.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found!`
        });
      } else res.send({ message: "Tutorial was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Tutorial with id=" + id
      });
    });
});

// Delete a Tutorial with id
router.delete("/:id", (req, res) => {
  const id = req.params.id;

  Tutorial.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
        });
      } else {
        res.send({
          message: "Tutorial was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Tutorial with id=" + id
      });
    });
});

// Delete All tutorials
router.delete("/", (req, res) => {
  Tutorial.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Tutorials were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials."
      });
    });
});

module.exports = router;