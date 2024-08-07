const defaultConfig = `{
    darkMode: 'class',
    content: [],
    theme: {
      extend: {
        colors: {
          hinddy: {
            50: '#f0f9ff',
            100: '#e0f2fe',
            200: '#bae6fd',
            300: '#7dd3fc',
            400: '#38bdf8',
            500: '#0ea5e9',
            600: '#0284c7',
            700: '#0369a1',
            800: '#075985',
            900: '#0c4a6e',
            950: '#0d111a',
          },
        }
      },
      fontFamily: {
        sans: ['Lato', 'sans-serif'],
      }
    }
  }`;

const headSnippetDefault = `<link href="https://fonts.googleapis.com/css2?family=Lato:wght@400;500;600;700&display=swap" rel="stylesheet">
<link rel="icon" type="image/svg+xml" href="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0NyA0MCIgZmlsbD0iIzBlYTVlOSI+DQogICAgPHBhdGggZD0iTTIzLjUgNi41QzE3LjUgNi41IDEzLjc1IDkuNSAxMi4yNSAxNS41QzE0LjUgMTIuNSAxNy4xMjUgMTEuMzc1IDIwLjEyNSAxMi4xMjVDMjEuODM2NyAxMi41NTI5IDIzLjA2MDEgMTMuNzk0NyAyNC40MTQyIDE1LjE2OTJDMjYuNjIwMiAxNy40MDg0IDI5LjE3MzQgMjAgMzQuNzUgMjBDNDAuNzUgMjAgNDQuNSAxNyA0NiAxMUM0My43NSAxNCA0MS4xMjUgMTUuMTI1IDM4LjEyNSAxNC4zNzVDMzYuNDEzMyAxMy45NDcxIDM1LjE4OTkgMTIuNzA1MyAzMy44MzU3IDExLjMzMDhDMzEuNjI5NyA5LjA5MTU4IDI5LjA3NjYgNi41IDIzLjUgNi41Wk0xMi4yNSAyMEM2LjI1IDIwIDIuNSAyMyAxIDI5QzMuMjUgMjYgNS44NzUgMjQuODc1IDguODc1IDI1LjYyNUMxMC41ODY3IDI2LjA1MjkgMTEuODEwMSAyNy4yOTQ3IDEzLjE2NDIgMjguNjY5M0MxNS4zNzAyIDMwLjkwODQgMTcuOTIzNCAzMy41IDIzLjUgMzMuNUMyOS41IDMzLjUgMzMuMjUgMzAuNSAzNC43NSAyNC41QzMyLjUgMjcuNSAyOS44NzUgMjguNjI1IDI2Ljg3NSAyNy44NzVDMjUuMTYzMyAyNy40NDcxIDIzLjkzOTkgMjYuMjA1MyAyMi41ODU4IDI0LjgzMDdDMjAuMzc5OCAyMi41OTE2IDE3LjgyNjYgMjAgMTIuMjUgMjBaIj48L3BhdGg+DQo8L3N2Zz4=">`;
  
const bodyScriptDefault = `<script>const darkModeToggl=document.createElement('button');darkModeToggl.innerHTML='🌓';darkModeToggl.className='fixed bottom-4 left-4 bg-slate-200 dark:bg-slate-700 p-2 rounded-full text-xs focus:outline-none transition duration-300 ease-in-out transform hover:scale-110';document.body.appendChild(darkModeToggl);darkModeToggl.addEventListener('click',()=>{document.documentElement.classList.toggle('dark')});if(localStorage.theme==='dark'||(!('theme' in localStorage)&&window.matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.classList.add('dark')}else{document.documentElement.classList.remove('dark')}
darkModeToggl.addEventListener('click',()=>{if(document.documentElement.classList.contains('dark')){localStorage.theme='dark'}else{localStorage.theme='light'}});const menuToggle=document.getElementById('menuToggle');const offCanvasMenu=document.getElementById('offCanvasMenu');const closeMenu=document.getElementById('closeMenu');const menuContent=offCanvasMenu.querySelector('div:last-child');function openMenu(){offCanvasMenu.classList.remove('hidden');setTimeout(()=>{menuContent.classList.remove('-translate-x-full')},10)}
function closeMenuFunction(){menuContent.classList.add('-translate-x-full');setTimeout(()=>{offCanvasMenu.classList.add('hidden')},300)}
menuToggle.addEventListener('click',openMenu);closeMenu.addEventListener('click',closeMenuFunction);offCanvasMenu.addEventListener('click',(e)=>{if(e.target===offCanvasMenu){closeMenuFunction()}})<\/script>`;

