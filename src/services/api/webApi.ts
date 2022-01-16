// @ts-ignore
import axios from "axios";
import { ExampleItems } from '../../store/modules/example';

export interface Api {
    fetchExamples(): Promise<ExampleItems>;
}

export default class WebApi {
    private static instance: WebApi;
    private readonly baseUrl: string;

    private constructor() {
        this.baseUrl = 'http://localhost:8000/api';
    }

    public static getInstance(): WebApi {
        if (!WebApi.instance) {
            WebApi.instance = new WebApi();
        }

        return WebApi.instance;
    }

    async fetchExamples(): Promise<ExampleItems> {
        const { data } = await axios.get<{ examples: ExampleItems }>(
            this.url('examples')
        );

        return data.examples;
    }

    private url(endpoint: string): string {
        return `${this.baseUrl}/${endpoint}`;
    }
}