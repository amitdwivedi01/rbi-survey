const express = require('express');
const router = express.Router();
const Survey = require('../models/Survey.js');

// Route to submit a survey response
router.post('/submit-survey', async (req, res) => {
  const { responses, name, email, isAnonymous } = req.body;

  console.log(req.body)

  try {
    // Save the survey response with user details
    const survey = new Survey({
      responses,
      name: isAnonymous ? null : name,
      email: isAnonymous ? null : email,
      isAnonymous
    });
    await survey.save();

    res.status(201).json({ message: 'Survey submitted successfully', surveyId: survey._id });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Failed to submit survey' });
  }
});

module.exports = router;
