import { reactive, ShallowReactive } from 'vue';
import store from '../../store';

export type Example = {
    id: number;
    name: string;
    logo: string;
};

export type ExampleItems = {
    [key: number]: Example;
};

export default class Examples {
    private static instance: Examples;
    private examples: ShallowReactive<ExampleItems> = reactive({});

    private constructor() {
        // keep it private
    }

    public static getInstance(): Examples {
        if (!Examples.instance) {
            Examples.instance = new Examples();
        }

        return Examples.instance;
    }

    async fetchExamples(): Promise<void> {
        this.examples = await store.api.getRegisteredApi().fetchExamples();
    }

    getExamples(): Example[] {
        return Object.values(this.examples) as Example[];
    }

    getExampleById(id: number): Example {
        const example = this.examples[id] || null;

        if (example === undefined) {
            throw new Error(`Example ${id} not found`);
        }

        return example;
    }
}