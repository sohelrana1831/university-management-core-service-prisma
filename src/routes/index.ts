import express from 'express';
import { AcademicSemesterRouter } from '../modules/academicSemester/academicSemesterRoute';

const router = express.Router();

const moduleRoutes = [
  // ... routes
  {
    path: "/academic-semester",
    route: AcademicSemesterRouter
  }
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
