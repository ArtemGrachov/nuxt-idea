<template>
  <form @submit.prevent="submitHandler">
    <div>
      <textarea
        name="content"
        id="content"
        cols="30"
        rows="10"
        v-model="form.content"
      ></textarea>
    </div>
    <p>
        Submit status: {{ submitStatus || null }}
    </p>
    <p>
        Submit error: {{ submitError || null }}
    </p>
    <button type="submit">Submit</button>
  </form>
</template>

<script lang="ts">
import Vue from "vue";
import { Inject } from "nuxt-property-decorator";

import AbstractFormService from "~/services/abstract-form.service";
import IFormArticleValue from "~/types/form-article-value.interface";
import EStatus from "~/types/status.enum";

export const TOKEN_FORM_ARTICLE_SERVICE: string = "TOKEN_FORM_ARTICLE_SERVICE";

export default class ComponentFormArticle extends Vue {
    @Inject(TOKEN_FORM_ARTICLE_SERVICE)
    private formService!: AbstractFormService<IFormArticleValue>;

    public get form(): IFormArticleValue {
        return this.formService.formValue;
    }

    public get submitStatus(): EStatus {
        return this.formService.submitStatus;
    }

    public get submitError(): any {
        return this.formService.submitError;
    }

    public submitHandler(): void {
        this.formService.submit(this.form);
    }
}
</script>
