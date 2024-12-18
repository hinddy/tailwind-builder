const preview = document.getElementById("preview");
const blocksList = document.getElementById("blocks");
const modeToggle = document.getElementById("mode-toggle");
const configTextarea = document.getElementById("config-textarea");
const exportHtmlBtn = document.getElementById("export-html-btn");
const exportHtmlBtnMobile = document.getElementById("exportHtmlBtnMobile");
const exportProjectBtn = document.getElementById("export-project-btn");
const importProjectInput = document.getElementById("import-project");
const configBtn = document.getElementById("config-btn");
const configModal = document.getElementById("config-modal");
const saveConfigBtn = document.getElementById("save-config");
const fullscreenEditorButton = document.getElementById('fullscreenEditor');
const fullscreenEditorModal = document.getElementById('fullscreenEditorModal');
const closeFullscreenButton = document.getElementById('closeFullscreenButton');
const closeFullscreenEditorButton = document.getElementById('closeFullscreenEditorButton');
const clearCurrentStateButton = document.getElementById('clearCurrentStateButton');
const editorIframe = document.getElementById('editorIframe');

const pageSceletonSetter = new PageSceletonSetter('openSceletonButton', 'sceletonModal', 'saveSceletonButton');
const pageTitle = pageSceletonSetter.getSavedValue('title');

// Export Sceleton
class ExportPage extends PageSkeleton {
  constructor(config) {
    super(config);
    this.styles = '';
    this.useDevStyles = config.useDevStyles;
  }

  async generateStyles() {
    if (this.useDevStyles) {
      this.styles = '';
    } else {
      this.styles = await generateTailwindStylesForLayout(
        this.config.layout, 
        this.config.tailwindConfig, 
        this.getBodyClasses()
      );
      this.styles = this.styles
        .replace(/>\s+</g, '><')
        .replace(/\s+/g, ' ')
        .trim();
    }
  }

