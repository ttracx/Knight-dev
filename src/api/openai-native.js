import OpenAI from "openai";
import { openAiNativeDefaultModelId, openAiNativeModels, } from "../shared/api";
import { convertToAnthropicMessage, convertToOpenAiMessages } from "../utils/openai-format";
import { convertO1ResponseToAnthropicMessage, convertToO1Messages } from "../utils/o1-format";
export class OpenAiNativeHandler {
    options;
    client;
    constructor(options) {
        this.options = options;
        this.client = new OpenAI({
            apiKey: this.options.openAiNativeApiKey,
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
        let createParams;
        switch (this.getModel().id) {
            case "o1-preview":
            case "o1-mini":
                createParams = {
                    model: this.getModel().id,
                    max_completion_tokens: this.getModel().info.maxTokens,
                    messages: convertToO1Messages(convertToOpenAiMessages(messages), systemPrompt),
                };
                break;
            default:
                createParams = {
                    model: this.getModel().id,
                    max_completion_tokens: this.getModel().info.maxTokens,
                    messages: openAiMessages,
                    tools: openAiTools,
                    tool_choice: "auto",
                };
                break;
        }
        const completion = await this.client.chat.completions.create(createParams);
        const errorMessage = completion.error?.message;
        if (errorMessage) {
            throw new Error(errorMessage);
        }
        let anthropicMessage;
        switch (this.getModel().id) {
            case "o1-preview":
            case "o1-mini":
                anthropicMessage = convertO1ResponseToAnthropicMessage(completion);
                break;
            default:
                anthropicMessage = convertToAnthropicMessage(completion);
                break;
        }
        return { message: anthropicMessage };
    }
    getModel() {
        const modelId = this.options.apiModelId;
        if (modelId && modelId in openAiNativeModels) {
            const id = modelId;
            return { id, info: openAiNativeModels[id] };
        }
        return { id: openAiNativeDefaultModelId, info: openAiNativeModels[openAiNativeDefaultModelId] };
    }
}
//# sourceMappingURL=openai-native.js.map