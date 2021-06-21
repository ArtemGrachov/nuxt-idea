import { IArticle } from '~/types/article.interface';
import IFormArticleValue from '~/types/form-article-value.interface';
import { IRequestGetArticlesResponse } from '~/types/request-get-articles-response.interface';
import { IRequestGetNotesResponse } from '~/types/request-get-notes-response.interface';

const ARTICLES: IArticle[] = [
    {
        id: 1,
        content: 'Article #1'
    },
    {
        id: 2,
        content: 'Article #2'
    },
    {
        id: 3,
        content: 'Article #3'
    },
    {
        id: 4,
        content: 'Article #4'
    },
    {
        id: 5,
        content: 'Article #5'
    },
    {
        id: 6,
        content: 'Article #6'
    },
    {
        id: 7,
        content: 'Article #7'
    },
    {
        id: 8,
        content: 'Article #8'
    },
];

const NOTES: IArticle[] = [

    {
        id: 1,
        content: 'Note #1'
    },
    {
        id: 2,
        content: 'Note #2'
    },
    {
        id: 3,
        content: 'Note #3'
    },
    {
        id: 4,
        content: 'Note #4'
    },
    {
        id: 5,
        content: 'Note #5'
    },
    {
        id: 6,
        content: 'Note #6'
    },
    {
        id: 7,
        content: 'Note #7'
    },
    {
        id: 8,
        content: 'Note #8'
    },
];

export const MOCK_ARTICLE_API = {
    async getArticles(page: number, limitPerPage: number): Promise<IRequestGetArticlesResponse> {
        return JSON.parse(JSON.stringify({
            articles: ARTICLES.slice((page - 1) * limitPerPage, limitPerPage),
            pagination: {
                pages: Math.ceil(ARTICLES.length / limitPerPage),
                totalItems: ARTICLES.length,
                page,
                limitPerPage
            }
        }));
    },
    async getArticle(id: number): Promise<IArticle> {
        const index: number = ARTICLES.findIndex(item => item.id === id);

        if (index === -1) {
            throw {
                response: {
                    statusCode: 404,
                    data: {
                        message: 'Not found'
                    }
                }
            };
        }

        return JSON.parse(JSON.stringify(ARTICLES[index]));
    },
    async createArticle(formValue: IFormArticleValue): Promise<IArticle> {
        const newItem: IArticle = {
            ...formValue,
            id: new Date().getTime()
        };

        ARTICLES.push(newItem);

        return JSON.parse(JSON.stringify(newItem));
    },
    async updateArticle(id: number, formValue: IFormArticleValue): Promise<IArticle> {
        const index: number = ARTICLES.findIndex(item => item.id === id);

        if (index === 1) {
            throw {
                response: {
                    statusCode: 404,
                    data: {
                        message: 'Not found'
                    }
                }
            };
        }

        const oldItem: IArticle = ARTICLES[index];
        const newItem: IArticle = { ...oldItem, ...formValue };

        ARTICLES.splice(index, 1, newItem);

        return JSON.parse(JSON.stringify(newItem));
    },
    async deleteArticle(id: number): Promise<void> {
        const index: number = ARTICLES.findIndex(item => item.id === id);

        if (index === 1) {
            throw {
                response: {
                    statusCode: 404,
                    data: {
                        message: 'Not found'
                    }
                }
            };
        }

        ARTICLES.splice(index, 1);
    }
}

export const MOCK_NOTES_API = {
    async getNotes(page: number, limitPerPage: number): Promise<IRequestGetNotesResponse> {
        return JSON.parse(JSON.stringify({
            notes: NOTES.slice((page - 1) * limitPerPage, limitPerPage),
            pagination: {
                pages: Math.ceil(NOTES.length / limitPerPage),
                totalItems: NOTES.length,
                page,
                limitPerPage
            }
        }))
    },
    async getNote(id: number): Promise<IArticle> {
        const index: number = NOTES.findIndex(item => item.id === id);

        if (index === 1) {
            throw {
                response: {
                    statusCode: 404,
                    data: {
                        message: 'Not found'
                    }
                }
            };
        }

        return JSON.parse(JSON.stringify(NOTES[index]));
    },
    async createNote(formValue: IFormArticleValue): Promise<IArticle> {
        const newItem: IArticle = {
            ...formValue,
            id: new Date().getTime()
        };

        NOTES.push(newItem);

        return JSON.parse(JSON.stringify(newItem));
    },
    async updateNote(id: number, formValue: IFormArticleValue): Promise<IArticle> {
        const index: number = NOTES.findIndex(item => item.id === id);

        if (index === 1) {
            throw {
                response: {
                    statusCode: 404,
                    data: {
                        message: 'Not found'
                    }
                }
            };
        }

        const oldItem: IArticle = NOTES[index];
        const newItem: IArticle = { ...oldItem, ...formValue };

        NOTES.splice(index, 1, newItem);

        return JSON.parse(JSON.stringify(newItem));
    },
    async deleteNote(id: number): Promise<void> {
        const index: number = NOTES.findIndex(item => item.id === id);

        if (index === 1) {
            throw {
                response: {
                    statusCode: 404,
                    data: {
                        message: 'Not found'
                    }
                }
            };
        }

        NOTES.splice(index, 1);
    }
}
