import { CreateUserDto } from '../dto/create-user.dto';

export interface ReqResponse {
  status: number;
  success: boolean;
  message: string;
  error: string | boolean;
  data?: CreateUserDto | any;
}
