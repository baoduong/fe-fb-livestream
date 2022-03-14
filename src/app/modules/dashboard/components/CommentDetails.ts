import { EventEmitter, Type } from '@angular/core';

import { BehaviorSubject } from 'rxjs';



// export interface ICommentDetail {
//     // eventClickedAvatar: EventEmitter<any>;
//     message: string;
// }

export interface ICommentDetail {
    component: Type<any>;
    message: string;
    identifier: string;
    name: string;
    url: string;
}

export class CommentDetails implements ICommentDetail {
    constructor(
        public message: string,
        public identifier: string,
        public name: string,
        public url: string,
        public component: Type<any>
    ) {
        this.component = component;
        this.message = message;
        this.identifier = identifier;
        this.name = name;
        this.url = url;
    }
    // eventClickedAvatar: EventEmitter<any>;
}
