const renderBg = document.querySelector('.render-bg');
const renderCard = document.querySelector('.render-card');
const renderInputSelect = document.querySelector('#render-select');
const renderBtn = document.querySelector('.render-btn');
const iframeBtn = document.querySelector('.iframe-btn');
const closeRenderBtn = document.querySelector('.render-close');
const openRenderBtn = document.querySelector('#render-txt');

const iframeRender = document.querySelector(".render-output");

const openRenderMenu = () => {
    renderBg.style.display = 'flex';
    renderBg.classList.remove("hide");
    renderCard.classList.add("ani");
    renderCard.classList.remove("hide");

    setTimeout(() => {
        renderCard.classList.remove("up");
        renderInputSelect.focus();
    }, 500);
};

const closeRenderMenu = () => {
    renderCard.classList.add("down");
    renderCard.classList.add("anti-ani");
    setTimeout(() => {
        renderCard.classList.add("hide");
    }, 700);
    setTimeout(() => {
        renderBg.classList.add("hide");
        renderCard.classList.remove("anti-ani");
        renderCard.classList.add("hide");
    }, 1000);

    setTimeout(() => {
        renderCard.classList.add("up");
        renderCard.classList.remove("down");
        renderCard.classList.remove("ani");
        renderBg.style.display = 'none';
    }, 1200);
};

