# TailwindCSS Layout Builder

This project is a web-based layout builder that allows users to create and manage custom layouts using draggable blocks. The layout builder is built with Tailwind CSS for styling and supports dark mode, project import/export, and HTML export.

## Features

- **Drag-and-Drop Interface**: Easily arrange layout blocks using a sortable drag-and-drop interface.
- **Dark Mode**: Toggle between light and dark themes.
- **Project Import/Export**: Save and load projects from JSON files.
- **HTML Export**: Export the current layout as a clean HTML file.
- **Custom Tailwind Configuration**: Apply custom Tailwind CSS configurations.
- **Block Editing**: Edit the content of individual blocks within the layout.
- **Sidebar Toggle**: Show or hide the sidebar to optimize the workspace.

## Usage

1. **Initialize the Layout Builder**:
   - The application state is stored in `localStorage`. On first load, default blocks and configurations are used.
   - The layout builder initializes the block list, sidebar, and loads any saved state from `localStorage`.

2. **Drag-and-Drop Blocks**:
   - Drag blocks from the block list and drop them into the preview area to add them to the layout.
   - Reorder blocks within the preview area using drag-and-drop.

3. **Edit Blocks**:
   - Click the edit button on a block to open a modal for editing the block's content.
   - Save changes to update the block content in the layout.

4. **Dark Mode**:
   - Toggle dark mode using the dark mode button. The dark mode preference is saved in `localStorage`.

5. **Project Import/Export**:
   - Import a project by selecting a JSON file.
   - Export the current project to a JSON file.

6. **HTML Export**:
   - Export the current layout as a clean HTML file, excluding any block controls.

7. **Custom Tailwind Configuration**:
   - Edit the Tailwind CSS configuration using the configuration textarea.
   - Apply the configuration to update the layout's styling.

## File Structure

- `index.html`: The main HTML file containing the layout builder interface.
- `style.css`: The CSS file for styling the layout builder.
- `script.js`: The main JavaScript file containing the logic for the layout builder.

## Functions

### Initialization

- `initializeBlockList()`: Initializes the block list from the current state.
- `initializeSidebar()`: Initializes the sidebar and its toggle functionality.
- `loadSavedState()`: Loads the saved state from `localStorage`.

### Block Management

- `addBlockToPreview(blockType)`: Adds a block to the preview area.
- `setupBlockControls(blockWrapper)`: Sets up the controls for a block (move up, move down, delete).
- `createBlockControls()`: Creates the control buttons for a block.
- `getBlockType(element)`: Gets the block type for a given element.
- `ensureUniqueIds(content)`: Ensures that all elements in the content have unique IDs.

### State Management

- `saveCurrentState()`: Saves the current state to `localStorage`.
- `importProject(file)`: Imports a project from a JSON file.
- `exportProject()`: Exports the current project to a JSON file.

### Utility Functions

- `downloadFile(content, fileName, contentType)`: Downloads a file with the given content and type.
- `applyTailwindConfig(config)`: Applies the Tailwind CSS configuration.
- `fullscreenModal()`: Initializes the fullscreen modal functionality.

### Event Listeners

- **Drag-and-Drop**: Listens for drag-and-drop events to add blocks to the preview area.
- **Dark Mode Toggle**: Toggles dark mode and saves the preference.
- **Project Import/Export**: Handles project import/export functionality.
- **HTML Export**: Exports the current layout as HTML.
- **Configuration Modal**: Handles the opening and closing of the configuration modal.
- **Block Editing**: Opens an edit modal for editing block content.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
