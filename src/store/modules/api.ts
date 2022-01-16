import {ref, Ref} from "vue";
import { Api as ApiInterface } from '../../services/api/webApi';
import store from '../../store';

export default class Api {
    private static instance: Api;
    private registeredApi: Ref<ApiInterface | undefined> = ref(undefined);
    private initialized = ref(false);
    private error = ref(false);

    private constructor() {
        // keep it private
    }

    public static getInstance(): Api {
        if (!Api.instance) {
            Api.instance = new Api();
        }

        return Api.instance;
    }

    async initialize(api: ApiInterface): Promise<void> {
        if (this.initialized.value === true) {
            return;
        }

        this.registeredApi.value = api;

        try {
            await store.example.fetchExamples();
        } catch (e) {
            this.error.value = true;
        } finally {
            this.initialized.value = true;
        }
    }

    getRegisteredApi(): ApiInterface {
        if (this.registeredApi.value === undefined) {
            throw new Error('Api is not registered');
        }

        return this.registeredApi.value;
    }

    hasError(): boolean {
        return this.error.value;
    }

    isInitialized(): boolean {
        return this.initialized.value;
    }
}