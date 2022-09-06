import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TitleService {
    public title = 'Phần mềm bán hàng';
    constructor() { }

    updateTitle(newTitle: string) {
        this.title = newTitle;
    }

}