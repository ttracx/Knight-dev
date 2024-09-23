import OpenAI, { AzureOpenAI } from "openai";
import { openAiModelInfoSaneDefaults } from "../shared/api";
import { convertToAnthropicMessage, convertToOpenAiMessages } from "../utils/openai-format";
export class OpenAiHandler {
    options;
    client;
    constructor(options) {
        this.options = options;
        // Azure API shape slightly differs from the core API shape: https://github.com/openai/openai-node?tab=readme-ov-file#microsoft-azure-openai
        if (this.options.openAiBaseUrl?.toLowerCase().includes("azure.com")) {
            this.client = new AzureOpenAI({
                baseURL: this.options.openAiBaseUrl,
                apiKey: this.options.openAiApiKey,
                // https://learn.microsoft.com/en-us/azure/ai-services/openai/api-version-deprecation
                // https://learn.microsoft.com/en-us/azure/ai-services/openai/reference#api-specs
                apiVersion: "2024-08-01-preview",
            });
        }
        else {
            this.client = new OpenAI({
                baseURL: this.options.openAiBaseUrl,
                apiKey: this.options.openAiApiKey,
            });
        }
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
            model: this.options.openAiModelId ?? "",
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
            id: this.options.openAiModelId ?? "",
            info: openAiModelInfoSaneDefaults,
        };
    }
}
//# sourceMappingURL=openai.js.map