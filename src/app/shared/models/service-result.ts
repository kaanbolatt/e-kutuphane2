import { ResultType } from '../enums/result-type';
class ServiceResult<T> {
  public message: string;
  public resultType: ResultType;
  public data: T;
}

export default ServiceResult;
