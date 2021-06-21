import { MutationTree } from 'vuex';

import { IState } from './state';

import { EFormMutations, mutationSetFormValue } from '~/utils/store-form';
import { ECommonMutations } from '~/store-utils/common/mutations';
import EStatus from '~/types/status.enum';

export default {
    [EFormMutations.SET_FORM_FIELD]: mutationSetFormValue,
    [ECommonMutations.SUBMIT]: state => {
        state.submitStatus = EStatus.PROCESSING;
        state.submitError = null;
    },
    [ECommonMutations.SUBMIT_SUCCESS]: state => {
        state.submitStatus = EStatus.SUCCESS;
        state.submitError = null;
        state.form.content = '';
    },
    [ECommonMutations.SUBMIT_ERROR]: (state, payload: any) => {
        state.submitStatus = EStatus.ERROR;
        state.submitError = payload;
    },
    [ECommonMutations.CLEAR]: state => {
        state.submitStatus = EStatus.INIT;
        state.submitError = null;
        state.form.content = '';
    }
} as MutationTree<IState>;
