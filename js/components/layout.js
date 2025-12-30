// This JavaScript code snippet is designed to dynamically insert HTML templates for a navbar and 
// a footer into a web page. It follows the structure of a builder pattern, where the `initLayout` 
// function is responsible for populating the specified containers with the provided HTML templates.

// 1. The Navbar Template
const navbarTemplate = `
<div class="navbar bg-base-200 min-h-0 h-20 text-base-content">
    <div class="flex-1">
        <a class="btn btn-ghost text-xl">John A - Computer Engineer</a>
    </div>
    <div class="flex-none items-center">
        <a class="link link-hover ml-4">Projects</a>
        <a class="link link-hover ml-4">About</a>
        <a class="link link-hover ml-4">Contact</a>

        <a href="YOUR_LINKEDIN_LINK" target="_blank" class="btn btn-ghost btn-circle ml-8">
            <svg class="size-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.733a2.483 2.483 0 01-2.484-2.482c0-1.378.966-2.482 2.484-2.482h.02c1.478 0 2.483 1.104 2.483 2.482 0 1.378-.973 2.482-2.484 2.482-.014 0-.02-.006-.026-.006zM3.882 20.452h3.556V9H3.882v11.452z"/>
            </svg>
        </a>
        
        <a href="YOUR_GITHUB_LINK" target="_blank" class="btn btn-ghost btn-circle">
            <svg class="size-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.6.111.82-.259.82-.575 0-.285-.01-1.04-.015-2.04-3.338.724-4.04-1.61-4.04-1.61-.546-1.387-1.334-1.758-1.334-1.758-1.09-.745.083-.73.083-.73 1.205.084 1.838 1.237 1.838 1.237 1.07 1.832 2.809 1.302 3.49-1 .108-.777.42-1.303.762-1.603-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.467-2.383 1.235-3.22-.124-.3-1.838-8.59.34-9.358 0 0 1.008-.323 3.302 1.23s2.294 3.018 2.394 3.14s.28-.158.82-.158c.54 0 .713.048.82.158.1.122 1.088-1.785 2.394-3.14 2.294-1.553 3.302-1.23 3.302-1.23.518.995.34 9.052-.34 9.358.768.837 1.235 1.91 1.235 3.22 0 4.59-2.8 5.63-5.474 5.928.43.37.82 1.102.82 2.22 0 1.604-.014 2.898-.014 3.284 0 .317.22.686.82.57C20.565 21.8 24 17.302 24 12c0-6.627-5.373-12-12-12z"/>
            </svg>
        </a>
    </div>
</div>
`;

// 2. The Footer Template
const footerTemplate = `
<footer class="bg-base-300 border-t border-base-300 py-12 mt-20">
    <div class="max-w-6xl mx-auto px-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            
            <div>
                <h2 class="text-3xl font-black uppercase tracking-tighter mb-4">Get in Touch</h2>
                <p class="text-sm opacity-60 leading-relaxed max-w-sm mb-8">
                Currently open for engineering opportunities requiring technical problem-solving, system optimization, and the development of functional, high-performance solutions.
                </p>
                <div class="flex items-center gap-4">
                    <span class="relative flex h-4 w-4">
                        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
                        <span class="relative inline-flex rounded-full h-4 w-4 bg-success shadow-[0_0_15px_rgba(34,197,94,1.0)]"></span>
                    </span>
                    <span class="text-[10px] font-bold uppercase tracking-widest opacity-50">System Status: Accepting Inquiries</span>
                </div>
            </div>

            <div class="grid grid-cols-1 gap-2">
                <a href="mailto:jarena012@gmail.com" class="group flex justify-between items-center border border-base-content/10 p-4 hover:bg-primary hover:text-primary-content transition-all duration-300">
                    <span class="text-xs font-bold uppercase tracking-widest">Email</span>
                    <span class="text-sm opacity-40 group-hover:opacity-100">ADDR_0x454D41494c</span>
                </a>
                <a href="https://www.linkedin.com/in/john-arena" class="group flex justify-between items-center border border-base-content/10 p-4 hover:bg-primary hover:text-primary-content transition-all duration-300">
                    <span class="text-xs font-bold uppercase tracking-widest">LinkedIn</span>
                    <span class="text-sm opacity-40 group-hover:opacity-100">get_connection()</span>
                </a>
                <a href="https://github.com/JAePortfolio" class="group flex justify-between items-center border border-base-content/10 p-4 hover:bg-primary hover:text-primary-content transition-all duration-300">
                    <span class="text-xs font-bold uppercase tracking-widest">GitHub</span>
                    <span class="text-sm opacity-40 group-hover:opacity-100">IO_STREAM_SOURCE</span>
                </a>
            </div>
        </div>

        <div class="mt-20 pt-8 border-t border-base-content/5 flex flex-col md:flex-row justify-between gap-4 opacity-40 text-[10px] font-bold uppercase tracking-[0.2em]">
            <span>&copy; 2025 JAe | Computer Engineering Portfolio</span>
            <span>Built with Tailwind & DaisyUI</span>
        </div>
    </div>
</footer>
`;

// 3. The builder function
function initLayout() {
    const navbarContainer = document.getElementById('main-navbar');
    const footerContainer = document.getElementById('main-footer');

    if (navbarContainer) navbarContainer.innerHTML = navbarTemplate;
    if (footerContainer) footerContainer.innerHTML = footerTemplate;
}

// 4. Instantiate the layout
initLayout();