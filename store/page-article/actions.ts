import { ActionTree } from 'vuex';

import { ECommonActions } from '~/store-utils/common/actions';
import { ECommonMutations } from '~/store-utils/common/mutations';
import { IRootState } from '~/store-utils/state.interface';

import { IState } from './state';
import { IApi } from '~/types/api.interface';
import { STORE_TOKENS } from '~/store-utils/tokens';
import { EEntitiesMutations } from '~/utils/store-entities';
import { IArticle } from '~/types/article.interface';

export default {
    async [ECommonActions.GET]({ commit }, payload: number) {
        try {
            // @ts-ignore
            const $api: IApi = this.$api;

            commit(ECommonMutations.GET);

            const result: IArticle = await $api.articles.getArticle(payload);

            commit(
                `${STORE_TOKENS.DATA_ARTICLES}/${EEntitiesMutations.UPSERT_ENTITY}`,
                result,
                { root: true }
            );
            commit(ECommonMutations.GET_SUCCESS, result);
        } catch (err) {
            console.log(err);

            commit(ECommonMutations.GET_ERROR, err);
        }
    }
} as ActionTree<IState, IRootState>