  getAfterHead() {
    if (this.useDevStyles) {
      const tailwindConfig = {
        darkMode: "class",
        content: [],
        theme: {
          container: {
            center: true,
            padding: "2rem",
            screens: {
              "2xl": "1400px"
            }
          },
          borderRadius: {
            DEFAULT: "var(--radius)",
            none: "0",
            sm: "calc(var(--radius) - 4px)",
            md: "calc(var(--radius) - 2px)",
            lg: "var(--radius)",
            xl: "calc(var(--radius) + 4px)",
            "2xl": "calc(var(--radius) + 8px)",
            full: "9999px",
          },
          extend: {
            colors: {
              border: "hsl(var(--border))",
              input: "hsl(var(--input))",
              ring: "hsl(var(--ring))",
              background: "hsl(var(--background))",
              foreground: "hsl(var(--foreground))",
              primary: {
                DEFAULT: "hsl(var(--primary))",
                foreground: "hsl(var(--primary-foreground))"
              },
              secondary: {
                DEFAULT: "hsl(var(--secondary))",
                foreground: "hsl(var(--secondary-foreground))"
              },
              destructive: {
                DEFAULT: "hsl(var(--destructive))",
                foreground: "hsl(var(--destructive-foreground))"
              },
              muted: {
                DEFAULT: "hsl(var(--muted))",
                foreground: "hsl(var(--muted-foreground))"
              },
              accent: {
                DEFAULT: "hsl(var(--accent))",
                foreground: "hsl(var(--accent-foreground))"
              },
              popover: {
                DEFAULT: "hsl(var(--popover))",
                foreground: "hsl(var(--popover-foreground))"
              },
              card: {
                DEFAULT: "hsl(var(--card))",
                foreground: "hsl(var(--card-foreground))"
              }
            },
            borderRadius: {
              xl: "calc(var(--radius) + 4px)",
              lg: "var(--radius)",
              md: "calc(var(--radius) - 2px)",
              sm: "calc(var(--radius) - 4px)"
            },
            keyframes: {
              "accordion-down": {
                from: { height: 0 },
                to: { height: "var(--radix-accordion-content-height)" }
              },
              "accordion-up": {
                from: { height: "var(--radix-accordion-content-height)" },
                to: { height: 0 }
              },
              "collapsible-down": {
                from: { height: 0 },
                to: { height: "var(--radix-collapsible-content-height)" }
              },
              "collapsible-up": {
                from: { height: "var(--radix-collapsible-content-height)" },
                to: { height: 0 }
              }
            },
            animation: {
              "accordion-down": "accordion-down 0.2s ease-out",
              "accordion-up": "accordion-up 0.2s ease-out",
              "collapsible-down": "collapsible-down 0.2s ease-in-out",
              "collapsible-up": "collapsible-up 0.2s ease-in-out"
            }
          }
        }
      };

      return `
        <script src="https://cdn.tailwindcss.com"></script>
        <script>
          tailwind.config = ${JSON.stringify(tailwindConfig)};
        </script>
        <style type="text/tailwindcss">
          @layer base {
            :root {
              --background: 0 0% 100%;
              --foreground: 240 10% 3.9%;
              --card: 0 0% 100%;
              --card-foreground: 240 10% 3.9%;
              --popover: 0 0% 100%;
              --popover-foreground: 240 10% 3.9%;
              --primary: 142.1 76.2% 36.3%;
              --primary-foreground: 355.7 100% 97.3%;
              --secondary: 240 4.8% 95.9%;
              --secondary-foreground: 240 5.9% 10%;
              --muted: 240 4.8% 95.9%;
              --muted-foreground: 240 3.8% 46.1%;
              --accent: 240 4.8% 95.9%;
              --accent-foreground: 240 5.9% 10%;
              --destructive: 0 84.2% 60.2%;
              --destructive-foreground: 0 0% 98%;
              --border: 240 5.9% 90%;
              --input: 240 5.9% 90%;
              --ring: 142.1 76.2% 36.3%;
              --radius: 0.75rem;
            }
            .dark {
              --background: 20 14.3% 4.1%;
              --foreground: 0 0% 95%;
              --card: 24 9.8% 10%;
              --card-foreground: 0 0% 95%;
              --popover: 0 0% 9%;
              --popover-foreground: 0 0% 95%;
              --primary: 142.1 70.6% 45.3%;
              --primary-foreground: 144.9 80.4% 10%;
              --secondary: 240 3.7% 15.9%;
              --secondary-foreground: 0 0% 98%;
              --muted: 0 0% 15%;
              --muted-foreground: 240 5% 64.9%;
              --accent: 12 6.5% 15.1%;
              --accent-foreground: 0 0% 98%;
              --destructive: 0 62.8% 30.6%;
              --destructive-foreground: 0 85.7% 97.3%;
              --border: 240 3.7% 15.9%;
              --input: 240 3.7% 15.9%;
              --ring: 142.4 71.8% 29.2%;
            }
          }
        </style>`;
    } else {
      return `<style>${this.styles}</style>`;
    }
  }

  async generate() {
    await this.generateStyles();
    return super.generate();
  }

  getBodyClasses() {
    return pageSceletonSetter.getSavedValue('bodyClasses');
  }

  getScripts() {
    return pageSceletonSetter.getSavedValue('bodyStartSnippet');
  }

  getAfterTitle() {
    return `
      <meta name="description" content="${pageSceletonSetter.getSavedValue('description')}">
      <link href="https://fonts.googleapis.com/css2?family=${currentFontFamily()}:wght@400;500;600;700&display=swap" rel="stylesheet">
      ${pageSceletonSetter.getSavedValue('headSnippet')}
    `;
  }
}

pageSceletonSetter.setDefaultValues({
  lang: 'en',
  title: 'My Website',
  description: 'Welcome to my website',
  headSnippet: headSnippetDefault,
  bodyStartSnippet: bodyScriptDefault,
  bodyClasses: 'font-sans bg-slate-50 text-slate-900 dark:bg-slate-900 dark:text-slate-100'
});

const defaultState = {
  blocks: defaultBlocks,
  layout: [],
  sceleton: {
    config: defaultConfig
  }
};

function getStateFromStorage() {
  try {
    const storedState = localStorage.getItem("currentState");
    return storedState ? JSON.parse(storedState) : null;
  } catch (error) {
    console.error("Error parsing state from localStorage:", error);
    return null;
  }
}

