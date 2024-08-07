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

// Export Sceleton
class ExportPage extends PageSkeleton {
  getBodyClasses() {
    return pageSceletonSetter.getSavedValue('bodyClasses');
  }
  
  getScripts() {
    return pageSceletonSetter.getSavedValue('bodyStartSnippet');
  }
  
  getAfterTitle() {
    return `
      <meta name="description" content="${pageSceletonSetter.getSavedValue('description')}">
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
    location.reload();
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
function exportHtml(){
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

  const ExportConfig = {
    darkMode: true,
    title: pageSceletonSetter.getSavedValue('title'),
    tailwindConfig: savedConfig,
    content: cleanContent
  };

  const htmlContent = new ExportPage(ExportConfig);
  const uglyHtml = htmlContent.generate().trim();

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
    .replace(/^\s+|\s+$/g, '');
  
  // MinifY
  /*prettyHtml = prettyHtml
    .replace(/>\s+</g, '><')
    .replace(/\s+/g, ' ')
    .trim();*/

  downloadFile(prettyHtml, "exported.html", "text/html");
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
  downloadFile(projectData, "project.json", "application/json");
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

    editorIframe.onload = function() {
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

// Insert Page code snippets
function applyBodyClasses() {
  const bodyClasses = pageSceletonSetter.getSavedValue('bodyClasses');
  document.body.className = bodyClasses;
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
  if(areaPreview){
    fullscreenEditorButton.classList.remove('hidden');
  } else {
    fullscreenEditorButton.classList.add('hidden');
  }

  // Page options
  applyBodyClasses();

  // Page Builder
  initializeSidebar();
  loadSavedState();
  toolsMenuButton();
  fullscreenModal();

  console.log('currentState:', currentState);
});