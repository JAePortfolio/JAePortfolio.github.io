// This function is called when a modal is opened to load and display project content
async function openLog(projectFolder, fileName, logId) {
    try {
        const response = await fetch(`/projects-v2/${projectFolder}/${fileName}.json`);
        const data = await response.json();
        const log = data.logs.find(l => l.id === logId);
        
        // TARGETING THE ID WE MADE IN STEP 1
        const container = document.getElementById(`modal-content-${logId}`);
        const titleContainer = document.getElementById(`modal-title-${logId}`);
        
        if (log && container) {
            titleContainer.innerText = log.logTitle;
            renderContent(container, log);
        }
    } catch (error) {
        console.error("Data injection failed:", error);
    }
}

function renderContent(container, log) {
    container.innerHTML = ''; // Clear previous content

    log.sections.forEach((section, sIndex) => {
        const html = `
            <div class="mb-12 border-b border-base-300 pb-8 last:border-0">
                <h4 class="text-primary font-black uppercase text-sm mb-4">
                    ${section.sectionTitle}
                </h4>
                
                ${section.content ? `
                    <p class="text-sm opacity-80 leading-relaxed mb-6">
                        ${section.content}
                    </p>` : ''}
                
                ${section.list ? `
                    <ul class="list-disc pl-5 space-y-2 mb-6">
                        ${section.list.map(item => `
                            <li class="text-sm opacity-80">${item}</li>
                        `).join('')}
                    </ul>` : ''}
                
                ${section.image ? `
                    <div class="bg-base-200 p-2 border border-base-300 mb-6">
                        <img src="${section.image}" loading="lazy" class="w-full h-auto shadow-inner">
                    </div>` : ''}
                
                ${section.video ? `
                    <div class="bg-base-200 p-2 border border-base-300 mb-6">
                        <iframe src="${section.video}" frameborder="0" 
                        width="640" height="480"></iframe>
                    </div>` : ''}

                ${section.code ? `
                    <div class="mockup-code text-xs mb-6">
                        <pre><code>${section.code}</code></pre>
                    </div>` : ''}

                ${section.carousel ? `
                                    <div class="carousel w-full border border-base-300 rounded-lg overflow-hidden">
                                        ${section.carousel.map((imgSrc, iIndex) => `
                                            <div id="slide-${sIndex}-${iIndex}" class="carousel-item relative w-full">
                                                <img src="${imgSrc}" class="w-full object-cover aspect-video" />
                                                <div class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                                                    <a href="#slide-${sIndex}-${iIndex === 0 ? section.carousel.length - 1 : iIndex - 1}" class="btn btn-circle btn-xs opacity-50">❮</a> 
                                                    <a href="#slide-${sIndex}-${iIndex === section.carousel.length - 1 ? 0 : iIndex + 1}" class="btn btn-circle btn-xs opacity-50">❯</a>
                                                </div>
                                            </div>
                                        `).join('')}
                                    </div>
                                    <div class="flex justify-center w-full py-2 gap-2">
                                        ${section.carousel.map((_, iIndex) => `
                                            <a href="#slide-${sIndex}-${iIndex}" class="btn btn-xs btn-ghost border-base-300">${iIndex + 1}</a>
                                        `).join('')}
                                    </div>
                                ` : ''}
            </div>
        `;

        container.insertAdjacentHTML('beforeend', html);
    });
}

/**
 * Handles Web3Forms submission for a contact form
 * @param {string} formId - Form ID number
 */
function initContactForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return;

    const result = document.getElementById('form-result');
    const btn = document.getElementById('submit-btn');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // UI Feedback: Loading state
        btn.innerHTML = "Sending...";
        btn.disabled = true;

        const formData = new FormData(form);
        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);

        fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: json
        })
        .then(async (response) => {
            if (response.status === 200) {
                const toastContainer = document.getElementById('toast-container');
                
                // Create the alert element
                const toast = document.createElement('div');
                // Using rounded-none to match your Sentry/Engineering aesthetic
                toast.className = "alert alert-success rounded-none border border-base-300 shadow-2xl transition-all duration-500 translate-y-10 opacity-0";
                
                toast.innerHTML = `
                    <div class="flex items-center gap-3">
                        <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-5 w-5" fill="none" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div class="flex flex-col">
                            <span class="font-black uppercase text-[10px] tracking-widest">Success</span>
                            <span class="text-xs opacity-80">Message sent!</span>
                        </div>
                    </div>
                `;

                toastContainer.appendChild(toast);

                //  Animation
                setTimeout(() => {
                    toast.classList.remove('translate-y-10', 'opacity-0');
                }, 10);
                
                // Reset the Form UI
                form.reset();
                btn.disabled = false;
                btn.innerHTML = "Send Message";

                // Auto-remove after 5 seconds
                setTimeout(() => {
                    toast.classList.add('opacity-0');
                    setTimeout(() => toast.remove(), 500);
                }, 5000);
            }
        })
        .catch(error => {
            // Network/General Error State
            result.innerHTML = "Error: " + error.message;
            result.classList.add('text-error');
            result.classList.remove('hidden');
            btn.disabled = false;
            btn.innerHTML = "Send Message";
        });
    });
}