const defaultBlocks = {
    hero: {
      title: `Hero Section`,
      content: `
<div class="relative isolate">
  <header class="w-full border-b border-gray-200 dark:border-gray-700">
    <nav class="px-4 py-5 lg:px-6 lg:py-6" aria-label="Global">
      <div class="flex flex-wrap items-center justify-between">
        <div class="flex lg:flex-1">
          <a href="#" class="-m-1.5 p-1.5">
            <span class="sr-only">Hinddy</span>
            <span class="text-hinddy-500">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 47 40" fill="currentColor"
                stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"
                class="h-8 w-8">
                <path
                  d="M23.5 6.5C17.5 6.5 13.75 9.5 12.25 15.5C14.5 12.5 17.125 11.375 20.125 12.125C21.8367 12.5529 23.0601 13.7947 24.4142 15.1692C26.6202 17.4084 29.1734 20 34.75 20C40.75 20 44.5 17 46 11C43.75 14 41.125 15.125 38.125 14.375C36.4133 13.9471 35.1899 12.7053 33.8357 11.3308C31.6297 9.09158 29.0766 6.5 23.5 6.5ZM12.25 20C6.25 20 2.5 23 1 29C3.25 26 5.875 24.875 8.875 25.625C10.5867 26.0529 11.8101 27.2947 13.1642 28.6693C15.3702 30.9084 17.9234 33.5 23.5 33.5C29.5 33.5 33.25 30.5 34.75 24.5C32.5 27.5 29.875 28.625 26.875 27.875C25.1633 27.4471 23.9399 26.2053 22.5858 24.8307C20.3798 22.5916 17.8266 20 12.25 20Z" />
              </svg>
            </span>
          </a>
        </div>
        <div class="flex lg:hidden">
          <button id="menuToggle" type="button"
            class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 dark:text-gray-200">
            <span class="sr-only">Open main menu</span>
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
              aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </div>
        <div class="hidden lg:flex lg:gap-x-12">
          <a href="#" class="text-sm font-semibold leading-6 text-gray-900 dark:text-white">Features</a>
          <a href="#" class="text-sm font-semibold leading-6 text-gray-900 dark:text-white">Marketplace</a>
          <a href="#" class="text-sm font-semibold leading-6 text-gray-900 dark:text-white">Company</a>
        </div>
        <div class="hidden lg:flex lg:flex-1 lg:justify-end">
          <a href="#" class="text-sm font-semibold leading-6 text-gray-900 dark:text-white">Log in <span
              aria-hidden="true">&rarr;</span></a>
        </div>
      </div>
    </nav>
  </header>

  <div class="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
    <div
      class="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-hinddy-200 to-hinddy-400 opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
      style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)">
    </div>
  </div>
  <div class="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
    <div class="hidden sm:mb-8 sm:flex sm:justify-center">
      <div
        class="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20 dark:text-gray-300 dark:ring-gray-700 dark:hover:ring-gray-600">
        Announcing our next round of funding. <a href="#"
          class="font-semibold text-hinddy-600 dark:text-hinddy-400"><span class="absolute inset-0"
            aria-hidden="true"></span>Read more <span aria-hidden="true">&rarr;</span></a>
      </div>
    </div>
    <div class="text-center">
      <h1 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl dark:text-white">Get started on your next project with BuildY</h1>
      <p class="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">Create stunning websites effortlessly with our
        TailwindCSS Builder. Drag, drop, and customize components to bring your vision to life.</p>
      <div class="mt-10 flex items-center justify-center gap-x-6">
        <a href="#"
          class="rounded-md bg-hinddy-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-hinddy-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hinddy-600">Get
          started</a>
        <a href="#" class="text-sm font-semibold leading-6 text-gray-900 dark:text-white">Learn more <span
            aria-hidden="true">→</span></a>
      </div>
    </div>
  </div>
  <div
    class="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
    aria-hidden="true">
    <div
      class="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-hinddy-300 to-hinddy-500 opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
      style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)">
    </div>
  </div>
  <div id="offCanvasMenu" class="fixed inset-0 z-50 hidden">
    <div class="absolute inset-0 bg-black bg-opacity-50"></div>
    <div
      class="absolute top-0 left-0 w-64 h-full bg-hinddy-50 dark:bg-hinddy-950 shadow-lg transform -translate-x-full transition-transform duration-300 ease-in-out">
      <div class="text-base p-6">
        <button id="closeMenu"
          class="absolute top-4 right-4 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
          <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12">
            </path>
          </svg>
        </button>
        <nav class="mt-8 space-y-4">
          <a href="#"
            class="block text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 transition duration-300">Features</a>
          <a href="#"
            class="block text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 transition duration-300">Marketplace</a>
          <a href="#"
            class="block text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 transition duration-300">Company</a>
          <a href="#" class="absolute bottom-5 right-8 text-sm font-semibold leading-6 text-gray-900 dark:text-white">Log in <span
              aria-hidden="true">&rarr;</span></a>
        </nav>
      </div>
    </div>
  </div>
</div>
  `,
    },
    features: {
      title: `Features Section`,
      content: `
<div class="py-24 sm:py-32">
  <div class="mx-auto max-w-7xl px-6 lg:px-8">
    <div class="mx-auto max-w-2xl lg:text-center">
      <h2 class="text-base font-semibold leading-7 text-hinddy-600 dark:text-hinddy-400">Build faster</h2>
      <p class="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">Everything you need
        to create your website</p>
      <p class="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">Hinddy provides a comprehensive set of tools
        and components to help you build beautiful, responsive websites quickly and efficiently.</p>
    </div>
    <div class="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
      <dl class="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
        <div class="relative pl-16">
          <dt class="text-base font-semibold leading-7 text-gray-900 dark:text-white">
            <div class="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-hinddy-600">
              <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
              </svg>
            </div>
            Drag and Drop Builder
          </dt>
          <dd class="mt-2 text-base leading-7 text-gray-600 dark:text-gray-300">Easily create layouts by dragging and
            dropping pre-designed components onto your canvas.</dd>
        </div>
        <div class="relative pl-16">
          <dt class="text-base font-semibold leading-7 text-gray-900 dark:text-white">
            <div class="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-hinddy-600">
              <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
              </svg>
            </div>
            Customizable Components
          </dt>
          <dd class="mt-2 text-base leading-7 text-gray-600 dark:text-gray-300">Tailor each component to fit your
            needs with our intuitive customization options.</dd>
        </div>
        <div class="relative pl-16">
          <dt class="text-base font-semibold leading-7 text-gray-900 dark:text-white">
            <div class="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-hinddy-600">
              <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
              </svg>
            </div>
            Responsive Design
          </dt>
          <dd class="mt-2 text-base leading-7 text-gray-600 dark:text-gray-300">Ensure your website looks great on all
            devices with built-in responsive design features.</dd>
        </div>
        <div class="relative pl-16">
          <dt class="text-base font-semibold leading-7 text-gray-900 dark:text-white">
            <div class="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-hinddy-600">
              <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M7.864 4.243A7.5 7.5 0 0119.5 10.5c0 2.92-.556 5.709-1.568 8.268M5.742 6.364A7.465 7.465 0 004.5 10.5a7.464 7.464 0 01-1.15 3.993m1.989 3.559A11.209 11.209 0 008.25 10.5a3.75 3.75 0 117.5 0c0 .527-.021 1.049-.064 1.565M12 10.5a14.94 14.94 0 01-3.6 9.75m6.633-4.596a18.666 18.666 0 01-2.485 5.33" />
              </svg>
            </div>
            Export Clean Code
          </dt>
          <dd class="mt-2 text-base leading-7 text-gray-600 dark:text-gray-300">Generate clean, optimized TailwindCSS
            code that you can easily integrate into your projects.</dd>
        </div>
      </dl>
    </div>
  </div>
</div>
  `,
    },
    cta: {
      title: `CTA Section`,
      content: `
<div class="bg-hinddy-600 dark:bg-hinddy-800">
  <div class="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
    <div class="mx-auto max-w-2xl text-center">
      <h2 class="text-3xl font-bold tracking-tight text-white sm:text-4xl">Boost your productivity.<br>Start using
        Hinddy today.</h2>
      <p class="mx-auto mt-6 max-w-xl text-lg leading-8 text-hinddy-100">Empower your web development process with
        Hinddy's TailwindCSS Builder. Create stunning websites faster than ever before.</p>
      <div class="mt-10 flex items-center justify-center gap-x-6">
        <a href="#"
          class="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-hinddy-600 shadow-sm hover:bg-hinddy-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">Get
          started</a>
        <a href="#" class="text-sm font-semibold leading-6 text-white">Learn more <span
            aria-hidden="true">→</span></a>
      </div>
    </div>
  </div>
</div>
  `,
    },
    footer: {
      title: `Footer Columns`,
      content: `
<footer class="bg-transparent" aria-labelledby="footer-heading">
  <h2 id="footer-heading" class="sr-only">Footer</h2>
  <div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
    <div class="xl:grid xl:grid-cols-3 xl:gap-8">
      <div class="space-y-8 xl:col-span-1">
        <span class="text-hinddy-500">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 47 40" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="h-8 w-8">
              <path d="M23.5 6.5C17.5 6.5 13.75 9.5 12.25 15.5C14.5 12.5 17.125 11.375 20.125 12.125C21.8367 12.5529 23.0601 13.7947 24.4142 15.1692C26.6202 17.4084 29.1734 20 34.75 20C40.75 20 44.5 17 46 11C43.75 14 41.125 15.125 38.125 14.375C36.4133 13.9471 35.1899 12.7053 33.8357 11.3308C31.6297 9.09158 29.0766 6.5 23.5 6.5ZM12.25 20C6.25 20 2.5 23 1 29C3.25 26 5.875 24.875 8.875 25.625C10.5867 26.0529 11.8101 27.2947 13.1642 28.6693C15.3702 30.9084 17.9234 33.5 23.5 33.5C29.5 33.5 33.25 30.5 34.75 24.5C32.5 27.5 29.875 28.625 26.875 27.875C25.1633 27.4471 23.9399 26.2053 22.5858 24.8307C20.3798 22.5916 17.8266 20 12.25 20Z"/>
          </svg>
        </span>
        <p class="text-base text-gray-500 dark:text-gray-400">Making the world a better place through constructing
          elegant hierarchies.</p>
        <div class="flex space-x-6">
          <a href="#" class="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
            <span class="sr-only">GitHub</span>
            <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fill-rule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                clip-rule="evenodd" />
            </svg>
          </a>
          <a href="#" class="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
            <span class="sr-only">Dribbble</span>
            <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fill-rule="evenodd"
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z"
                clip-rule="evenodd" />
            </svg>
          </a>
        </div>
      </div>
      <div class="mt-12 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
        <div class="md:grid md:grid-cols-2 md:gap-8">
          <div>
            <h3 class="text-base font-medium text-gray-900 dark:text-white">Solutions</h3>
            <ul role="list" class="mt-4 space-y-4">
              <li>
                <a href="#"
                  class="text-base text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">Marketing</a>
              </li>
              <li>
                <a href="#"
                  class="text-base text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">Analytics</a>
              </li>
              <li>
                <a href="#"
                  class="text-base text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">Commerce</a>
              </li>
              <li>
                <a href="#"
                  class="text-base text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">Insights</a>
              </li>
            </ul>
          </div>
          <div class="mt-12 md:mt-0">
            <h3 class="text-base font-medium text-gray-900 dark:text-white">Support</h3>
            <ul role="list" class="mt-4 space-y-4">
              <li>
                <a href="#"
                  class="text-base text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">Pricing</a>
              </li>
              <li>
                <a href="#"
                  class="text-base text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">Documentation</a>
              </li>
              <li>
                <a href="#"
                  class="text-base text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">Guides</a>
              </li>
              <li>
                <a href="#"
                  class="text-base text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">API
                  Status</a>
              </li>
            </ul>
          </div>
        </div>
        <div class="md:grid md:grid-cols-2 md:gap-8">
          <div>
            <h3 class="text-base font-medium text-gray-900 dark:text-white">Company</h3>
            <ul role="list" class="mt-4 space-y-4">
              <li>
                <a href="#"
                  class="text-base text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">About</a>
              </li>
              <li>
                <a href="#"
                  class="text-base text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">Blog</a>
              </li>
              <li>
                <a href="#"
                  class="text-base text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">Jobs</a>
              </li>
              <li>
                <a href="#"
                  class="text-base text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">Press</a>
              </li>
              <li>
                <a href="#"
                  class="text-base text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">Partners</a>
              </li>
            </ul>
          </div>
          <div class="mt-12 md:mt-0">
            <h3 class="text-base font-medium text-gray-900 dark:text-white">Legal</h3>
            <ul role="list" class="mt-4 space-y-4">
              <li>
                <a href="#"
                  class="text-base text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">Claim</a>
              </li>
              <li>
                <a href="#"
                  class="text-base text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">Privacy</a>
              </li>
              <li>
                <a href="#"
                  class="text-base text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">Terms</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-12 border-t border-gray-200 pt-8 dark:border-gray-700"><p class="text-base text-gray-400 xl:text-center">&copy; 2023 Hinddy, Inc. All rights reserved.</p></div>
  </div>
</footer>
  `,
    },
  };