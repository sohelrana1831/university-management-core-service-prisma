import { AcademicSemester } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../shared/catchAsync';
import pick from '../../shared/pick';
import sendResponse from '../../shared/sendResponse';
import { AcademicSemesterSearchFilterAbleFields, AcademicSemesterSearchFilterAbleOptions } from './academicSemesterConstants';
import { AcademicSemesterServices } from './academicSemesterServices';

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await AcademicSemesterServices.insertIntoDB(req.body);
  sendResponse<AcademicSemester>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semester Created!',
    data: result,
  });
});

const getAllFormDB = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, AcademicSemesterSearchFilterAbleFields);
  const options = pick(req.query, AcademicSemesterSearchFilterAbleOptions);

  const result = await AcademicSemesterServices.getAllFormDB(filters,options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get All Semester',
    meta: result.meta,
    data: result.data,
  });
});

const getDataById = catchAsync(async (req: Request, res: Response) => {

    const result = await AcademicSemesterServices.getDataById(req.params.id);

    sendResponse<AcademicSemester>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Get Single Semester',
        data: result,
      });
    
})

export const AcademicSemesterController = {
  insertIntoDB,
  getAllFormDB,
  getDataById
};
