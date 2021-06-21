import { MutationTree } from 'vuex';
import { ECommonMutations } from '~/store-utils/common/mutations';

import { IState } from './state';
import EStatus from '~/types/status.enum';
import { IRequestGetArticlesResponse } from '~/types/request-get-articles-response.interface';
import { EEntitiesMutations, mutationUpsertEntitiesFactory } from '~/utils/store-entities';

export default {
    [ECommonMutations.GET]: (state: IState): void => {
        state.getStatus = EStatus.PROCESSING;
        state.getError = null;
    },
    [ECommonMutations.GET_ERROR]: (state: IState, error: any): void => {
        state.getStatus = EStatus.ERROR;
        state.getError = error;
    },
    [ECommonMutations.GET_SUCCESS]: (state: IState, payload: IRequestGetArticlesResponse) => {
        state.getStatus = EStatus.SUCCESS;
        state.entity = payload.pagination;
        state.items = payload.articles.map(a => a.id);
    },
    [EEntitiesMutations.UPSERT_ENTITIES]: mutationUpsertEntitiesFactory('id')
} as MutationTree<IState>;