function mergeWithDefaultState(currentState) {
  const sceletonData = currentState.sceleton || {};

  const mergedState = {
    blocks: currentState.blocks && Object.keys(currentState.blocks).length > 0
      ? currentState.blocks
      : defaultState.blocks,
    layout: currentState.layout || defaultState.layout,
    sceleton: {
      ...sceletonData,
      config: currentState.sceleton && currentState.sceleton.config
        ? currentState.sceleton.config
        : defaultState.sceleton.config
    }
  };

  pageSceletonSetter.fields.forEach(field => {
    if (sceletonData[field.key]) {
      mergedState.sceleton[field.key] = sceletonData[field.key];
    }
  });

  return mergedState;
}

let currentState = getStateFromStorage();

if (!currentState) {
  currentState = defaultState;
} else {
  currentState = mergeWithDefaultState(currentState);
}

localStorage.setItem("currentState", JSON.stringify(currentState));

let blocks = currentState.blocks;
let savedConfig = currentState.sceleton.config || defaultConfig;

let areaPreview = Object.keys(currentState.layout).length !== 0;

// Drag Drop
new Sortable(preview, {
  animation: 150,
  ghostClass: "sortable-ghost",
  onSort: saveCurrentState,
});

preview.addEventListener("dragover", (e) => {
  e.preventDefault();
});

preview.addEventListener("drop", (e) => {
  e.preventDefault();
  const blockType = e.dataTransfer.getData("text");
  if (blocks[blockType]) {
    addBlockToPreview(blockType);
  }
});

function setupBlockDragAndDrop() {
  const blockElements = document.querySelectorAll(".block");
  blockElements.forEach((block) => {
    block.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("text/plain", block.getAttribute("buildy-block"));
    });
  });
}

// Configuration
const tailwindConfigSetter = new UniversalDataSetter('config-btn', 'config-modal', 'config-textarea', 'save-config', 'config');
tailwindConfigSetter.setDefaultValue(defaultConfig);

function applyTailwindConfig() {
  const config = tailwindConfigSetter.getSavedValue();
  let scriptElement = document.getElementById('tailwind-config');
  if (!scriptElement) {
    scriptElement = document.createElement('script');
    scriptElement.id = 'tailwind-config';
    document.head.appendChild(scriptElement);
  }
  scriptElement.textContent = `tailwind.config = ${config};`;
}

tailwindConfigSetter.saveButton.addEventListener('click', () => {
  tailwindConfigSetter.saveData();
  applyTailwindConfig();
  location.reload();
});

// Current State
function getBlockType(element) {
  for (const [type, blockData] of Object.entries(blocks)) {
    const blockContent = document.createElement("div");
    blockContent.innerHTML = blockData.content.trim();
    const blockElement = blockContent.firstElementChild;

    if (blockElement.id && element.id && blockElement.id === element.id) {
      return type;
    }

    if (
      blockData.title &&
      blockData.title === element.getAttribute("buildy")
    ) {
      return type;
    }

    if (blockElement.outerHTML.trim() === element.outerHTML.trim()) {
      return type;
    }
  }
  return "unknown";
}
function saveCurrentState() {
  currentState.layout = Array.from(preview.children).map((item) => {
    const blockType = getBlockType(item.firstElementChild);
    return { type: blockType, content: item.firstElementChild.outerHTML };
  });
  localStorage.setItem("currentState", JSON.stringify(currentState));
}
function loadSavedState() {
  const savedState = JSON.parse(localStorage.getItem("currentState"));
  if (savedState) {
    currentState = savedState;
    blocks = currentState.blocks;
    initializeBlockList();
    currentState.layout.forEach((item) => {
      if (blocks[item.type]) {
        const blockWrapper = document.createElement("div");
        blockWrapper.className =
          "block-wrapper relative border border-gray-200 dark:border-gray-800";
        blockWrapper.innerHTML = item.content;
        const blockElement = blockWrapper.firstElementChild;
        blockElement.setAttribute("buildy", blocks[item.type].title);
        const controls = createBlockControls();
        blockWrapper.appendChild(controls);
        preview.appendChild(blockWrapper);
        setupBlockControls(blockWrapper);
      }
    });
    applyTailwindConfig();
  }
}