// --- CORE UTILITY: COMBINES STYLE AND DOCUMENT BOILERPLATE FOR BOTH RENDER METHOD OUTPUTS ---
const generateCompiledHTML = (engineMode, sourceText, isDarkMode) => {
    const iframeThemeCSS = isDarkMode ? `
        body { 
            background-color: #1e1e1e; 
            color: #e0e0e0; 
        }
        pre { background-color: #2d2d2d !important; color: #f8f8f2 !important; border: 1px solid #444; }
        code { background-color: rgba(255,255,255,0.1) !important; color: #ff79c6 !important; }
        blockquote { border-left: .25em solid #444 !important; color: #8b949e !important; }
        table th, table td { border: 1px solid #444 !important; }
        table tr:nth-child(2n) { background-color: #252525 !important; }
        .katex { color: #e0e0e0 !important; }
        
        pre::-webkit-scrollbar { height: 6px; }
        pre::-webkit-scrollbar-track { background: #1e1e1e; }
        pre::-webkit-scrollbar-thumb { background: #444; border-radius: 3px; }
    ` : `
        body { 
            background-color: #ffffff; 
            color: #24292e; 
        }
        pre { background-color: #f6f8fa !important; color: #24292e !important; }
        code { background-color: rgba(27,31,35,0.05) !important; color: #d73a49 !important; }
        blockquote { border-left: .25em solid #dfe2e5 !important; color: #6a737d !important; }
        table th, table td { border: 1px solid #dfe2e5 !important; }
        table tr:nth-child(2n) { background-color: #f6f8fa !important; }
        .katex { color: #000000 !important; }
        
        pre::-webkit-scrollbar { height: 6px; }
        pre::-webkit-scrollbar-track { background: #ffffff; }
        pre::-webkit-scrollbar-thumb { background: #ccc; border-radius: 3px; }
    `;

    switch (engineMode) {
        case 'h': // HTML Mode
            return `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <title>NotePlus - Live HTML View</title>
                    <style>
                        body { 
                            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; 
                            padding: 25px; 
                            line-height: 1.5; 
                            overflow-x: hidden;
                            word-wrap: break-word;
                            word-break: break-word;
                            overflow-wrap: break-word;
                        }
                        ${iframeThemeCSS}
                    </style>
                </head>
                <body>
                    ${sourceText}
                </body>
                </html>
            `;

        case 'm': // Markdown Mode
            return `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <title>NotePlus - Live Markdown Preview</title>
                    <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
                    <style>
                        body { 
                            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; 
                            padding: 25px; 
                            line-height: 1.6; 
                            overflow-x: hidden;
                            word-wrap: break-word;
                            word-break: break-word;
                            overflow-wrap: break-word;
                        }
                        pre { padding: 16px; border-radius: 6px; overflow-x: auto; max-width: 100%; white-space: pre; }
                        code { padding: .2em .4em; border-radius: 3px; font-family: monospace; word-wrap: break-word; overflow-wrap: break-word; white-space: pre-wrap; }
                        pre code { background-color: transparent !important; padding: 0 !important; color: inherit !important; white-space: pre; }
                        blockquote { padding: 0 1em; }
                        table { border-collapse: collapse; width: 100%; margin-bottom: 16px; }
                        table th, table td { padding: 6px 13px; }
                        ${iframeThemeCSS}
                    </style>
                </head>
                <body>
                    <div id="content"></div>
                    <script>
                        try {
                            const rawText = ${JSON.stringify(sourceText)};
                            document.getElementById('content').innerHTML = marked.parse(rawText);
                        } catch(e) {
                            document.getElementById('content').innerHTML = "<pre style='color:red;'>Markdown Parsing Error: " + e.message + "</pre>";
                        }
                    </script>
                </body>
                </html>
            `;

        case 'l': // LaTeX Mode
            return `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <title>NotePlus - Live LaTeX Compilation</title>
                    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex/dist/katex.min.css">
                    <script src="https://cdn.jsdelivr.net/npm/katex/dist/katex.min.js"></script>
                    <script src="https://cdn.jsdelivr.net/npm/katex/dist/contrib/auto-render.min.js"></script>
                    <style>
                        body { 
                            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; 
                            padding: 25px; 
                            line-height: 1.6; 
                            overflow-x: hidden;
                            word-wrap: break-word;
                            word-break: break-word;
                            overflow-wrap: break-word;
                        }
                        ${iframeThemeCSS}
                    </style>
                </head>
                <body>
                    <div id="latex-content" style="white-space: pre-wrap;"></div>
                    <script>
                        try {
                            const container = document.getElementById('latex-content');
                            container.textContent = ${JSON.stringify(sourceText)};
                            renderMathInElement(container, {
                                delimiters: [
                                    {left: "$$", right: "$$", display: true},
                                    {left: "$", right: "$", display: false},
                                    {left: "\\\\(", right: "\\\\)", display: false},
                                    {left: "\\\\xl", right: "\\\\\\\]", display: true}
                                ],
                                throwOnError: false
                            });
                        } catch(e) {
                            container.innerHTML = "<pre style='color:red;'>LaTeX Parsing Error: " + e.message + "</pre>";
                        }
                    </script>
                </body>
                </html>
            `;

        case 'j': // FIXED IMPLEMENTATION: Interactive JSON Tree Viewer
            const jsonThemeStyles = isDarkMode ? `
                body { background-color: #1e1e1e; color: #d4d4d4; }
                .json-key { color: #9cdcfe; font-weight: bold; }
                .json-string { color: #ce9178; }
                .json-number { color: #b5cea8; }
                .json-boolean { color: #569cd6; }
                .json-null { color: #569cd6; }
                .toggle-btn { color: #808080; cursor: pointer; margin-right: 4px; user-select: none; display: inline-block; transition: transform 0.1s; }
                .collapsed { transform: rotate(-90deg); }
                .collapsible-content { display: block; margin-left: 20px; border-left: 1px dashed #444; padding-left: 8px; }
                .hidden { display: none; }
                .bracket { color: #ffd700; font-weight: bold; }
                .error-box { background: rgba(255, 75, 75, 0.1); border: 1px solid #ff4b4b; color: #ff6b6b; padding: 15px; border-radius: 6px; font-family: monospace; }
            ` : `
                body { background-color: #ffffff; color: #333333; }
                .json-key { color: #a626a4; font-weight: bold; }
                .json-string { color: #50a14f; }
                .json-number { color: #986801; }
                .json-boolean { color: #4078f2; }
                .json-null { color: #4078f2; }
                .toggle-btn { color: #a0a0a0; cursor: pointer; margin-right: 4px; user-select: none; display: inline-block; transition: transform 0.1s; }
                .collapsed { transform: rotate(-90deg); }
                .collapsible-content { display: block; margin-left: 20px; border-left: 1px dashed #ccc; padding-left: 8px; }
                .hidden { display: none; }
                .bracket { color: #0033cc; font-weight: bold; }
                .error-box { background: rgba(249, 55, 55, 0.05); border: 1px solid rgb(249, 55, 55); color: rgb(249, 55, 55); padding: 15px; border-radius: 6px; font-family: monospace; }
            `;

            return `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <title>NotePlus - JSON Tree Viewer</title>
                    <style>
                        body { font-family: "Geist Mono", monospace, monospace; font-size: 14px; line-height: 1.5; padding: 25px; margin: 0; }
                        .json-node { margin: 2px 0; }
                        ${jsonThemeStyles}
                    </style>
                </head>
                <body>
                    <div id="json-viewer"></div>
                    <script>
                        const buildTreeDOM = (value, key = null) => {
                            const node = document.createElement('div');
                            node.className = 'json-node';

                            let keySpan = '';
                            if (key !== null) {
                                keySpan = '<span class="json-key">"' + key + '"</span>: ';
                            }

                            if (value === null) {
                                node.innerHTML = keySpan + '<span class="json-null">null</span>';
                                return node;
                            }

                            const type = typeof value;

                            if (type === 'object') {
                                const isArray = Array.isArray(value);
                                const openBracket = isArray ? '[' : '{';
                                const closeBracket = isArray ? ']' : '}';
                                const count = isArray ? value.length : Object.keys(value).length;

                                if (count === 0) {
                                    node.innerHTML = keySpan + '<span class="bracket">' + openBracket + closeBracket + '</span>';
                                    return node;
                                }

                                const summaryId = 'content_' + Math.random().toString(36).substr(2, 9);
                                
                                const header = document.createElement('div');
                                // FIXED: Replaced inline onclick string template concatenation with data attributes
                                header.innerHTML = '<span class="toggle-btn" data-target="' + summaryId + '">▼</span>' + keySpan + '<span class="bracket">' + openBracket + '</span>';
                                node.appendChild(header);

                                const contentDiv = document.createElement('div');
                                contentDiv.id = summaryId;
                                contentDiv.className = 'collapsible-content';

                                if (isArray) {
                                    value.forEach((item, index) => {
                                        contentDiv.appendChild(buildTreeDOM(item, index));
                                    });
                                } else {
                                    Object.keys(value).forEach(k => {
                                        contentDiv.appendChild(buildTreeDOM(value[k], k));
                                    });
                                }
                                node.appendChild(contentDiv);

                                const footer = document.createElement('div');
                                footer.innerHTML = '<span class="bracket" style="margin-left: 14px;">' + closeBracket + '</span>';
                                node.appendChild(footer);

                            } else {
                                let valSpan = '';
                                if (type === 'string') valSpan = '<span class="json-string">"' + value.replace(/"/g, '\\\\"') + '"</span>';
                                else if (type === 'number') valSpan = '<span class="json-number">' + value + '</span>';
                                else if (type === 'boolean') valSpan = '<span class="json-boolean">' + value + '</span>';
                                node.innerHTML = keySpan + valSpan;
                            }

                            return node;
                        };

                        // FIXED: Global Clean Event delegation layout handler
                        document.addEventListener('click', (e) => {
                            if (e.target && e.target.classList.contains('toggle-btn')) {
                                const targetId = e.target.getAttribute('data-target');
                                const content = document.getElementById(targetId);
                                if (content) {
                                    if (content.classList.contains('hidden')) {
                                        content.classList.remove('hidden');
                                        e.target.classList.remove('collapsed');
                                    } else {
                                        content.classList.add('hidden');
                                        e.target.classList.add('collapsed');
                                    }
                                }
                            }
                        });

                        try {
                            const rawData = ${JSON.stringify(sourceText)};
                            if (!rawData.trim()) {
                                document.getElementById('json-viewer').innerHTML = '<div style="color: #888; font-style: italic;">Empty Editor Document</div>';
                            } else {
                                const parsed = JSON.parse(rawData);
                                document.getElementById('json-viewer').appendChild(buildTreeDOM(parsed));
                            }
                        } catch (e) {
                            document.getElementById('json-viewer').innerHTML = \`
                                <div class="error-box">
                                    <strong>⚠️ Invalid JSON Structure Passed:</strong><br><br>
                                    \${e.message}
                                </div>
                            \`;
                        }
                    </script>
                </body>
                </html>
            `;

        default:
            resetPopupMsg();
            changePopupMsg(`Error: Unrecognized rendering engine mode selected: ${engineMode}.\nPlease choose a valid option and try again.`);
            openPopup();
            console.warn("Unrecognized compilation flag requested:", engineMode);
            return '';
    }
};

