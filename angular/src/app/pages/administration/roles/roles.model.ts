import { PaginatedListDto } from "src/app/components/common/base-dto/base-paginated-list-dto";
import { BaseAddDto } from "src/app/shared/base-dto/base-add-dto";
import { BaseDeleteDto } from "src/app/shared/base-dto/base-delete-dto";
import { BaseDto } from "src/app/shared/base-dto/base-dto";
import { BaseEditDto } from "src/app/shared/base-dto/base-edit-dto";
import { BaseFilterDto } from "src/app/shared/base-dto/base-filter-dto";

export class AddRolesDto extends BaseAddDto {
  role_name: string;
  is_default: boolean;
  permission_id: string;
}

export class EditRolesDto extends BaseEditDto {
  role_name: string;
  is_default: boolean;
  permission_id: string;
}

export class RoleDto extends BaseDto{
  role_name: string;
  is_default: boolean;
  permission_id: string;
}



export class FilterRolesDto extends BaseFilterDto{
  filter: string;
}

export class DeleteRolesRangeDto extends BaseDeleteDto {

}
