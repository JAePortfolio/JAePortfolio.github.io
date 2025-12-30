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

    log.sections.forEach(section => {
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

                ${section.code ? `
                    <div class="mockup-code text-xs mb-6">
                        <pre><code>${section.code}</code></pre>
                    </div>` : ''}
            </div>
        `;
        container.insertAdjacentHTML('beforeend', html);
    });
}