// --- CORE THEME DETECTION UTILITY ---
const checkIsDarkMode = () => {
    const mainBgColor = window.getComputedStyle(mainElement || document.body).backgroundColor;
    if (mainBgColor) {
        const rgbValues = mainBgColor.match(/\d+/g);
        if (rgbValues && rgbValues.length >= 3) {
            const r = parseInt(rgbValues[0]), g = parseInt(rgbValues[1]), b = parseInt(rgbValues[2]);
            const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
            return luminance < 0.5;
        }
    }
    return false;
};

// --- METHOD 1: RENDER EXCLUSIVELY INSIDE INLINE COMPONENT CONTAINER IFRAME ---
const renderIframeContent = () => {
    const engineMode = renderInputSelect.value;
    const sourceText = typeof textInput !== 'undefined' ? textInput.innerText : '';

    if (!sourceText || sourceText.trim().length === 0) {
        resetPopupMsg();
        changePopupMsg("There isn't any text available to render!\nTry entering some text for this to work!");
        openPopup();
        return;
    }

    if (!iframeRender) {
        console.error("Error: Iframe element reference '.render-output' could not be found.");
        return;
    }

    const isDarkMode = checkIsDarkMode();
    const generatedHTML = generateCompiledHTML(engineMode, sourceText, isDarkMode);

    if (generatedHTML) {
        iframeRender.srcdoc = generatedHTML;
        if (typeof setState === 'function') {
            setState("view", `Rendered content context via inline iframe [${engineMode.toUpperCase()}]`, false);
        }
    }
};

