import AnthropicBedrock from "@anthropic-ai/bedrock-sdk";
import { bedrockDefaultModelId, bedrockModels } from "../shared/api";
// https://docs.anthropic.com/en/api/knight-on-amazon-bedrock
export class AwsBedrockHandler {
    options;
    client;
    constructor(options) {
        this.options = options;
        this.client = new AnthropicBedrock({
            // Authenticate by either providing the keys below or use the default AWS credential providers, such as
            // using ~/.aws/credentials or the "AWS_SECRET_ACCESS_KEY" and "AWS_ACCESS_KEY_ID" environment variables.
            ...(this.options.awsAccessKey ? { awsAccessKey: this.options.awsAccessKey } : {}),
            ...(this.options.awsSecretKey ? { awsSecretKey: this.options.awsSecretKey } : {}),
            ...(this.options.awsSessionToken ? { awsSessionToken: this.options.awsSessionToken } : {}),
            // awsRegion changes the aws region to which the request is made. By default, we read AWS_REGION,
            // and if that's not present, we default to us-east-1. Note that we do not read ~/.aws/config for the region.
            awsRegion: this.options.awsRegion,
        });
    }
    async createMessage(systemPrompt, messages, tools) {
        const message = await this.client.messages.create({
            model: this.getModel().id,
            max_tokens: this.getModel().info.maxTokens,
            system: systemPrompt,
            messages,
            tools,
            tool_choice: { type: "auto" },
        });
        return { message };
    }
    getModel() {
        const modelId = this.options.apiModelId;
        if (modelId && modelId in bedrockModels) {
            const id = modelId;
            return { id, info: bedrockModels[id] };
        }
        return { id: bedrockDefaultModelId, info: bedrockModels[bedrockDefaultModelId] };
    }
}
//# sourceMappingURL=bedrock.js.map