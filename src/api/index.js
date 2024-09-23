import { AnthropicHandler } from "./anthropic";
import { AwsBedrockHandler } from "./bedrock";
import { OpenRouterHandler } from "./openrouter";
import { VertexHandler } from "./vertex";
import { OpenAiHandler } from "./openai";
import { OllamaHandler } from "./ollama";
import { GeminiHandler } from "./gemini";
import { OpenAiNativeHandler } from "./openai-native";
export function buildApiHandler(configuration) {
    const { apiProvider, ...options } = configuration;
    switch (apiProvider) {
        case "anthropic":
            return new AnthropicHandler(options);
        case "openrouter":
            return new OpenRouterHandler(options);
        case "bedrock":
            return new AwsBedrockHandler(options);
        case "vertex":
            return new VertexHandler(options);
        case "openai":
            return new OpenAiHandler(options);
        case "ollama":
            return new OllamaHandler(options);
        case "gemini":
            return new GeminiHandler(options);
        case "openai-native":
            return new OpenAiNativeHandler(options);
        default:
            return new AnthropicHandler(options);
    }
}
//# sourceMappingURL=index.js.map