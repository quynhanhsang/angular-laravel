
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { ShareDto } from 'src/app/components/common/models/share-model';
@Injectable()
export class ShareDataService {
    // Observable string sources
    private emitChangeSource = new Subject<ShareDto>();
    // Observable string streams
    changeEmitted$ = this.emitChangeSource.asObservable();
    // Service message commands
    emitChange(data: ShareDto) {
        this.emitChangeSource.next(data);
    }
}
