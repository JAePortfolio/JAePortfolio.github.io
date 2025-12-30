const activities = [
    {
        title: "Website Redesign",
        year: "2025",
        type: "Software",
        desc: "A complete overhaul of my personal website using modern web technologies like React and Tailwind CSS.",
        img: "../../images/projects/vscode.png",
        tags: ["React", "Tailwind CSS", "JavaScript"],
        github: "",
        link: "",
        isComingSoon: true,
    },
    {
        title: "PCB Business Cards",
        year: "2025",
        type: "Hardware",
        desc: "Design and fabrication of custom PCB business cards with embedded LEDs and interactive features.",
        img: "../../images/projects/pcbcards/card1.png",
        tags: ["KiCad", "PCB Fabrication", "Electronics"],
        github: "",
        link: "../../projects/pcbcards/pcbcards.html",
        isComingSoon: true,
    },
    {
        title: "TF2 Sentry",
        year: "2021",
        type: "Hardware",
        desc: "Replica of the Sentry Gun from Team Fortress 2, built with STM32, sensors, motors, etc.",
        img: "../../images/projects/tf2sentry/sentryCard.png",
        tags: ["STM32", "C/C++", "Robotics"],
        github: "",
        link: "../../projects-v2/tf2sentry/index.html",
        isComingSoon: false,
    },
]

function renderLatest() {
    const container = document.getElementById("latest-3-boxes");
    if(!container) return;

    container.innerHTML = activities.slice(0, 3).map(activity => {
        const isComingSoon = activity.isComingSoon === true;
        
        // Button Logic
        const buttonHTML = isComingSoon
            ? `<button class="btn btn-ghost btn-sm rounded-sm opacity-50 cursor-not-allowed" disabled>Locked</button>`
            : `<a href="${activity.link}" class="btn btn-primary btn-sm rounded-sm">View Project</a>`;

        return `
<div class="card bg-base-200 shadow-sm border border-base-300 rounded-md overflow-hidden flex flex-col h-full">
    <figure class="h-64 bg-neutral relative shrink-0">
        <img src="${activity.img}" alt="${activity.title}" 
             class="w-full h-full object-cover object-center transition-all duration-500 
             ${isComingSoon ? 'grayscale brightness-[0.2]' : 'opacity-90'}" />
        
        ${isComingSoon ? `
            <div class="absolute inset-0 flex items-center justify-center">
                <span class="border border-white/10 bg-black/60 px-4 py-2 text-[10px] font-black uppercase tracking-[0.4em] text-white/90 backdrop-blur-md">
                    Under Development
                </span>
            </div>
        ` : ''}
    </figure>

    <div class="card-body p-6 flex flex-col flex-1 gap-4">
        <div>
            <div class="flex justify-between items-start gap-4">
                <h3 class="text-lg font-bold uppercase tracking-tight leading-tight">${activity.title}</h3>
                <div class="badge badge-outline rounded-sm text-[10px] opacity-40 shrink-0 mt-1">${activity.year}</div>
            </div>
            
            <div class="text-[10px] font-bold uppercase tracking-widest mt-1 h-4">
                ${isComingSoon ? '<span class="text-warning">WIP / Coming Soon</span>' : '&nbsp;'}
            </div>
        </div>
        
        <p class="text-sm leading-relaxed opacity-70 flex-grow">
            ${activity.desc}
        </p>

        <div class="flex flex-wrap gap-1">
            ${activity.tags.map(tag => `<div class="badge badge-primary badge-sm rounded-none text-[10px] font-bold uppercase">${tag}</div>`).join('')}
        </div>

        <div class="mt-auto pt-4 border-t border-base-300 flex justify-between items-center">
            <a href="${activity.github}" class="text-[10px] font-black uppercase tracking-widest ${isComingSoon ? 'opacity-10 pointer-events-none' : 'link link-primary no-underline hover:underline'}">
                GitHub
            </a>
            ${buttonHTML}
        </div>
    </div>
</div>
`;}).join('');
}

// Initialize Latest Activities Section
renderLatest();