// Block List preview
function initializeBlockList() {
  Object.entries(blocks).forEach(([blockType, { content, title }]) => {
    const blockElement = document.createElement("div");
    blockElement.className =
      "block bg-white dark:bg-slate-900 border border-gray-300 dark:border-gray-700 rounded mb-2 cursor-move text-gray-800 dark:text-white  relative overflow-hidden aspect-[16/9]";
    blockElement.setAttribute("draggable", "true");
    blockElement.setAttribute("buildy-block", blockType);

    const previewContainer = document.createElement("div");
    previewContainer.className = "relative w-full h-full";

    const previewBlock = document.createElement("div");
    previewBlock.className = "w-full h-full";
    previewBlock.style.transform = "scale(0.2)";
    previewBlock.style.transformOrigin = "top left";
    previewBlock.style.width = "500%";
    previewBlock.style.height = "500%";
    previewBlock.style.border = "none";
    previewBlock.style.overflow = "hidden";

    const previewContent = document.createElement("div");
    previewContent.innerHTML = content || blockType;
    previewBlock.appendChild(previewContent);

    previewContainer.appendChild(previewBlock);

    const protectiveLayer = document.createElement("div");
    protectiveLayer.className = "absolute top-0 left-0 w-full h-full z-10";
    protectiveLayer.style.cursor = "move";
    previewContainer.appendChild(protectiveLayer);

    const blockTitleElement = document.createElement("div");
    blockTitleElement.className =
      "absolute text-gray-800 font-bold bg-neutral-200 dark:text-white dark:bg-gray-900 text-center bottom-1 left-1 py-0 px-2 rounded-full z-10 text-[0.55em]";
    blockTitleElement.innerHTML = title;
    blockElement.appendChild(blockTitleElement);

    blockElement.appendChild(previewContainer);

    blocksList.appendChild(blockElement);
  });

  setupBlockDragAndDrop();
}
function initializeSidebar() {
  const sidebar = document.getElementById("sidebar");
  const toggleButton = document.getElementById("toggleSidebar");
  const preview = document.getElementById("preview");
  let isOpen = true;

  toggleButton.addEventListener("click", () => {
    isOpen = !isOpen;
    if (isOpen) {
      sidebar.style.marginLeft = "0";
      toggleButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="relative left-2 sm:left-0 w-6 h-6 sm:w-4 sm:h-4 tailwind-navigation-svg"><path d="m11 17-5-5 5-5"/><path d="m18 17-5-5 5-5"/></svg>
      `;
    } else {
      sidebar.style.marginLeft = "-253px"; // -16rem
      toggleButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="relative left-2 sm:left-0 w-6 h-6 sm:w-4 sm:h-4 tailwind-navigation-svg"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M9 3v18"/><path d="m14 9 3 3-3 3"/></svg>
      `;
    }
    preview.style.marginLeft = isOpen ? "0" : "0";
  });
}

// Block Controls
function setupBlockControls(blockWrapper) {
  const moveUpButton = blockWrapper.querySelector(".move-up");
  const moveDownButton = blockWrapper.querySelector(".move-down");
  const deleteButton = blockWrapper.querySelector(".delete");

  moveUpButton.addEventListener("click", () => {
    const prev = blockWrapper.previousElementSibling;
    if (prev) {
      preview.insertBefore(blockWrapper, prev);
      saveCurrentState();
    }
  });

  moveDownButton.addEventListener("click", () => {
    const next = blockWrapper.nextElementSibling;
    if (next) {
      preview.insertBefore(next, blockWrapper);
      saveCurrentState();
    }
  });

  deleteButton.addEventListener("click", () => {
    blockWrapper.remove();
    localStorage.removeItem("currentState");
    saveCurrentState();
  });
}
function createBlockControls() {
  const controls = document.createElement("div");
  controls.className = "absolute top-2 right-2 flex space-x-2";
  controls.innerHTML = `
      <button class="move-up bg-[#0ea5e8] text-white rounded-[5px] p-[2px]">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4">
          <path d="m18 15-6-6-6 6"/>
        </svg>
      </button>
      <button class="move-down bg-[#0ea5e8] text-white rounded-[5px] p-[2px]">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4">
          <path d="m6 9 6 6 6-6"/>
        </svg>
      </button>
      <button class="delete bg-rose-500 text-white rounded-[5px] p-[2px]">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4">
          <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
        </svg>
      </button>
    `;
  return controls;
}

