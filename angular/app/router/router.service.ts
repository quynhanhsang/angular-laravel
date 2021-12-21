import { Injectable } from "@angular/core";
import { ActivatedRoute, NavigationExtras, Router } from "@angular/router";

@Injectable()
export class RouterService {
    //words: string[];
    constructor(private route: ActivatedRoute, private router: Router){
    }

    // Thay đổi route trình duyệt theo query params
    // Nếu route đổi -> tự load lại page data -> return true
    async navigate(params: Object, reloadDataSameRoute: boolean = false) : Promise<boolean> {
        var oldUrl = this.router.url;
        await this.router.navigate([], {
         relativeTo: this.route,
         queryParams: params,
         queryParamsHandling: 'merge'
       });
       // Nếu route không đổi -> muốn reload lại data ở hàm gọi nó -> return false
       if(this.router.url == oldUrl && reloadDataSameRoute) {
           return true;
       }
       // không cần reload lại data ở hàm gọi nó
       return false;
    }

}
