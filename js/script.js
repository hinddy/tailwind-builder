const preview = document.getElementById("preview");
const blocksList = document.getElementById("blocks");
const modeToggle = document.getElementById("mode-toggle");
const configTextarea = document.getElementById("config-textarea");
const exportHtmlBtn = document.getElementById("export-html-btn");
const exportProjectBtn = document.getElementById("export-project-btn");
const importProjectInput = document.getElementById("import-project");
const configBtn = document.getElementById("config-btn");
const configModal = document.getElementById("config-modal");
const saveConfigBtn = document.getElementById("save-config");

const defaultConfig = `{
      darkMode: "class",
      content: [],
      theme: {},
      fontFamily: {
        sans: ['Lato', 'sans-serif'],
      }
    }`;

const defaultBlocks = {
  hero: {
    title: `Hero Section`,
    content: `
  <main class="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white py-20 ">
    <div class="container mx-auto text-center">
      <img src="https://dummyimage.com/400x300/0ea5e9/ffffff&amp;text=Product+Page" alt="Hero Image" class="mx-auto mb-8 editable-image">
      <h1 class="text-5xl font-bold mb-4 editable">Welcome to Our Website</h1>
      <p class="text-xl mb-8 editable">Discover amazing features and services</p>
      <a href="#" class="bg-sky-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded editable ">Get Started</a>
    </div>
  </main>
`,
  },
  features: {
    title: `Features Grid`,
    content: `
  <section class="py-20 bg-white dark:bg-gray-900 ">
    <div class="container mx-auto">
      <h2 class="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white editable ">Our Features</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md ">
          <h3 class="text-xl font-semibold mb-4 text-gray-800 dark:text-white editable ">Feature 1</h3>
          <p class="text-gray-600 dark:text-gray-300 editable ">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
        <div class="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md ">
          <h3 class="text-xl font-semibold mb-4 text-gray-800 dark:text-white editable ">Feature 2</h3>
          <p class="text-gray-600 dark:text-gray-300 editable ">Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        </div>
        <div class="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md ">
          <h3 class="text-xl font-semibold mb-4 text-gray-800 dark:text-white editable ">Feature 3</h3>
          <p class="text-gray-600 dark:text-gray-300 editable ">Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>
        </div>
      </div>
    </div>
  </section>
`,
  },
};

let currentState = JSON.parse(localStorage.getItem("currentState")) || {
  blocks: {},
  layout: [],
  config: localStorage.getItem("tailwindConfig") || defaultConfig,
};

if (!currentState.blocks || Object.keys(currentState.blocks).length === 0) {
  currentState.blocks = defaultBlocks;
  localStorage.setItem("currentState", JSON.stringify(currentState));
}

let blocks = currentState.blocks;
let savedConfig = currentState.config || defaultConfig;

console.log(currentState);

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

modeToggle.addEventListener("click", () => {
  document.documentElement.classList.toggle("dark");
  localStorage.setItem(
    "darkMode",
    document.documentElement.classList.contains("dark")
  );
});

importProjectInput.addEventListener("change", (e) => {
  const file = e.target.files[0];
  importProject(file);
});

exportProjectBtn.addEventListener("click", () => {
  exportProject();
});