// Update the addBlockToPreview function to use ensureUniqueIds
function addBlockToPreview(blockType) {
  const { content, title } = blocks[blockType];
  const uniqueContent = ensureUniqueIds(content);

  fullscreenEditorButton.classList.remove('hidden');

  const blockWrapper = document.createElement("div");
  blockWrapper.className = "block-wrapper relative border border-gray-200 dark:border-gray-800";
  blockWrapper.innerHTML = uniqueContent;

  const firstChild = blockWrapper.firstElementChild;
  if (firstChild) {
    firstChild.setAttribute("buildy", title);
  }

  const controls = createBlockControls();
  blockWrapper.appendChild(controls);

  preview.appendChild(blockWrapper);
  setupBlockControls(blockWrapper);
  saveCurrentState();
}
function generateUniqueId() {
  return 'id_' + Math.random().toString(36).substr(2, 9);
}
function ensureUniqueIds(content) {
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = content;

  const elementsWithId = tempDiv.querySelectorAll('[id]');
  const usedIds = new Set();

  elementsWithId.forEach(el => {
    let id = el.id;
    if (usedIds.has(id)) {
      id = generateUniqueId();
      el.id = id;
    }
    usedIds.add(id);
  });

  return tempDiv.innerHTML;
}

// Function to create a new block type
function createNewBlockType(title, content) {
  const newBlockType = `custom_${Date.now()}`;
  blocks[newBlockType] = { title, content };
  currentState.blocks = blocks;
  localStorage.setItem("currentState", JSON.stringify(currentState));
  initializeBlockList();
}

// Event listener for creating a new block type
document.getElementById("createBlockBtn").addEventListener("click", () => {
  const title = prompt("Enter the title for the new block:");
  if (title) {
    const content = prompt("Enter the HTML content for the new block:");
    if (content) {
      createNewBlockType(title, content);
      location.reload();
    }
  }
});

