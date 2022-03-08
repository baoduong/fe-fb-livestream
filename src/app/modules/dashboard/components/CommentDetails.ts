import { EventEmitter, Type } from '@angular/core';

import { BehaviorSubject } from 'rxjs';



// export interface ICommentDetail {
//     // eventClickedAvatar: EventEmitter<any>;
//     message: string;
// }

export interface ICommentDetail {
    component: Type<any>;
    message: string;
}

export class CommentDetails implements ICommentDetail {
    constructor(
        public message: string,
        public component: Type<any>
    ) {
        this.component = component;
        this.message = message;
    }
    // eventClickedAvatar: EventEmitter<any>;
}