exportHtmlBtn.addEventListener("click", () => {
  const tempContainer = preview.cloneNode(true);
  tempContainer
    .querySelectorAll(".block-controls")
    .forEach((el) => el.remove());
  const blocks = tempContainer.children;
  const cleanContent = Array.from(blocks)
    .map((blockWrapper) => blockWrapper.firstElementChild.outerHTML)
    .join("\n");

  const tailwindConfig = savedConfig;

  const darkModeClass = document.documentElement.classList.contains("dark")
    ? "dark"
    : "";

    const htmlContent = `
    <!DOCTYPE html>
    <html lang="en" class="${darkModeClass}">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Exported Page</title>
          <script src="https://cdn.tailwindcss.com"></script>
          <script>
          tailwind.config = ${tailwindConfig};
          </script>
      </head>
      <body class="font-sans bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
          ${cleanContent}
        <!-- Off-canvas menu -->
        <div id="offCanvasMenu" class="fixed inset-0 z-50 hidden">
            <div class="absolute inset-0 bg-black bg-opacity-50"></div>
            <div
                class="absolute top-0 left-0 w-64 h-full bg-white dark:bg-gray-800 shadow-lg transform -translate-x-full transition-transform duration-300 ease-in-out">
                <div class="text-base p-6">
                    <button id="closeMenu"
                        class="absolute top-4 right-4 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                        <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12">
                            </path>
                        </svg>
                    </button>
                    <nav class="mt-8 space-y-4">
                        <a href="#hero"
                            class="block text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 transition duration-300">Home</a>
                        <a href="#features"
                            class="block text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 transition duration-300">Features</a>
                        <a href="#products"
                            class="block text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 transition duration-300">Domains</a>
                        <a href="#testimonials"
                            class="block text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 transition duration-300">Testimonials</a>
                        <a href="#cta"
                            class="block text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 transition duration-300">Get
                            Started</a>
                    </nav>
                </div>
            </div>
        </div>
        <script>
            // Dark mode toggle
            const darkModeToggle = document.createElement('button');
            darkModeToggle.innerHTML = '🌓';
            darkModeToggle.className = 'fixed bottom-4 right-4 bg-gray-200 dark:bg-gray-700 p-2 rounded-full text-xl focus:outline-none transition duration-300 ease-in-out transform hover:scale-110';
            document.body.appendChild(darkModeToggle);
    
            darkModeToggle.addEventListener('click', () => {
                document.documentElement.classList.toggle('dark');
            });
            
            if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
                
            darkModeToggle.addEventListener('click', () => {
                if (document.documentElement.classList.contains('dark')) {
                    localStorage.theme = 'dark';
                } else {
                    localStorage.theme = 'light';
                }
            });
    
            // Off-canvas menu functionality
            const menuToggle = document.getElementById('menuToggle');
            const offCanvasMenu = document.getElementById('offCanvasMenu');
            const closeMenu = document.getElementById('closeMenu');
            const menuContent = offCanvasMenu.querySelector('div:last-child');
    
            function openMenu() {
                offCanvasMenu.classList.remove('hidden');
                setTimeout(() => {
                    menuContent.classList.remove('-translate-x-full');
                }, 10);
            }
    
            function closeMenuFunction() {
                menuContent.classList.add('-translate-x-full');
                setTimeout(() => {
                    offCanvasMenu.classList.add('hidden');
                }, 300);
            }
    
            menuToggle.addEventListener('click', openMenu);
            closeMenu.addEventListener('click', closeMenuFunction);
            offCanvasMenu.addEventListener('click', (e) => {
                if (e.target === offCanvasMenu) {
                    closeMenuFunction();
                }
            });
          </script>
        </body>
      </html>
      `;

  downloadFile(htmlContent.trim(), "exported.html", "text/html");
});

configTextarea.value = savedConfig;
applyTailwindConfig(savedConfig);

configBtn.addEventListener("click", () => {
  configModal.classList.remove("hidden");
});

configModal.addEventListener("click", (e) => {
  if (e.target === configModal) {
    configModal.classList.add("hidden");
  }
});

saveConfigBtn.addEventListener("click", () => {
  const config = configTextarea.value;
  applyTailwindConfig(config);
  configModal.classList.add("hidden");
  location.reload();
});

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

function initializeBlockList() {
  Object.entries(blocks).forEach(([blockType, { content, title }]) => {
    const blockElement = document.createElement("div");
    blockElement.className =
      "block bg-white dark:bg-slate-900 border border-gray-300 dark:border-gray-700 rounded mb-2 cursor-move text-gray-800 dark:text-white  relative overflow-hidden aspect-[16/9]";
    blockElement.setAttribute("draggable", "true");
    blockElement.setAttribute("data-block", blockType);

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
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 tailwind-navigation-svg"><path d="m11 17-5-5 5-5"/><path d="m18 17-5-5 5-5"/></svg>
      `;
    } else {
      sidebar.style.marginLeft = "-253px"; // -16rem
      toggleButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 tailwind-navigation-svg"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M9 3v18"/><path d="m14 9 3 3-3 3"/></svg>
      `;
    }
    preview.style.marginLeft = isOpen ? "0" : "0";
  });
}

function setupBlockDragAndDrop() {
  const blockElements = document.querySelectorAll(".block");
  blockElements.forEach((block) => {
    block.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("text/plain", block.getAttribute("data-block"));
    });
  });
}

function fullscreenModal() {
  const controlsButton = document.getElementById("controlsButton");
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

function addBlockToPreview(blockType) {
  const { content, title } = blocks[blockType];
  const blockWrapper = document.createElement("div");
  blockWrapper.className =
    "block-wrapper relative border border-gray-200 dark:border-gray-800";
  blockWrapper.innerHTML = content;

  const firstChild = blockWrapper.firstElementChild;
  if (firstChild) {
    firstChild.setAttribute("data-block-title", title);
  }

  const controls = document.createElement("div");
  controls.setAttribute("id", "controlsButton");
  document.body.appendChild(controls);
  controls.className = "absolute top-1 right-1 flex space-x-1";
  controls.innerHTML = `
    <button class="move-up bg-sky-500 text-white dark:bg-slate-900 dark:text-gray-100 rounded-[5px] p-[2px]"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><path d="m18 15-6-6-6 6"/></svg></button>
    <button class="move-down bg-sky-500 text-white dark:bg-slate-900 dark:text-gray-100 rounded-[5px] p-[2px]"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><path d="m6 9 6 6 6-6"/></svg></button>
    <button class="delete bg-red-500 text-white dark:bg-slate-900 dark:text-gray-100 rounded-[5px] p-[2px] rounded-[8px] p-[5px]"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg></button>
  `;
  blockWrapper.appendChild(controls);

  preview.appendChild(blockWrapper);
  setupBlockControls(blockWrapper);
  saveCurrentState();
}

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
    saveCurrentState();
  });
}

