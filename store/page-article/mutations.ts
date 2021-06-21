import { MutationTree } from 'vuex';

import { ECommonMutations } from '~/store-utils/common/mutations';
import { IArticle } from '~/types/article.interface';
import EStatus from '~/types/status.enum';
import scopedArticleFactory from '~/utils/scoped-article-factory';

import { IState } from './state';

export default {
    [ECommonMutations.GET]: (state: IState): void => {
        state.getStatus = EStatus.PROCESSING;
        state.getError = null;
    },
    [ECommonMutations.GET_ERROR]: (state: IState, error: any): void => {
        state.getStatus = EStatus.ERROR;
        state.getError = error;
    },
    [ECommonMutations.GET_SUCCESS]: (state: IState, payload: IArticle) => {
        state.getStatus = EStatus.SUCCESS;
        state.entity = payload.id;
    }
} as MutationTree<IState>;
