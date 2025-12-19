import { UserRole } from '../enums/user-role.enum';

export interface UserResponse {
  id: number;
  email: string;
  roles: UserRole[];
  token: string;   
}