function createBlockControls() {
  const controls = document.createElement("div");
  controls.className = "absolute top-2 right-2 flex space-x-2";
  controls.innerHTML = `
      <button class="move-up bg-blue-500 text-white rounded-[5px] p-[2px]">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4">
          <path d="m18 15-6-6-6 6"/>
        </svg>
      </button>
      <button class="move-down bg-blue-500 text-white rounded-[5px] p-[2px]">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4">
          <path d="m6 9 6 6 6-6"/>
        </svg>
      </button>
      <button class="delete bg-red-500 text-white rounded-[5px] p-[2px]">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4">
          <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
        </svg>
      </button>
    `;
  return controls;
}

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
      blockData.title === element.getAttribute("data-block-title")
    ) {
      return type;
    }

    if (blockElement.outerHTML.trim() === element.outerHTML.trim()) {
      return type;
    }
  }
  return "unknown";
}

function applyTailwindConfig(config) {
  let existingScript = document.querySelector("script[data-tailwind-config]");
  if (existingScript) {
    existingScript.textContent = `tailwind.config = ${config};`;
  } else {
    const script = document.createElement("script");
    script.setAttribute("data-tailwind-config", "");
    script.textContent = `tailwind.config = ${config};`;
    document.head.appendChild(script);
  }
  currentState.config = config;
  localStorage.setItem("currentState", JSON.stringify(currentState));
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
        blockElement.setAttribute("data-block-title", blocks[item.type].title);
        const controls = createBlockControls();
        blockWrapper.appendChild(controls);
        preview.appendChild(blockWrapper);
        setupBlockControls(blockWrapper);
      }
    });
    applyTailwindConfig(currentState.config);
  }
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

// Event listener for the preview container
preview.addEventListener("click", (e) => {
  const blockWrapper = e.target.closest(".block-wrapper");
  if (blockWrapper) {
    const controls = blockWrapper.querySelector(".block-controls");
    if (controls) {
      controls.classList.toggle("hidden");
    }
  }
});

// Function to update block content
function updateBlockContent(blockWrapper, newContent) {
  blockWrapper.innerHTML = newContent;
  const controls = createBlockControls();
  blockWrapper.appendChild(controls);
  setupBlockControls(blockWrapper);
  saveCurrentState();
}

// Event delegation for dynamically added elements
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("edit-block")) {
    const blockWrapper = e.target.closest(".block-wrapper");
    if (blockWrapper) {
      const blockContent = blockWrapper.innerHTML;
      const editModal = document.createElement("div");
      editModal.className = "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50";
      editModal.innerHTML = `
        <div class="bg-white dark:bg-gray-800 p-6 rounded-lg w-3/4 h-3/4 flex flex-col">
          <textarea class="w-full h-full p-2 mb-4 border rounded">${blockContent}</textarea>
          <div class="flex justify-end">
            <button class="save-edit bg-blue-500 text-white px-4 py-2 rounded mr-2">Save</button>
            <button class="cancel-edit bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
          </div>
        </div>
      `;
      document.body.appendChild(editModal);

      const saveButton = editModal.querySelector(".save-edit");
      const cancelButton = editModal.querySelector(".cancel-edit");
      const textarea = editModal.querySelector("textarea");

      saveButton.addEventListener("click", () => {
        updateBlockContent(blockWrapper, textarea.value);
        document.body.removeChild(editModal);
      });

      cancelButton.addEventListener("click", () => {
        document.body.removeChild(editModal);
      });
    }
  }
});

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

// Function to generate a unique ID
function generateUniqueId() {
  return 'id_' + Math.random().toString(36).substr(2, 9);
}

// Function to ensure all elements have unique IDs
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

// Update the addBlockToPreview function to use ensureUniqueIds
function addBlockToPreview(blockType) {
  const { content, title } = blocks[blockType];
  const uniqueContent = ensureUniqueIds(content);
  
  const blockWrapper = document.createElement("div");
  blockWrapper.className = "block-wrapper relative border border-gray-200 dark:border-gray-800";
  blockWrapper.innerHTML = uniqueContent;

  const firstChild = blockWrapper.firstElementChild;
  if (firstChild) {
    firstChild.setAttribute("data-block-title", title);
  }

  const controls = createBlockControls();
  blockWrapper.appendChild(controls);

  preview.appendChild(blockWrapper);
  setupBlockControls(blockWrapper);
  saveCurrentState();
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

// Initialize the application
document.addEventListener("DOMContentLoaded", () => {
  //initializeBlockList();
  initializeSidebar();
  loadSavedState();
  toolsMenuButton()
  fullscreenModal();

  // Dark mode initialization
  if (localStorage.getItem("darkMode") === "true") {
    document.documentElement.classList.add("dark");
  }
});
