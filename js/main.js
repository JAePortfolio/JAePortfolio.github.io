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