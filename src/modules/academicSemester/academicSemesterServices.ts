import { AcademicSemester, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../helpers/paginationHelper';
import { IGenericResponse } from '../../interfaces/common';
import { IPaginationOptions } from '../../interfaces/pagination';
import prisma from '../../shared/prisma';
import { AcademicSemesterSearchAbleFields } from './academicSemesterConstants';
import { IAcademicSemesterFilterRequest } from './academicSemesterInterface';

const insertIntoDB = async (
  data: AcademicSemester
): Promise<AcademicSemester> => {
  console.log({ data });
  const result = await prisma.academicSemester.create({ data });
  return result;
};

const getAllFormDB = async (
  filters: IAcademicSemesterFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<AcademicSemester[]>> => {
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andCondition = [];
  if (searchTerm) {
    andCondition.push({
      OR: AcademicSemesterSearchAbleFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andCondition.push({
      AND: Object.keys(filterData).map(key => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }

  const whereConditions: Prisma.AcademicSemesterWhereInput =
    andCondition.length > 0 ? { AND: andCondition } : {};

  const result = await prisma.academicSemester.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : { createdAt: 'desc' },
  });
  const total = await prisma.academicSemester.count();
  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const getDataById = async (id: string): Promise<AcademicSemester | null> => {
  const result = prisma.academicSemester.findUnique({ where: { id } });
  return result;
};

export const AcademicSemesterServices = {
  insertIntoDB,
  getAllFormDB,
  getDataById,
};
