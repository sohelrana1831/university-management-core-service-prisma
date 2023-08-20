import express from 'express';
import validateRequest from '../../app/middlewares/validateRequest';
import { AcademicSemesterController } from './academicSemesterController';
import { AcademicSemesterValidation } from './academicSemesterValidation';

const router = express.Router()

router.get('/',AcademicSemesterController.getAllFormDB)
router.get('/:id',AcademicSemesterController.getDataById)
router.post('/',validateRequest(AcademicSemesterValidation.create), AcademicSemesterController.insertIntoDB)

export const AcademicSemesterRouter = router