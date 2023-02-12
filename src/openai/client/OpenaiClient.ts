import {Configuration, OpenAIApi} from "openai";

export default class OpenaiClient {
    private client: OpenAIApi;

    constructor() {
        this.client = this.initializeClient();
    }

    private initializeClient(): OpenAIApi {
        return new OpenAIApi(new Configuration({ apiKey: process.env.OPENAI_API_KEY }));
    }

    async createCompletion(prompt: string) {
        return this.client.createCompletion({
            model: 'text-davinci-003',
            prompt,
            temperature: 0,
            max_tokens: 30
        });
    }
}