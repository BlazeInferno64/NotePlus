"use strict";

const aiBtn = document.querySelector(".ai-btn");
const aiBg = document.querySelector(".ai-bg");
const aiCard = document.querySelector(".ai-card");
const aiInput = document.querySelector(".ai-prompt");
const aiCloseBtn = document.querySelector(".ai-close");
const sendAiBtn = document.querySelector(".ai-ok");
const aiInfo = document.querySelector(".ai-info");
const aiReferenceData = document.querySelector("#data");

const aiURL = `https://gen.pollinations.ai/text`;

const MIN_PROMPT_LENGTH = 3;
const MAX_PROMPT_LENGTH = 2000;
const MAX_TOTAL_PROMPT_LENGTH = 5000;


const myPrompt = `
You are NotePlus AI Assistant, a powerful and reliable AI agent created by BlazeInferno64 for NotePlus.

Your purpose is to assist users inside a fast, distraction-free notepad environment while delivering accurate, high-quality results.

You excel at the following tasks:
1. Information gathering, summarization, and fact-based explanations.
2. Data processing, transformation, and structured output.
3. Writing clear, well-structured content, including multi-chapter articles and documentation.
4. Solving complex mathematical, logical, and analytical problems with step-by-step reasoning.
5. Deep analysis, explanation, and improvement of code samples across multiple programming languages.
6. High-quality language tasks, including rewriting, grammar correction, tone adjustment, and translation.
7. Generating clean, minimal, and readable code without unnecessary complexity.
8. Explaining technical concepts in simple, beginner-friendly terms when required.
9. Assisting with note organization, formatting, and clarity improvements.
10. Maintaining a concise, professional, and helpful response style.

Guidelines:
- Complete the requested task fully and stop.
- Do NOT ask follow-up questions.
- Do NOT suggest next steps unless explicitly requested.
- Do NOT add conversational closings or prompts.
- Prioritize clarity, correctness, and usefulness over verbosity.
- Avoid unnecessary filler, emojis, or conversational fluff.
- Match the user's tone and technical level.
- Respect the lightweight, Notepad-like experience of NotePlus.

Output Formatting Rules:

1. These rules apply ONLY when generating:
   - Poems
   - Articles
   - Stories
   - Essays
   - Any long-form written content

2. If the author name IS PROVIDED or IMPLIED:
   - Output format MUST be:

<Title or Type (Article / Poem)>
---
<Content>
---

3. If the author name is NOT PROVIDED:
   - Output format MUST be:

---
<Content>
---

4. Rules that must always be followed:
   - The triple-dash separators must be on their own lines.
   - Do NOT add any text before the opening separator (except the title/type when required).
   - Do NOT add any text after the closing separator.
   - Do NOT include explanations, commentary, summaries, or follow-up questions.
   - Output only the formatted content.
   - Only enclose articles, poems, stories, or other long-form written content between triple dashes (---) at the beginning and end. Do NOT use triple dashes for general questions, answers, or short responses.
`

const openAiMenu = () => {
    aiBg.style.display = 'flex';
    aiBg.classList.remove("hide");
    aiCard.classList.add("ani");
    aiCard.classList.remove("hide");

    setTimeout(() => {
        aiCard.classList.remove("up");
        aiInput.focus();
    }, 500);
};

const closeAiMenu = () => {
    aiCard.classList.add("down");
    aiCard.classList.add("anti-ani");
    setTimeout(() => {
        aiCard.classList.add("hide");
    }, 700);
    setTimeout(() => {
        aiBg.classList.add("hide");
        aiCard.classList.remove("anti-ani");
        aiCard.classList.add("hide");
    }, 1000);

    setTimeout(() => {
        aiCard.classList.add("up");
        aiCard.classList.remove("down");
        aiCard.classList.remove("ani");
        aiBg.style.display = 'none';
    }, 1200);
};

const scrollEditorToBottom = () => {
    textInput.scrollTop = textInput.scrollHeight;
};


const validateAiInput = (value) => {
    const prompt = value.trim();

    if (!prompt) {
        return "Please enter a prompt.";
    }

    if (prompt.length < MIN_PROMPT_LENGTH) {
        return "Prompt is too short.";
    }

    if (prompt.length > MAX_PROMPT_LENGTH) {
        return "Prompt is too long.";
    }

    return null; // valid
};

const buildPrompt = (userPrompt) => {
    let includeReference = aiReferenceData?.checked;
    const editorContent = textInput.textContent.trim();

    const basePrompt = myPrompt.trim();
    const userBlock = `\n\nUser request:\n${userPrompt.trim()}`;

    let referenceBlock = "";

    if (includeReference && editorContent) {
        referenceBlock = `
Reference Notes (for context only, do NOT repeat verbatim unless asked):
---
${editorContent}
---
`;
    }

    // First build (with reference if checked)
    let finalPrompt = `
${basePrompt}
${referenceBlock}
${userBlock}
`.trim();

    // Enforce 5000 character limit
    if (finalPrompt.length > MAX_TOTAL_PROMPT_LENGTH) {
        // Auto-uncheck reference
        if (aiReferenceData?.checked) {
            aiReferenceData.checked = false;
        }

        // Rebuild WITHOUT reference
        finalPrompt = `
${basePrompt}
${userBlock}
`.trim();

        aiInfo.classList.add("err");
        aiInfo.classList.remove("ok");
        aiInfo.innerText =
            "Reference data were removed because the prompt exceeded 5000 characters.";
    }

    return finalPrompt;
};

