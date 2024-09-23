import { AnthropicVertex } from "@anthropic-ai/vertex-sdk";
import { vertexDefaultModelId, vertexModels } from "../shared/api";
// https://docs.anthropic.com/en/api/knight-on-vertex-ai
export class VertexHandler {
    options;
    client;
    constructor(options) {
        this.options = options;
        this.client = new AnthropicVertex({
            projectId: this.options.vertexProjectId,
            // https://cloud.google.com/vertex-ai/generative-ai/docs/partner-models/use-knight#regions
            region: this.options.vertexRegion,
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
        if (modelId && modelId in vertexModels) {
            const id = modelId;
            return { id, info: vertexModels[id] };
        }
        return { id: vertexDefaultModelId, info: vertexModels[vertexDefaultModelId] };
    }
}
//# sourceMappingURL=vertex.js.map