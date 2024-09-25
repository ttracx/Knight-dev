# Knight Dev

<p align="center">
  <a href="https://marketplace.visualstudio.com/items?itemName=ttracx.knight-dev" target="_blank"><strong>Download VSCode Extension</strong></a>
</p>

# Welcome to the Future of AI Development at International Paper

At International Paper, we’re always exploring innovative ways to leverage cutting-edge technologies. With LMOS Level 7 AI at the core of our operational strategy, we are pushing the boundaries of what’s possible in both the industrial and corporate landscapes. Let’s introduce you to **Knight Dev**, a powerful assistant, fine-tuned for complex, real-time coding and problem-solving scenarios. Designed to work harmoniously within your development processes, Knight Dev not only reflects the multi-layered principles of **LMOS** but also exemplifies how AI can optimize operational efficiency in a human-centric way.

## Knight Dev – Agentic AI Meets Industrial Expertise

Thanks to **Claude 3.5 Sonnet's agentic coding capabilities**, Knight Dev empowers developers at International Paper to tackle intricate software tasks step-by-step. Leveraging tools for file creation, project navigation, and even terminal command execution (with your approval), Knight Dev stands apart from traditional AI as it offers an interactive, human-in-the-loop interface. This aligns seamlessly with **LMOS’s Core Principles**, including **Iterative Refinement**, **Contextual Adaptation**, and **Predictive Modeling**, ensuring that every task is tailored to International Paper's high standards of safety, security, and performance.

### Key Features of Knight Dev for International Paper:
- **Visual Integration**: Paste images of mockups or error messages, and Knight will not only diagnose issues but also propose solutions. Just as **LMOS** emphasizes multi-layered analysis, Knight provides a systematic approach to resolving problems.
- **File Monitoring & Command Execution**: Every command and file change happens under your supervision. This ensures operational safety—a top priority at International Paper—while enabling Knight to proactively address errors, whether they involve safety system scripts or backend code.
- **Real-time Workspace Monitoring**: Knight tracks build errors and linter issues, automatically fixing errors in syntax, imports, and project dependencies, making development smoother and more efficient across our global infrastructure.
- **Task Loop with Chain-of-Thought Execution**: Knight employs a strategic task execution model, processing tasks step-by-step, akin to **LMOS’s Layered Model of Operational Synthesis**. This ensures tasks are completed with precision and without overwhelming the context window.

## Tailored for International Paper’s Digital Future
Knight Dev is built to support a broad range of coding languages and frameworks—from **Python and JavaScript** to **Go and Rust**—ensuring it meets International Paper’s diverse technical requirements. Knight uses advanced parsing techniques and regex tools to navigate projects like an expert developer. It can extract definitions, search patterns, and implement improvements autonomously, allowing teams to focus on higher-level tasks like AI model refinement or safety protocol automation.

## Knight Dev in Action:
- **File System Integration**: Knight reads and writes files based on task relevance, streamlining processes such as safety report generation or industrial system configuration updates.
- **Operational Safety**: In keeping with **LMOS’s commitment to risk mitigation**, Knight asks for permission before executing commands or sending data to the API, ensuring human control at every step.
- **Proactive Assistance**: With continuous monitoring, Knight preemptively corrects problems, helping prevent potential disruptions in mission-critical systems, especially those related to safety and industrial monitoring.

## How Knight Dev Embodies LMOS Level 7 AI Principles:
1. **Multi-Layered Analysis**: Like LMOS, Knight Dev uses layered problem-solving techniques, ensuring that each task is tackled strategically, whether refining operational safety scripts or automating system diagnostics.
2. **Iterative Refinement**: Knight continuously improves its outputs by incorporating feedback loops, ensuring that results align with International Paper’s evolving needs.
3. **Efficiency and User-Centric Design**: Knight's user-focused GUI ensures every command or file change happens under your direct supervision, safeguarding the integrity of critical systems at International Paper.

