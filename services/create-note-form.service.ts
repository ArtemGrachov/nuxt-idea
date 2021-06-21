import { Store } from 'vuex';

import { ECommonActions } from '~/store-utils/common/actions';
import { ECommonGetters } from '~/store-utils/common/getters';
import { IRootState } from '~/store-utils/state.interface';
import { STORE_TOKENS } from '~/store-utils/tokens';

import IFormArticleValue from '~/types/form-article-value.interface';
import EStatus from '~/types/status.enum';

import { EFormGetters, EFormMutations } from '~/utils/store-form';
import storeFormMapper from '~/utils/store-form-mapper';

import AbstractServiceForm from './abstract-form.service';

export default class CreateNoteFormService extends AbstractServiceForm<IFormArticleValue> {
    public get formValue(): IFormArticleValue {
        return storeFormMapper({
            store: this.store,
            getter: `${STORE_TOKENS.PAGE_NOTES_FORM}/${EFormGetters.FORM_VALUE}`,
            mutation: `${STORE_TOKENS.PAGE_NOTES_FORM}/${EFormMutations.SET_FORM_FIELD}`,
            fields: ['content']
        });
    };

    public get submitStatus(): EStatus {
        return this.store.getters[`${STORE_TOKENS}/${ECommonGetters.SUBMIT_STATUS}`];
    }

    public get submitError(): any {
        return this.store.getters[`${STORE_TOKENS}/${ECommonGetters.SUBMIT_ERROR}`];
    }

    constructor(private store: Store<IRootState>) {
        super();
    }

    public submit(formValue: IFormArticleValue): void {
        this.store.dispatch(`${STORE_TOKENS.PAGE_NOTES_FORM}/${ECommonActions.SUBMIT}`, formValue);
    }
}
