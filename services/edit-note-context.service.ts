import { Store } from 'vuex';

import { ECommonActions } from '~/store-utils/common/actions';
import { IRootState } from '~/store-utils/state.interface';
import { STORE_TOKENS } from '~/store-utils/tokens';

import AbstractEditNoteContextService from './abstract-edit-note-context.service';

import { IArticleEditSubmitPayload } from '~/store/page-article-edit-form/actions';

import IFormArticleValue from '~/types/form-article-value.interface';
import { EEntitiesGetters, EEntitiesMutations } from '~/utils/store-entities';

export default class EditNoteContextService extends AbstractEditNoteContextService {
    constructor(private store: Store<IRootState>) {
        super();
    }

    public submit(articleId: number, formValue: IFormArticleValue): void {
        this
            .store
            .dispatch(
                `${STORE_TOKENS.PAGE_NOTES_LIST}/${ECommonActions.EDIT}`,
                {
                    id: articleId,
                    formValue
                } as IArticleEditSubmitPayload
            );
    }

    public formMapper(noteId: number): any {
        const store: Store<IRootState> = this.store;
        const getter: string = `${STORE_TOKENS.PAGE_NOTES_LIST}/${EEntitiesGetters.ENTITIES}`;
        const mutation: string = `${STORE_TOKENS.PAGE_NOTES_LIST}/${EEntitiesMutations.UPSERT_ENTITY}`;

        const result = {};

        Object.defineProperty(
            result,
            'content',
            {
                get: function () {
                    return store.getters[getter][noteId].form.content;
                },
                set: function (value: string) {
                    const currentForm: IFormArticleValue = store.getters[getter][noteId].form;

                    if (currentForm.content === value) {
                        return;
                    }

                    store.commit(
                        mutation,
                        {
                            id: noteId,
                            form: {
                                ...currentForm,
                                content: value
                            }
                        }
                    );
                }
            }
        );

        return result;
    }
}
