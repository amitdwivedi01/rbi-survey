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

router.get('/get-all-surveys', async (req, res) => {
  try {
      const surveys = await Survey.find().sort({ submittedAt: -1 });

      const formattedSurveys = surveys.map(survey => ({
          id: survey._id,
          responses: survey.responses.map(response => ({
              question: response.question,
              answer: typeof response.answer === 'object' 
                      ? `${response.answer.answer || ''} ${response.answer.otherText || ''}`.trim()
                      : response.answer
          })),
          name: survey.isAnonymous ? 'Anonymous' : survey.name,
          email: survey.isAnonymous ? 'Anonymous' : survey.email,
          submittedAt: survey.submittedAt,
      }));

      // Extract unique submittedAt dates for filtering
      const uniqueDates = [
          ...new Set(surveys.map(survey => new Date(survey.submittedAt).toDateString()))
      ];

      res.status(200).json({ count: surveys.length, surveys: formattedSurveys, uniqueDates });
  } catch (error) {
      console.error('Failed to fetch survey data', error);
      res.status(500).json({ error: 'Failed to fetch survey data' });
  }
});


module.exports = router;
