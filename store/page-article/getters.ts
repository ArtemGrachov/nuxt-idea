import { GetterTree } from 'vuex';
import { ECommonGetters } from '~/store-utils/common/getters';
import { IRootState } from '~/store-utils/state.interface';
import { IState } from './state';

export default {
    [ECommonGetters.GET_STATUS]: state => state.getStatus,
    [ECommonGetters.GET_ERROR]: state => state.getError,
    [ECommonGetters.DELETE_STATUS]: state => state.deleteStatus,
    [ECommonGetters.DELETE_ERROR]: state => state.deleteError
} as GetterTree<IState, IRootState>;
