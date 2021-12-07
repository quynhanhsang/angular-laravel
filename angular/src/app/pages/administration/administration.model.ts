import { PaginatedListDto } from "src/app/components/common/base-dto/base-paginated-list-dto";

export class UserProfileDto{
  email: string;
  fullName: string;
  dateBirth: Date;
}

export class UserDto{
  id: number;
  email: string;
  fullName: string;
  dateBirth: Date;
  name: string;
}

export class FilterUserDto extends PaginatedListDto<UserDto>{
  // email: string;
  // fullName: string;
  // dateBirth: Date;
}

