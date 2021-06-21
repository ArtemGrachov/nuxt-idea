import { GetterTree } from 'vuex';

import { IRootState } from '~/store-utils/state.interface';
import { STORE_TOKENS } from '~/store-utils/tokens';

import { IState } from './state';
import { IArticle } from '~/types/article.interface';
import { IScopedArticle } from '~/types/scoped-article.interface';

import { ECommonGetters } from '~/store-utils/common/getters';
import { EEntitiesGetters } from '~/utils/store-entities';
import { EListGetters, getterList } from '~/utils/store-list';

export enum EGetters {
    NOTES = 'notes'
}

export default {
    [ECommonGetters.GET_STATUS]: state => state.getStatus,
    [ECommonGetters.GET_ERROR]: state => state.getError,
    [ECommonGetters.PAGINATION]: state => state.entity,
    [EEntitiesGetters.ENTITIES]: state => state.entities,
    [EListGetters.LIST]: getterList,
    [EGetters.NOTES]: (state, getters, rootState, rootGetters) => {
        return getters[EListGetters.LIST].map((articleId: number) => {
            const scopedArticle: IScopedArticle = state.entities[articleId];

            if (!scopedArticle) {
                return null;
            }

            const data: IArticle = rootGetters[`${STORE_TOKENS.DATA_NOTES}/${EEntitiesGetters.ENTITIES}`][scopedArticle.id];

            return {
                ...scopedArticle,
                data
            };
        });
    }
} as GetterTree<IState, IRootState>;
