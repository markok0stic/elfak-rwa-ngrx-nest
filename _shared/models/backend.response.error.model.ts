import { HttpResponseErrorsEnum } from '../enums/http.response.errors.enum';

export interface BackendResponseErrorModel {
  statusCode: number,
  message: HttpResponseErrorsEnum
}