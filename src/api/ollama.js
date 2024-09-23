import OpenAI from "openai";
import { openAiModelInfoSaneDefaults } from "../shared/api";
import { convertToAnthropicMessage, convertToOpenAiMessages } from "../utils/openai-format";
export class OllamaHandler {
    options;
    client;
    constructor(options) {
        this.options = options;
        this.client = new OpenAI({
            baseURL: (this.options.ollamaBaseUrl || "http://localhost:11434") + "/v1",
            apiKey: "ollama",
        });
    }
    async createMessage(systemPrompt, messages, tools) {
        const openAiMessages = [
            { role: "system", content: systemPrompt },
            ...convertToOpenAiMessages(messages),
        ];
        const openAiTools = tools.map((tool) => ({
            type: "function",
            function: {
                name: tool.name,
                description: tool.description,
                parameters: tool.input_schema,
            },
        }));
        const createParams = {
            model: this.options.ollamaModelId ?? "",
            messages: openAiMessages,
            tools: openAiTools,
            tool_choice: "auto",
        };
        const completion = await this.client.chat.completions.create(createParams);
        const errorMessage = completion.error?.message;
        if (errorMessage) {
            throw new Error(errorMessage);
        }
        const anthropicMessage = convertToAnthropicMessage(completion);
        return { message: anthropicMessage };
    }
    getModel() {
        return {
            id: this.options.ollamaModelId ?? "",
            info: openAiModelInfoSaneDefaults,
        };
    }
}
//# sourceMappingURL=ollama.js.map