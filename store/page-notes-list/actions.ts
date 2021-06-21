import { ActionTree } from 'vuex';
import { ECommonActions } from '~/store-utils/common/actions';
import { ECommonMutations } from '~/store-utils/common/mutations';

import { IRootState } from '~/store-utils/state.interface';
import { STORE_TOKENS } from '~/store-utils/tokens';
import { IApi } from '~/types/api.interface';
import { IRequestGetArticlesResponse } from '~/types/request-get-articles-response.interface';
import { IRequestGetNotesResponse } from '~/types/request-get-notes-response.interface';
import scopedArticleFactory from '~/utils/scoped-article-factory';
import { EEntitiesMutations } from '~/utils/store-entities';

import { IState } from './state';

export default {
    async [ECommonActions.GET]({ commit }, payload: number): Promise<void> {
        try {
            // @ts-ignore
            const $api: IApi = this.$api;

            commit(ECommonMutations.GET);

            const result: IRequestGetNotesResponse = await $api.notes.getNotes(payload, 10);

            commit(
                `${STORE_TOKENS.DATA_NOTES}/${EEntitiesMutations.UPSERT_ENTITIES}`,
                result.notes,
                { root: true }
            );
            commit(EEntitiesMutations.UPSERT_ENTITIES, result.notes.map(a => scopedArticleFactory(a)));
            commit(ECommonMutations.GET_SUCCESS, result);
        } catch (err) {
            console.log(err);

            commit(ECommonMutations.GET_ERROR, err);
        }
    }
} as ActionTree<IState, IRootState>
