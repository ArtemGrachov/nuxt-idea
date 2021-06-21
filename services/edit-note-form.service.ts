import IFormArticleValue from '~/types/form-article-value.interface';
import { IScopedNote } from '~/types/scoped-note.interface';
import EStatus from '~/types/status.enum';

import AbstractEditNoteContextService from './abstract-edit-note-context.service';

import AbstractServiceForm from './abstract-form.service';

export default class EditNoteFormService extends AbstractServiceForm<IFormArticleValue> {
    public get formValue(): IFormArticleValue {
        return this.editNoteContext.formMapper(this.scopedNote.id);
    };

    public get submitStatus(): EStatus {
        return this.scopedNote.editStatus;
    }

    public get submitError(): any {
        return this.scopedNote.editError;
    }

    constructor(
        private editNoteContext: AbstractEditNoteContextService,
        private scopedNote: IScopedNote
    ) {
        super();
    }

    public submit(formValue: IFormArticleValue): void {
        this.editNoteContext.submit(this.scopedNote.id, formValue);
    }
}
