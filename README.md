# Knight Dev

<p align="center">
  <img src="https://media.githubusercontent.com/media/ttracx/knight-dev/main/demo.gif" width="100%" />
</p>

<p align="center">
  <a href="https://marketplace.visualstudio.com/items?itemName=ttracx.knight-dev" target="_blank"><strong>Download VSCode Extension</strong></a> | <a href="https://discord.gg/knightdev" target="_blank"><strong>Join the Discord</strong></a>
</p>

Thanks to [Claude 3.5 Sonnet's agentic coding capabilities](https://www-cdn.anthropic.com/fed9cc193a14b84131812372d8d5857f8f304c52/Model_Card_Knight_3_Addendum.pdf) Knight Dev can handle complex software development tasks step-by-step. With tools that let him create & edit files, explore complex projects, and execute terminal commands (after you grant permission), he can assist you in ways that go beyond simple code completion or tech support. While autonomous AI scripts traditionally run in sandboxed environments, Knight Dev provides a human-in-the-loop GUI to supervise every file changed and command executed, providing a safe and accessible way to explore the potential of agentic AI.

-   Paste images in chat to use Knight's vision capabilities and turn mockups into fully functional applications or fix bugs with screenshots
-   Review and edit diffs of every change Knight makes right in the editor, or provide feedback in chat until you're satisfied with the result
-   Executes commands directly in your terminal, keeping Knight updated on any output as he works (letting him react to server errors!)
-   Monitors workspace problems to keep Knight updated on linter/compiler/build issues, letting him proactively fix errors on his own (adding missing imports, fixing syntax errors, etc.)
-   Presents permission buttons (like 'Approve terminal command') before tool use or sending information to the API
-   Keep track of total tokens and API usage cost for the entire task loop and individual requests
-   When a task is completed, Knight determines if he can present the result to you with a terminal command like `open -a "Google Chrome" index.html`, which you run with a click of a button

_**Pro tip**: Use the `Cmd + Shift + P` shortcut to open the command palette and type `Knight Dev: Open In New Tab` to start a new task right in the editor._

## How it works

Knight Dev uses an autonomous task execution loop with chain-of-thought prompting and access to powerful tools that give him the ability to accomplish nearly any task. Start by providing a task and the loop fires off, where Knight might use certain tools (with your permission) to accomplish each step in his thought process.

### Tools

Knight Dev has access to the following capabilities:

1. **`execute_command`**: Execute terminal commands on the system (only with your permission, output is streamed into the chat)
2. **`read_file`**: Read the contents of a file at the specified path
3. **`write_to_file`**: Write content to a file at the specified path, automatically creating any necessary directories
4. **`list_files`**: List all paths for files in the specified directory. When `recursive = true`, it recursively lists all files in the directory and its nested folders (excludes files in .gitignore). When `recursive = false`, it lists only top-level files (useful for generic file operations like retrieving a file from your Desktop).
5. **`list_code_definition_names`**: Parses all source code files at the top level of the specified directory to extract names of key elements like classes and functions (see more below)
6. **`search_files`**: Search files in a specified directory for text that matches a given regex pattern (useful for refactoring code, addressing TODOs and FIXMEs, removing dead code, etc.)
7. **`ask_followup_question`**: Ask the user a question to gather additional information needed to complete a task (due to the autonomous nature of the program, this isn't a typical chatbot–Knight Dev must explicitly interrupt his task loop to ask for more information)
8. **`attempt_completion`**: Present the result to the user after completing a task, potentially with a terminal command to kickoff a demonstration

### Working in Existing Projects

When given a task in an existing project, Knight will look for the most relevant files to read and edit the same way you or I would–by first looking at the names of directories, files, classes, and functions since these names tend to reflect their purpose and role within the broader system, and often encapsulate high-level concepts and relationships that help understand a project's overall architecture. With tools like `list_code_definition_names` and `search_files`, Knight is able to extract names of various elements in a project to determine what files are most relevant to a given task without you having to mention `@file`s or `@folder`s yourself.

1. **File Structure**: When a task is started, Knight is given an overview of your project's file structure. It turns out Claude 3.5 Sonnet is _really_ good at inferring what it needs to process further just from these file names alone.

2. **Source Code Definitions**: Knight may then use the `list_code_definition_names` tool on specific directories of interest. This tool uses [tree-sitter](https://github.com/tree-sitter/tree-sitter) to parse source code with custom tag queries that extract names of classes, functions, methods, and other definitions. It works by first identifying source code files that tree-sitter can parse (currently supports `python`, `javascript`, `typescript`, `ruby`, `go`, `java`, `php`, `rust`, `c`, `c++`, `c#`, `swift`), then parsing each file into an abstract syntax tree, and finally applying a language-specific query to extract definition names (you can see the exact query used for each language in `src/parse-source-code/queries`). The results are formatted into a concise & readable output that Knight can easily interpret to quickly understand the code's structure and purpose.

3. **Search Files**: Knight can also use the `search_files` tool to search for specific patterns or content across multiple files. This tool uses [ripgrep](https://github.com/BurntSushi/ripgrep) to perform regex searches on files in a specified directory. The results are formatted into a concise & readable output that Knight can easily interpret to quickly understand the code's structure and purpose. This can be useful for tasks like refactoring function names, updating imports, addressing TODOs and FIXMEs, etc.

4. **Read Relevant Files**: With insights gained from the names of various files and source code definitions, Knight can then use the `read_file` tool to examine specific files that are most relevant to the task at hand.

By carefully managing what information is added to context, Knight can provide valuable assistance even for complex, large-scale projects without overwhelming its context window.

### Only With Your Permission

Knight always asks for your permission first before any tools are executed or information is sent back to the API. This puts you in control of this agentic loop, every step of the way.

![image](https://github.com/ttracx/knight-dev/assets/7799382/e6435441-9400-41c9-98a9-63f75c5d45be)

## Contribution

Paul Graham said it best, "if you build something now that barely works with AI, the next models will make it _really_ work." I've built this project with the assumption that scaling laws will continue to improve the quality (and cost) of AI models, and what might be difficult for Claude 3.5 Sonnet today will be effortless for future generations. That is the design philosophy I'd like to develop this project with, so it will always be updated with the best models, tools, and capabilities available–without wasting effort on implementing stopgaps like cheaper agents. With that said, I'm always open to suggestions and feedback, so please feel free to contribute to this project by submitting issues and pull requests.

To build Knight Dev locally, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/ttracx/knight-dev.git
    ```
2. Open the project in VSCode:
    ```bash
    code knight-dev
    ```
3. Install the necessary dependencies for the extension and webview-gui:
    ```bash
    npm run install:all
    ```
4. Launch by pressing `F5` (or `Run`->`Start Debugging`) to open a new VSCode window with the extension loaded. (You may need to install the [esbuild problem matchers extension](https://marketplace.visualstudio.com/items?itemName=connor4312.esbuild-problem-matchers) if you run into issues building the project.)

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.
