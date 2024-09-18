import { ApiConfiguration, ApiProvider } from "./api"

export interface WebviewMessage {
	type:
		| "apiConfiguration"
		| "customInstructions"
		| "alwaysAllowReadOnly"
		| "webviewDidLaunch"
		| "newTask"
		| "askResponse"
		| "clearTask"
		| "didShowAnnouncement"
		| "selectImages"
		| "exportCurrentTask"
		| "showTaskWithId"
		| "deleteTaskWithId"
		| "exportTaskWithId"
		| "resetState"
		| "requestOllamaModels"
		| "openImage"
		| "openFile"
	text?: string
	askResponse?: KnightAskResponse
	apiConfiguration?: ApiConfiguration
	images?: string[]
	bool?: boolean
}

export type KnightAskResponse = "yesButtonTapped" | "noButtonTapped" | "messageResponse"
