import { IArticle } from './article.interface';
import IFormArticleValue from './form-article-value.interface';
import { IRequestGetArticlesResponse } from './request-get-articles-response.interface';
import { IRequestGetNotesResponse } from './request-get-notes-response.interface';

export interface INotesApi {
    getNotes(page: number, limitPerPage: number): Promise<IRequestGetNotesResponse>
    getNote(id: number): Promise<IArticle>
    createNote(formValue: IFormArticleValue): Promise<IArticle>
    updateNote(id: number, formValue: IFormArticleValue): Promise<IArticle>
    deleteNote(id: number): Promise<void>
}

export interface IArticlesApi {
    getArticles(page: number, limitPerPage: number): Promise<IRequestGetArticlesResponse>
    getArticle(id: number): Promise<IArticle>
    createArticle(formValue: IFormArticleValue): Promise<IArticle>
    updateArticle(id: number, formValue: IFormArticleValue): Promise<IArticle>
    deleteArticle(id: number): Promise<void>
}

export interface IApi {
    articles: IArticlesApi;
    notes: INotesApi;
}
