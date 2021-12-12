import { PaginatedListDto } from "src/app/components/common/base-dto/base-paginated-list-dto";
import { BaseAddDto } from "src/app/shared/base-dto/base-add-dto";
import { BaseDeleteDto } from "src/app/shared/base-dto/base-delete-dto";
import { BaseDto } from "src/app/shared/base-dto/base-dto";
import { BaseFilterDto } from "src/app/shared/base-dto/base-filter-dto";

export class AddUsersDto extends BaseAddDto {
  email: string;
  fullName: string;
  dateBirth: Date;
  name: string;
  password: string;
}

export class UserProfileDto{
  email: string;
  fullName: string;
  dateBirth: Date;
}

export class UserDto extends BaseDto{
  email: string;
  fullName: string;
  dateBirth: Date;
  name: string;
  password: string;
}



export class FilterUserDto extends BaseFilterDto{
  // email: string;
  // fullName: string;
  // dateBirth: Date;
}

export class DeleteUserRangeDto extends BaseDeleteDto {

}
