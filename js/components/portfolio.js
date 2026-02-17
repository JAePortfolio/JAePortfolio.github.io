const activities = [
    {
        title: "PCB Business Cards",
        year: "2026",
        type: "Hardware",
        desc: "Design and fabrication of custom PCB business cards with embedded LEDs and interactive features.",
        img: "../../images/projects/pcbcards/card1.png",
        tags: ["KiCad", "PCB Fabrication", "Electronics"],
        github: "",
        link: "../../projects/pcbcards/pcbcards.html",
        isComingSoon: true,
    },
    {
        title: "Website Redesign",
        year: "2025",
        type: "Software",
        desc: "A complete overhaul of my personal website using modern web technologies like React and Tailwind CSS.",
        img: "../../images/projects/vscode.png",
        tags: ["Tailwind CSS", "JavaScript", "DaisyUI"],
        github: "",
        link: "/projects/website/website.html",
        isComingSoon: false,
    },
    {
        title: "TF2 Sentry",
        year: "2021",
        type: "Hardware",
        desc: "Replica of the Sentry Gun from Team Fortress 2, built with STM32, sensors, motors, etc.",
        img: "/projects/tf2sentry/assets/sentryCard.png",
        tags: ["STM32", "C/C++", "Robotics", "Mobile App"],
        github: "",
        link: "/projects/tf2sentry/tf2sentry.html",
        isComingSoon: false,
    },
    {
        title: "Smart eBike - Capstone",
        year: "2020",
        type: "Hardware/Software",
        desc: "Lead a team of 4 to create a product that converts a regular bike into an eBike. Kit includes a battery, motor, various sensors, object detection (LiDAR), Mobile App, and more.",
        img: "/projects/ebike/assets/ebike.png",
        tags: ["PCB Design", "LiDAR/Obj Det", "Power Systems"],
        github: "https://github.com/JAePortfolio/Smart-eBike",
        link: "/backup/2025/projects/ebike/ebike.html",
        isComingSoon: false,
    },
    {
        title: "Single Cycle - CPU",
        year: "2019",
        type: "Hardware",
        desc: "32-bit CPU based on the 32-bit MIPS instruction, implemented with I and R type instructions. Built using Intel's Quartus on an Altera DE2-70 FPGA.",
        img: "/projects/cpu/assets/cpu.jpg",
        tags: ["VHDL", "MIPS", "CPU Design", "FPGA"],
        github: "https://github.com/JAePortfolio/Single-Cycle-CPU---Comp.-Arch.",
        link: "/projects/cpu/cpu.html",
        isComingSoon: false,
    },
    {
        title: "Digital Clock",
        year: "2018",
        type: "Hardware",
        desc: "This is a 12 hour seven segment digital clock, using a crystal oscillator and can be powered with a 9V battery. One of my first hardware projects",
        img: "/projects/clock/assets/cardImage.jpg",
        tags: ["ICs", "Wiring", "Breadboard"],
        github: "",
        link: "/projects/clock/clock.html",
        isComingSoon: false,
    },
];

/**
 * Universal Render Function
 * @param {string} containerId - Target div ID
 * @param {boolean} isLatestOnly - If true, only takes the first 3 (index 0, 1, 2)
 */
function renderProjects(containerId, isLatestOnly = false) {
    const container = document.getElementById(containerId);
    if (!container) return;

    // Direct slice based on array order
    const displayList = isLatestOnly ? activities.slice(0, 3) : activities;

    container.innerHTML = displayList.map(activity => {
        const isComingSoon = activity.isComingSoon === true;
        const buttonHTML = isComingSoon
            ? `<button class="btn btn-ghost btn-sm rounded-sm opacity-50 cursor-not-allowed" disabled>Locked</button>`
            : `<a href="${activity.link}" class="btn btn-primary btn-sm rounded-sm">View Project</a>`;

        return `
            <div class="card bg-base-200 shadow-sm border border-base-300 rounded-md overflow-hidden flex flex-col h-full hover:border-primary/40 transition-all duration-300">
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
                            ${isComingSoon ? '<span class="text-warning">Page WIP / Coming Soon</span>' : '&nbsp;'}
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
        `;
    }).join('');
}

document.addEventListener("DOMContentLoaded", () => {
    // If we find the 'latest' container, render top 3
    renderProjects("latest-3-boxes", true);
    
    // If we find the 'portfolio' container, render everything
    renderProjects("portfolio-grid", false);
});