// --- METHOD 2: RENDER INSIDE A SEPARATE ISOLATED BROWSER POPUP WINDOW ---
const renderWindowContent = () => {
    const engineMode = renderInputSelect.value;
    const sourceText = typeof textInput !== 'undefined' ? textInput.innerText : '';

    if (!sourceText || sourceText.trim().length === 0) {
        resetPopupMsg();
        changePopupMsg("There isn't any text available to render!\nTry entering some text for this to work!");
        openPopup();
        return;
    }

    const isDarkMode = checkIsDarkMode();
    const generatedHTML = generateCompiledHTML(engineMode, sourceText, isDarkMode);

    if (!generatedHTML) return;

    const width = 900;
    const height = 700;
    const left = (window.screen.width - width) / 2;
    const top = (window.screen.height - height) / 2;

    const previewWindow = window.open(
        "",
        "_blank",
        `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes,status=no,toolbar=no,menubar=no`
    );

    if (previewWindow) {
        previewWindow.document.open();
        previewWindow.document.write(generatedHTML);
        previewWindow.document.close();

        if (typeof setState === 'function') {
            setState("view", `Rendered content context via detached popout window [${engineMode.toUpperCase()}]`, false);
        }
    } else {
        resetPopupMsg();
        changePopupMsg("Unable to open preview window. Please allow pop-ups for NotePlus to use this feature.");
        openPopup();
        //alert("Pop-up Blocked! Please allow pop-ups for NotePlus to open previews in a separate window.");
    }
};

// --- INITIALIZATION BLOCK FOR DUMMY PLACEHOLDER TEXT ON WINDOW LOAD ---
const initializeIframePlaceholder = () => {
    if (!iframeRender) return;

    const isDarkMode = checkIsDarkMode();
    const bg = isDarkMode ? '#1e1e1e' : '#ffffff';
    const textColor = isDarkMode ? '#888888' : '#666666';
    const subTextColor = isDarkMode ? '#555555' : '#999999';
    const highlightColor = '#007bff';

    iframeRender.srcdoc = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <style>
                body {
                    background-color: ${bg};
                    color: ${textColor};
                    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    height: 90vh;
                    margin: 0;
                    text-align: center;
                    padding: 20px;
                    box-sizing: border-box;
                    user-select: none;
                }
                .container { max-width: 400px; }
                .icon { font-size: 48px; margin-bottom: 16px; color: ${highlightColor}; opacity: 0.8; }
                h3 { margin: 0 0 10px 0; font-size: 1.25rem; font-weight: 600; }
                p { margin: 0; font-size: 0.9rem; line-height: 1.5; color: ${subTextColor}; }
                .button-highlight {
                    display: inline-block;
                    background-color: rgba(0, 123, 255, 0.1);
                    color: ${highlightColor};
                    padding: 2px 8px;
                    border-radius: 4px;
                    font-weight: 500;
                    font-size: 0.85rem;
                    margin-top: 8px;
                    border: 1px dashed rgba(0, 123, 255, 0.3);
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="icon">📝</div>
                <h3>No Content Rendered Yet Inside The iFrame</h3>
                <p>Your compilation preview is ready. Type your work, select an engine option, and click either render option to format your output!</p>
                <div class="button-highlight">Powered by NotePlus Render Engine</div>
            </div>
        </body>
        </html>
    `;
};

// --- EVENT ROUTING SELECTION ATTACHMENTS ---
if (iframeBtn) iframeBtn.addEventListener('click', renderIframeContent);
if (renderBtn) renderBtn.addEventListener('click', renderWindowContent);
if (closeRenderBtn) closeRenderBtn.addEventListener('click', closeRenderMenu);
if (openRenderBtn) openRenderBtn.addEventListener('click', openRenderMenu);

if (renderBg) {
    renderBg.addEventListener('click', (e) => {
        if (e.target === renderBg) {
            closeRenderMenu();
        }
    });
}

window.addEventListener('DOMContentLoaded', initializeIframePlaceholder);
if (document.readyState === "complete" || document.readyState === "interactive") {
    initializeIframePlaceholder();
}