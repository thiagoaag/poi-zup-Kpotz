import express from 'express';
import validate from 'express-validation';
import Joi from 'joi';
import poiController from '../controllers/poi.controller';

const router = express.Router();

router.route('/add')
  .post(
    validate(
      {
        body: {
          name: Joi.string().required(),
          coordinates: Joi.array().min(2).items(Joi.number().integer().min(0).max(180)).required(),
        }
      }
    ),
    poiController.add
  )

router.route('/find')
  .get(
    poiController.findAll
  )
  .post(
    validate(
      {
        body: {
          x: Joi.number().integer().min(0).max(180).required(), // eslint-disable-line
          y: Joi.number().integer().min(0).max(180).required(), // eslint-disable-line
          max_distance: Joi.number().integer().min(0).required(),
        }
      }
    ),
    poiController.findNear
  )
  
export default router;
