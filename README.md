![buildy-min](https://github.com/user-attachments/assets/a51c6318-5cdc-4cd0-8b44-bff692d0782a)

# TailwindCSS Layout Builder

## Table of Contents
1. [Introduction](#introduction)
2. [Features](#features)
3. [Who Is This For?](#who-is-this-for)
4. [Getting Started](#getting-started)
5. [Usage Guide](#usage-guide)
6. [Latest Release Highlights](#latest-release-highlights)
7. [Roadmap](#roadmap)
8. [Join Our Community](#join-our-community)

## Introduction

Welcome to TailwindCSS Layout Builder, a powerful web-based tool designed to revolutionise your web development workflow. As part of the HinddY ecosystem, this builder empowers indie hackers, entrepreneurs, and web developers to create stunning, responsive layouts with unprecedented ease and speed.

## Features

- **Intuitive Drag-and-Drop Interface**: Effortlessly arrange and customise layout blocks.
- **Dark Mode Toggle**: Switch between light and dark themes for comfortable viewing.
- **Project Import/Export**: Save and load your projects using JSON files.
- **Clean HTML Export**: Generate deployment-ready HTML with a single click.
- **Customisable Tailwind Configuration**: Fine-tune your designs with custom Tailwind CSS settings.
- **In-line Block Editing**: Modify content directly within the layout.
- **Collapsible Sidebar**: Optimise your workspace for focused design work.
- **Mobile-Optimised Version**: Create and export designs on-the-go.
- **Intelligent Editor**: Enjoy element highlighting and automatic formatting removal.
- **Keyboard Shortcuts**: Boost productivity across Mac, Linux, and Windows platforms.
- **Unified Project Structure**: Manage all page properties in a single 'skeleton' array.
- **Reset Functionality**: Quickly revert to default settings for rapid experimentation.

## Who Is This For?

- **Indie Hackers**: Launch MVPs faster than ever before.
- **Startup Founders**: Test ideas without significant development investments.
- **Web Designers**: Create stunning layouts with minimal effort.
- **Entrepreneurs**: Bring your ideas to life, even without deep technical knowledge.

## Getting Started

1. Visit our website at [HinddY.com](https://www.hinddy.com).
2. Navigate to the TailwindCSS Layout Builder tool.
3. Start a new project or import an existing one.
4. Begin dragging and dropping blocks to create your layout.

## Usage Guide

1. **Initialising the Layout Builder**:
   - On first load, default blocks and configurations are used.
   - The builder initialises the block list, sidebar, and loads any saved state from localStorage.

2. **Drag-and-Drop Blocks**:
   - Drag blocks from the block list to the preview area.
   - Reorder blocks within the preview area using drag-and-drop.

3. **Editing Blocks**:
   - Click the edit button on a block to open the content editing modal.
   - Save changes to update the block content in the layout.

4. **Using Dark Mode**:
   - Toggle dark mode using the dedicated button.
   - Your preference is saved in localStorage.

5. **Project Import/Export**:
   - Import a project by selecting a JSON file.
   - Export your current project to a JSON file for safekeeping or sharing.

6. **HTML Export**:
   - Export your current layout as a clean HTML file, ready for deployment.

7. **Custom Tailwind Configuration**:
   - Edit the Tailwind CSS configuration using the provided textarea.
   - Apply the configuration to update your layout's styling.

## Latest Release Highlights

Our latest release brings significant enhancements to streamline your workflow:

- Fully optimised mobile version with direct HTML export.
- Revamped user interface for improved usability.
- Intelligent editor with element highlighting and automatic formatting removal.
- New keyboard shortcuts for increased productivity.
- Unified 'skeleton' array for streamlined project structure.
- Quick reset functionality for rapid prototyping.
- Comprehensive project import, including custom page skeletons and block sets.

## Roadmap

[BuildY real time](https://github.com/orgs/hinddy/projects/1)

We're committed to continuous improvement. Here's what you can look forward to:

- AI integration for automatic layout generation
- API for expanded functionality
- Showcase of ready-made design systems for instant application

## Join Our Community

HinddY isn't just a toolset; it's a thriving community of innovators and creators. We believe in the power of independent development and strive to provide you with everything you need for success.

Join us in revolutionising web development. Your next big idea is just a drag and drop away!

---

"From concept to launch, faster than ever. TailwindCSS Layout Builder: Where indie dreams become digital realities."

[Try It Now](https://buildy-five.vercel.app/) | [Learn More](https://www.hinddy.com/)

#BuildY #IndieHacking #WebDevelopment #TailwindCSS

## Current Shadcn Vue Configuration

We have temporarily hardcoded styles and configuration to work with Shadcn Vue UI Kit components ([@vue-shadcn-starter](https://github.com/alexy-os/vue-shadcn-starter)).

### Component Location
- UI Kit components are located in: `components/shadcn-uikit.json`
- Component path is defined in `flow.html`:

## Let's go!

- Step 1: Go to [FlowKit](https://buildy-five.vercel.app/flow.html) and save components you like to local storage;
- Step 2: Go to [Builder](https://buildy-five.vercel.app/) and use saved components to build your UI;
- Step 3: Export your project as HTML file and use it as you want.

```js
const componentsUrl = savedProject?.publicUrl || './components/shadcn-uikit.json';
```

### Adding Components to Builder

1. Open `/flow.html` page
2. Browse available components
3. Click "Save to Local Storage" button for desired components
4. Components will be saved to browser's local storage
5. Saved components will become available in the builder

> **Note**: This is a temporary solution for quick start with Shadcn Vue components. Future versions will implement a more flexible system supporting various UI libraries.
