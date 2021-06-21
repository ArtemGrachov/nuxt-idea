import { ActionTree } from 'vuex';

import { STORE_TOKENS } from '~/store-utils/tokens';
import { IRootState } from '~/store-utils/state.interface';
import { ECommonActions } from '~/store-utils/common/actions';
import { ECommonMutations } from '~/store-utils/common/mutations';

import { IApi } from '~/types/api.interface';
import IFormArticleValue from '~/types/form-article-value.interface';
import { IArticle } from '~/types/article.interface';

import { EEntitiesMutations } from '~/utils/store-entities';
import { IFormState } from '~/utils/store-form';

export interface IArticleEditSubmitPayload {
    id: number;
    formValue: IFormArticleValue;
}

export default {
    async [ECommonActions.SUBMIT]({ commit }, payload: IArticleEditSubmitPayload): Promise<void> {
        try {
            // @ts-ignore
            const $api: IApi = this.$api;

            commit(ECommonMutations.SUBMIT);

            const result: IArticle = await $api
                .articles
                .updateArticle(payload.id, { content: payload.formValue.content });

            commit(
                `${STORE_TOKENS.DATA_ARTICLES}/${EEntitiesMutations.UPSERT_ENTITY}`,
                result,
                { root: true }
            );
            commit(ECommonMutations.SUBMIT_SUCCESS, result);
        } catch (err) {
            console.log(err);

            commit(ECommonMutations.SUBMIT_ERROR, err);
        }
    }
} as ActionTree<IFormState<IFormArticleValue>, IRootState>
