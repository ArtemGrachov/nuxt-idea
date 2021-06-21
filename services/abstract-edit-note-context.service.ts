import IFormArticleValue from '~/types/form-article-value.interface';

export default abstract class AbstractEditNoteContextService {
    public abstract submit(noteId: number, formValue: IFormArticleValue): void;

    public abstract formMapper(noteId: number): any;
}
