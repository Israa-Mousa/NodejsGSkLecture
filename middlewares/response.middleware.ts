import { RequestHandler } from 'express';
import { ErrorStatusCode } from '../utils/util.types';

export type UnifiedApiErrorResponse = {
  statusCode: ErrorStatusCode;
  message: string;
};

export type PaginationMeta = {
  page: number;
  limit: number;
  totalRecords: number;
  totalPages: number;
};
export type ApiResponseMeta=PaginationMeta;

export type SuccessApiResponse = {
  success: true;
  data: object;
  meta?: ApiResponseMeta;
};

export type UnsuccessfulApiResponse = {
  success: false;
  error: UnifiedApiErrorResponse;
};

export type UnifiedApiResponse = SuccessApiResponse | UnsuccessfulApiResponse;

export const responseEnhancer: RequestHandler = (req, res, next) => {
  res.ok = (data,meta) =>
    res.status(200).json(formatUnifiedResponse({ success: true, data,meta }));

  res.create = (data) =>
    res.status(201).json(formatUnifiedResponse({ success: true, data }));

  res.error = (err) =>
    res
      .status(err.statusCode)
      .json(formatUnifiedResponse({ success: false, error: err }));

  next();
};

const formatUnifiedResponse = (res: UnifiedApiResponse) => res;