// Import Export
importProjectInput.addEventListener("change", (e) => {
  const file = e.target.files[0];
  importProject(file);
});
exportProjectBtn.addEventListener("click", () => {
  exportProject();
});
exportHtmlBtn.addEventListener("click", async () => {
  exportHtml();
});
exportHtmlBtnMobile.addEventListener("click", async () => {
  exportHtml();
});
async function exportHtml() {
  const tempContainer = preview.cloneNode(true);
  tempContainer
    .querySelectorAll(".block-controls")
    .forEach((el) => el.remove());
  const blocks = tempContainer.children;
  const cleanContent = Array.from(blocks)
    .map((blockWrapper) => blockWrapper.firstElementChild.outerHTML)
    .join("\n");

  savedConfig = savedConfig
    .replace(/>\s+</g, '><')
    .replace(/\s+/g, '')
    .trim();

  // Получаем значение чекбокса напрямую из DOM
  const useDevStylesCheckbox = document.getElementById('useDevStyles');
  const useDevStyles = useDevStylesCheckbox ? useDevStylesCheckbox.checked : false;

  const ExportConfig = {
    darkMode: true,
    title: pageTitle,
    layout: currentState.layout,
    tailwindConfig: savedConfig,
    content: cleanContent,
    useDevStyles: useDevStyles  // Используем значение напрямую из чекбокса
  };

  const htmlContent = new ExportPage(ExportConfig);
  const uglyHtml = await htmlContent.generate();

  // PrettY
  let prettyHtml = prettier.format(uglyHtml, {
    parser: "html",
    plugins: prettierPlugins,
    printWidth: 1000000,
    tabWidth: 2,
    useTabs: false,
    singleQuote: false,
    htmlWhitespaceSensitivity: "ignore",
    bracketSameLine: true,
    singleAttributePerLine: false,
    embeddedLanguageFormatting: "auto",
  });

  prettyHtml = prettyHtml
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/\n\s*\n/g, '\n')
    .replace(/^\s+|\s+$/g, '')
    .replace(/>\s+</g, '><')
    .replace(/\s+/g, ' ')
    .trim();;

  const slug = pageTitle.toLowerCase().replace(/\s+/g, '-');

  downloadFile(prettyHtml, slug+".html", "text/html");
}
function downloadFile(content, fileName, contentType) {
  const blob = new Blob([content], { type: contentType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
function importProject(file) {
  const reader = new FileReader();
  reader.onload = function (e) {
    try {
      const importedState = JSON.parse(e.target.result);
      if (importedState.blocks && importedState.layout) {
        currentState = importedState;
        localStorage.setItem("currentState", JSON.stringify(currentState));
        location.reload();
      } else {
        alert("Invalid project file");
      }
    } catch (error) {
      alert("Error importing project: " + error.message);
    }
  };
  reader.readAsText(file);
}
function exportProject() {
  const projectData = JSON.stringify(currentState);
  const slug = pageTitle.toLowerCase().replace(/\s+/g, '-');
  downloadFile(projectData, slug+".json", "application/json");
}

// Full Screen preview
function fullscreenModal() {
  const fullscreenButton = document.getElementById("fullscreenButton");
  const closeFullscreenButton = document.getElementById(
    "closeFullscreenButton"
  );
  const fullscreenModal = document.getElementById("fullscreenModal");
  const preview = document.getElementById("preview");
  const fullscreenPreview = document.getElementById("fullscreenPreview");

  fullscreenButton.addEventListener("click", function () {
    fullscreenPreview.innerHTML = preview.innerHTML;
    fullscreenModal.classList.remove("hidden");
  });

  closeFullscreenButton.addEventListener("click", function () {
    fullscreenModal.classList.add("hidden");
  });
}

// Dark Mode
modeToggle.addEventListener("click", toggleDarkMode);

function toggleDarkMode() {
  const isDarkMode = document.documentElement.classList.toggle("dark");
  localStorage.setItem("darkMode", isDarkMode);
}

function toolsMenuButton() {
  const toolsMenuButton = document.getElementById("tools-menu-button");
  const toolsMenu = document.getElementById("tools-menu");

  toolsMenuButton.addEventListener("click", () => {
    toolsMenu.classList.toggle("hidden");
  });

  document.addEventListener("click", (event) => {
    if (
      !toolsMenuButton.contains(event.target) &&
      !toolsMenu.contains(event.target)
    ) {
      toolsMenu.classList.add("hidden");
    }
  });
}

// Full Screen Editor
fullscreenEditorButton.addEventListener('click', openFullscreenEditor);
closeFullscreenEditorButton.addEventListener('click', closeFullscreenEditor);
clearCurrentStateButton.addEventListener('click', clearCurrentState);

function openFullscreenEditor() {
  fullscreenEditorModal.classList.remove('hidden');

  editorIframe.onload = function () {
    const isDarkMode = localStorage.getItem("darkMode") === "true";
    editorIframe.contentWindow.postMessage({
      type: 'init',
      darkMode: isDarkMode
    }, '*');
  };

  editorIframe.src = './editor.html';
}
function closeFullscreenEditor() {
  location.reload();
}

// Reset Page
function clearCurrentState() {
  localStorage.removeItem("currentState");
  location.reload();
}

// Insert Body Classes
function applyBodyClasses() {
  const bodyClasses = pageSceletonSetter.getSavedValue('bodyClasses');
  document.body.className = bodyClasses;
}

// Insert Current FontFamily
function applyCurrentFontFamily() {
  const head = document.getElementsByTagName('head')[0];
  let title = head.querySelector('title');
  if (!title) {
    title = document.createElement('title');
    title.textContent = pageTitle || 'My Website';
    head.appendChild(title);
  }

  const fontFamily = currentFontFamily();
  if (fontFamily) {
    const fontLink = document.createElement('link');
    fontLink.rel = 'stylesheet';
    fontLink.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(fontFamily)}:wght@400;500;600;700&display=swap`;
    title.after(fontLink);
  }
}

// Get Current FontFamily
function safeGet(obj, path) {
  return path.split('.').reduce((acc, part) => acc && acc[part], obj);
}
function currentFontFamily() {
  const configString = tailwindConfigSetter.getSavedValue();
  let config;

  try {
    config = JSON.parse(configString);
  } catch (error) {
    console.error('Error config process: ', error);
    return;
  }

  const sans = safeGet(config, 'theme.fontFamily.sans');

  console.log('config: ', config);

  if (sans) {
    const fontFamily = Array.isArray(config.theme.fontFamily.sans)
      ? config.theme.fontFamily.sans[0]
      : config.theme.fontFamily.sans;
    const systemFonts = ['sans-serif', 'serif', 'monospace', 'cursive', 'fantasy', 'system-ui', 'ui-sans-serif', 'ui-serif', 'ui-monospace', 'ui-rounded'];
    if (typeof fontFamily === 'string' && !systemFonts.includes(fontFamily.toLowerCase())) {
      return fontFamily;
    }
  }
}

// Generate current Layout TailwindCSS Style
async function generateTailwindStylesForLayout(layout, tailwind, body) {
  const iframe = document.createElement('iframe');
  iframe.style.display = 'none';
  document.body.appendChild(iframe);
  
  await new Promise(resolve => {
    iframe.onload = resolve;
    iframe.srcdoc = `
      <html>
        <head>
        <script src="https://cdn.tailwindcss.com"></script>
        <script>
          tailwind.config = ${tailwind};
        </script>
          <style type="text/tailwindcss">
    @layer base {
        :root {
            --background: 0 0% 100%;
            --foreground: 240 10% 3.9%;
        
            --card: 0 0% 100%;
            --card-foreground: 240 10% 3.9%;
        
            --popover: 0 0% 100%;
            --popover-foreground: 240 10% 3.9%;
        
            --primary: 142.1 76.2% 36.3%;
            --primary-foreground: 355.7 100% 97.3%;
        
            --secondary: 240 4.8% 95.9%;
            --secondary-foreground: 240 5.9% 10%;
        
            --muted: 240 4.8% 95.9%;
            --muted-foreground: 240 3.8% 46.1%;
        
            --accent: 240 4.8% 95.9%;
            --accent-foreground: 240 5.9% 10%;
        
            --destructive: 0 84.2% 60.2%;
            --destructive-foreground: 0 0% 98%;
        
            --border:240 5.9% 90%;
            --input:240 5.9% 90%;
            --ring:142.1 76.2% 36.3%;
            --radius: 0.75rem;
        }
        
        .dark {
            --background:20 14.3% 4.1%;
            --foreground:0 0% 95%;
        
            --card:24 9.8% 10%;
            --card-foreground:0 0% 95%;
        
            --popover:0 0% 9%;
            --popover-foreground:0 0% 95%;
        
            --primary:142.1 70.6% 45.3%;
            --primary-foreground:144.9 80.4% 10%;
        
            --secondary:240 3.7% 15.9%;
            --secondary-foreground:0 0% 98%;
        
            --muted:0 0% 15%;
            --muted-foreground:240 5% 64.9%;
        
            --accent:12 6.5% 15.1%;
            --accent-foreground:0 0% 98%;
        
            --destructive:0 62.8% 30.6%;
            --destructive-foreground:0 85.7% 97.3%;
        
            --border:240 3.7% 15.9%;
            --input:240 3.7% 15.9%;
            --ring:142.4 71.8% 29.2%;
        }
    }
      </style>
        </head>
        <body class="${body}">
          <div id="content"></div>
          ${pageSceletonSetter.getSavedValue('bodyStartSnippet')}
        </body>
      </html>
    `;
  });
  
  const iframeDocument = iframe.contentDocument;
  const contentContainer = iframeDocument.getElementById('content');
  
  layout.forEach(item => {
    const div = document.createElement('div');
    div.innerHTML = item.content;
    contentContainer.appendChild(div.firstElementChild);
  });
  
  await new Promise(resolve => setTimeout(resolve, 200));
  
  const styles = Array.from(iframeDocument.styleSheets)
    .filter(sheet => sheet.ownerNode.tagName === 'STYLE' && sheet.ownerNode.textContent.includes('tailwindcss'))
    .flatMap(sheet => Array.from(sheet.cssRules))
    .map(rule => rule.cssText)
    .join('\n');
    
  document.body.removeChild(iframe);

  return styles;
}

// Initialize the application
document.addEventListener("DOMContentLoaded", () => {

  // Dark mode initialization
  const isDarkMode = localStorage.getItem("darkMode") === "true";

  if (isDarkMode) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }

  localStorage.setItem("darkMode", isDarkMode);

  // Full Editor preview
  if (areaPreview) {
    fullscreenEditorButton.classList.remove('hidden');
  } else {
    fullscreenEditorButton.classList.add('hidden');
  }

  // Page options
  applyCurrentFontFamily();
  applyBodyClasses();

  // Page Builder
  initializeSidebar();
  loadSavedState();
  toolsMenuButton();
  fullscreenModal();

  console.log('currentState:', currentState);
});