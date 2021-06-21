import EStatus from '~/types/status.enum';

export default abstract class AbstractServiceForm<TypeFormValue> {
    public abstract formValue: TypeFormValue;

    public abstract submitStatus: EStatus;

    public abstract submitError: any;

    public abstract submit(formValue: TypeFormValue): void;
}
