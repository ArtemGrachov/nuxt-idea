import { GetterTree } from 'vuex';

import { IRootState } from '~/store-utils/state.interface';
import { EFormGetters, getterFormValue } from '~/utils/store-form';

import { IState } from './state';

export default {
    [EFormGetters.FORM_VALUE]: getterFormValue,
} as GetterTree<IState, IRootState>;
