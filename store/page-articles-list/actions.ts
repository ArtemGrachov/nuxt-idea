import { ActionTree } from 'vuex';

import { IState } from './state';
import { IRootState } from '~/store-utils/state.interface';
import { STORE_TOKENS } from '~/store-utils/tokens';
import { ECommonActions } from '~/store-utils/common/actions';
import { ECommonMutations } from '~/store-utils/common/mutations';

import { IApi } from '~/types/api.interface';
import { IRequestGetArticlesResponse } from '~/types/request-get-articles-response.interface';
import EStatus from '~/types/status.enum';

import scopedArticleFactory from '~/utils/scoped-article-factory';
import { EEntitiesMutations } from '~/utils/store-entities';
import { EListMutations } from '~/utils/store-list';

export default {
    async [ECommonActions.GET]({ commit }, payload: number): Promise<void> {
        try {
            // @ts-ignore
            const $api: IApi = this.$api;

            commit(ECommonMutations.GET);

            const result: IRequestGetArticlesResponse = await $api.articles.getArticles(payload, 3);

            commit(
                `${STORE_TOKENS.DATA_ARTICLES}/${EEntitiesMutations.UPSERT_ENTITIES}`,
                result.articles,
                { root: true }
            );
            commit(EEntitiesMutations.UPSERT_ENTITIES, result.articles.map(a => scopedArticleFactory(a)));
            commit(ECommonMutations.GET_SUCCESS, result);
        } catch (err) {
            console.log(err);

            commit(ECommonMutations.GET_ERROR, err);
        }
    },
    async [ECommonActions.DELETE]({ commit }, payload: number): Promise<void> {
        try {
            // @ts-ignore
            const $api: IApi = this.$api;

            commit(
                EEntitiesMutations.UPSERT_ENTITY,
                { id: payload, deleteStatus: EStatus.PROCESSING, editError: null }
            );

            await $api.articles.deleteArticle(payload);

            commit(
                EListMutations.DELETE_ITEM,
                payload
            );
            commit(
                EEntitiesMutations.DELETE_ENTITY,
                payload
            );
            commit(
                `${STORE_TOKENS.DATA_ARTICLES}/${EEntitiesMutations.DELETE_ENTITY}`,
                payload,
                { root: true }
            );
        } catch (err) {
            console.log(err);

            commit(
                EEntitiesMutations.UPSERT_ENTITY,
                { id: payload, deleteStatus: EStatus.ERROR, editError: err }
            );

        }
    }
} as ActionTree<IState, IRootState>
