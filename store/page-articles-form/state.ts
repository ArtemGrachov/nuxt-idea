import EStatus from '~/types/status.enum';
import { IFormState } from '~/utils/store-form';
import IFormArticleValue from '~/types/form-article-value.interface';

export interface IState extends IFormState<IFormArticleValue> {}

export default (): IState => {
    return {
        form: {
            content: ''
        },
        submitStatus: EStatus.INIT,
        submitError: null
    };
}
