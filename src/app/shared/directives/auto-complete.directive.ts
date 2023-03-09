import { Directive } from '@angular/core';
import { AutoComplete } from 'primeng/autocomplete';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: 'p-autoComplete'
})

export class AutoCompleteDirective {
    constructor(public autoComplete: AutoComplete) {
        autoComplete.minLength = 3;
        autoComplete.delay = 500;
        autoComplete.placeholder = 'Metni girmeye başlayın...';
    }
}
