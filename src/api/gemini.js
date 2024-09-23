import { FunctionCallingMode, GoogleGenerativeAI } from "@google/generative-ai";
import { geminiDefaultModelId, geminiModels } from "../shared/api";
import { convertAnthropicMessageToGemini, convertAnthropicToolToGemini, convertGeminiResponseToAnthropic, } from "../utils/gemini-format";
export class GeminiHandler {
    options;
    client;
    constructor(options) {
        if (!options.geminiApiKey) {
            throw new Error("API key is required for Google Gemini");
        }
        this.options = options;
        this.client = new GoogleGenerativeAI(options.geminiApiKey);
    }
    async createMessage(systemPrompt, messages, tools) {
        const model = this.client.getGenerativeModel({
            model: this.getModel().id,
            systemInstruction: systemPrompt,
            tools: [{ functionDeclarations: tools.map(convertAnthropicToolToGemini) }],
            toolConfig: {
                functionCallingConfig: {
                    mode: FunctionCallingMode.AUTO,
                },
            },
        });
        const result = await model.generateContent({
            contents: messages.map(convertAnthropicMessageToGemini),
            generationConfig: {
                maxOutputTokens: this.getModel().info.maxTokens,
            },
        });
        const message = convertGeminiResponseToAnthropic(result.response);
        return { message };
    }
    getModel() {
        const modelId = this.options.apiModelId;
        if (modelId && modelId in geminiModels) {
            const id = modelId;
            return { id, info: geminiModels[id] };
        }
        return { id: geminiDefaultModelId, info: geminiModels[geminiDefaultModelId] };
    }
}
//# sourceMappingURL=gemini.js.map