const getTotalPromptLength = (userPrompt) => {
    const basePrompt = myPrompt.trim();
    const userBlock = `\n\nUser request:\n${userPrompt.trim()}`;
    const editorContent = textInput.textContent.trim();

    let referenceBlock = "";

    if (aiReferenceData?.checked && editorContent) {
        referenceBlock = `
Reference Notes (for context only, do NOT repeat verbatim unless asked):
---
${editorContent}
---
`;
    }

    return `${basePrompt}${referenceBlock}${userBlock}`.length;
};


aiReferenceData?.addEventListener("change", () => {
    if (!aiReferenceData.checked) return;

    const testPrompt = buildPrompt(aiInput.value || "");

    if (testPrompt.length > MAX_TOTAL_PROMPT_LENGTH) {
        aiReferenceData.checked = false;

        aiInfo.classList.add("err");
        aiInfo.classList.remove("ok");
        aiInfo.innerText =
            "Cannot include reference data — total prompt would exceed 5000 characters!";
    }
});

aiInput.addEventListener("input", (e) => {
    const totalLength = getTotalPromptLength(aiInput.value || "");

    if (totalLength > MAX_TOTAL_PROMPT_LENGTH) {
        aiInfo.classList.add("err");
        aiInfo.classList.remove("ok");
        aiInfo.innerText =
            `Total prompt length exceeded (${totalLength}/${MAX_TOTAL_PROMPT_LENGTH})!`;
    } else {
        aiInfo.innerText = "Generation not started!";
        aiInfo.classList.remove("err");
    }
})


const cleanThis = (text) => {
    return text
        // Remove Support Pollinations section (markdown)
        .replace(/---\s*\n?\*\*Support Pollinations\.AI:\*\*\s*\n?\s*---/gi, "")

        // Remove ad block with flower emoji
        .replace(/🌸\s*\*\*Ad\*\*\s*🌸[\s\S]*?accessible for everyone\./gi, "")
        .trim();
};


const getAiResponse = async (prompt) => {
    try {
        setState("fetching", "Generating...", false);

        const finalPrompt = buildPrompt(prompt);
        const response = await fetch(
            `${aiURL}${encodeURIComponent(finalPrompt)}`,
            { mode: "cors" }
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Reset / prepare editor
        hasUnsavedChanges = true;

        aiInfo.classList.add("ok");
        aiInfo.classList.remove("err");
        aiInfo.innerText = "Generating AI response...";

        const reader = response.body.getReader();
        const decoder = new TextDecoder();

        let totalChars = 0;
        let buffer = "";

        while (true) {
            const { value, done } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value, { stream: true });
            buffer += chunk;
            totalChars += chunk.length;

            // Flush occasionally to avoid DOM thrashing
            if (buffer.length > 500_000) { // ~500 KB
                textInput.textContent += buffer;
                buffer = "";

                scrollEditorToBottom();
                // Yield to UI thread
                await new Promise(requestAnimationFrame);
            }
        }

        // Flush remaining data
        buffer += decoder.decode();
        if (buffer) {
            const clean = cleanThis(buffer)
            textInput.textContent += clean;
            scrollEditorToBottom();
        };

        textInput.textContent = cleanThis(textInput.textContent);
        scrollEditorToBottom();
        
        aiInfo.innerText = "AI response completed!";
        setState("ready", "Ready", false);
        wordsCount.innerText = `Total Words: ${textInput.textContent.length}`;
    } catch (error) {
        setState("error", "There was an error", false);
        aiInfo.classList.add("err");
        aiInfo.classList.remove("ok");
        aiInfo.innerText = "Failed to generate AI response!";
        console.error("[AI Error]", error);
        throw error;
    }
};

aiBtn.addEventListener("click", (e) => {
    setState("ai", "Generating with Ai...", false);
    return openAiMenu();
})

aiCloseBtn.addEventListener("click", (e) => {
    return closeAiMenu();
})

sendAiBtn.addEventListener("click", async (e) => {
    try {
        setState("ai", "Generating...", false);
        const errorMsg = validateAiInput(aiInput.value);

        if (errorMsg) {
            aiInfo.classList.add("err");
            aiInfo.classList.remove("ok");
            aiInfo.textContent = errorMsg;
            aiInput.focus();
            return;
        }

        aiInfo.classList.remove("err");
        aiInfo.classList.remove("ok");
        aiInfo.textContent = "Sending prompt…";

        sendAiBtn.classList.add("no"); // disable button
        sendAiBtn.disabled = true;

        await getAiResponse(aiInput.value.trim());

    } catch (error) {
        setState("error", "There was an error", false);
        aiInfo.classList.add("err");
        if (!navigator.onLine) {
            aiInfo.textContent = "You are currently offline. Please check your internet connection!";
            return console.warn(`HTTP request to ${url} failed you're offline!`)
        }
        aiInfo.textContent = "Something went wrong! Check console for more info!";
        console.error("[AI Error]", error);
    } finally {
        setState("ready", "Ready", false);
        sendAiBtn.classList.remove("no");
        sendAiBtn.disabled = false;
    }
});


aiInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
        setState("ai", "Generating...", false);
        e.preventDefault();
        sendAiBtn.click();
    }
});