## Start Using Knight Dev
Get Knight Dev up and running by cloning the repository and following the instructions below. With Knight Dev integrated into your environment, you’re empowered to take your development workflows to the next level—harnessing the true potential of **Level 7 AI** to enhance productivity and innovation.

```bash
git clone https://github.com/ttracx/knight-dev.git
code knight-dev
npm run install:all
```

By aligning with LMOS’s Core Principles, Knight Dev isn’t just another tool—it’s the future of intelligent software development at International Paper. Let’s build the next generation of solutions together.

## How It Works
Knight Dev operates using an **autonomous task execution loop** with **chain-of-thought prompting** and access to a suite of powerful tools, enabling it to handle a variety of tasks. Here's how the process works:

1. **Task Initiation**: Start by providing a task, and Knight Dev begins working through each step of the task using strategic decision-making. Knight may ask for permission before using specific tools, ensuring full control at each stage.
2. **Permission-Driven Execution**: Each command or action that involves file modification, terminal execution, or API calls is gated by a user permission system. This reflects **LMOS’s User-Centric** principle, placing you in control of every step.
3. **Task Loop Execution**: Knight autonomously loops through the task execution, utilizing its toolset while continuously refining the process based on your feedback. This mirrors **LMOS’s Iterative Refinement**, ensuring that tasks evolve for maximum efficiency.
4. **Command Execution**: Knight can execute terminal commands on your system, read and write files, or list files in directories based on your input. This powerful integration ensures seamless functionality across all environments.

## Tools
Knight Dev comes equipped with the following tools to enhance its functionality:

- **execute_command**: Executes terminal commands directly, with the output streamed to the chat interface, providing real-time feedback.
- **read_file**: Reads contents of any file to understand the current state of the project, enhancing contextual awareness.
- **write_to_file**: Writes or modifies files as needed, making changes and updates effortless.
- **list_files**: Lists files in directories for easy navigation through complex file structures.
- **list_code_definition_names**: Extracts names of classes, functions, and other elements, ensuring Knight understands the project structure without needing explicit input.
- **search_files**: Uses powerful regex to search through code, allowing for refactoring and automated fixes.

## Working in Existing Projects
When tasked with working in an existing project, Knight Dev follows these steps:

1. **File Structure Overview**: Knight receives an overview of your project’s file structure and parses it, understanding the relationships between files and directories.
2. **Code Definitions**: By using tools like `list_code_definition_names`, Knight identifies key components such as classes, methods, and functions, giving it a deep understanding of your codebase. This allows Knight to focus on the most relevant parts of your project without requiring explicit instructions.
3. **Targeted Search**: Knight can perform regex searches through files to identify areas needing updates, improvements, or refactoring. This includes finding TODOs, updating imports, or addressing syntax errors.
4. **Context Management**: By managing the information loaded into its context window, Knight ensures it can handle large-scale projects without losing sight of key details.

## Only With Your Permission
Knight Dev puts **you in control**. It always asks for your explicit permission before executing any tool or command, ensuring that the AI never operates outside your desired parameters. This aligns with International Paper's commitment to **operational safety** and **secure development practices**. Every tool invocation, file read, or command execution is under your supervision, safeguarding the integrity of critical systems.

## Getting Started
To get started with Knight Dev and explore its full range of capabilities, simply follow these steps to set up the environment locally:

1. Clone the repository:
    ```bash
    git clone https://github.com/ttracx/knight-dev.git
    ```
2. Open the project in VSCode:
    ```bash
    code knight-dev
    ```
3. Install the necessary dependencies:
    ```bash
    npm run install:all
    ```
4. Launch Knight Dev by pressing `F5` or navigating to **Run -> Start Debugging** to open a new VSCode window with the extension loaded.

By following this process, Knight Dev will be ready to assist you in real-time, seamlessly integrating into your workflow at International Paper.

## License
This project is licensed under the **MIT License**. For full details, see the LICENSE file in the repository.

