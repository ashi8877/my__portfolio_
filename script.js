// Mobile Navigation Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('#nav-links a');

mobileMenuBtn.addEventListener('click', () => {
    navbar.classList.toggle('open');
    const icon = mobileMenuBtn.querySelector('i');
    if (navbar.classList.contains('open')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Close mobile menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navbar.classList.remove('open');
        const icon = mobileMenuBtn.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// Fast Pink Glowing Balls / Star Particles Background
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');

function setCanvasSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
setCanvasSize();
window.addEventListener('resize', setCanvasSize);

const stars = [];
for (let i = 0; i < 75; i++) {
    stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2.5 + 1,
        alpha: Math.random() * 0.8 + 0.2,
        delta: (Math.random() * 0.015) + 0.005,
        vx: (Math.random() - 0.5) * 0.9,
        vy: -(Math.random() * 1.3 + 0.6)
    });
}

function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    stars.forEach(s => {
        s.alpha += s.delta;
        if (s.alpha >= 1 || s.alpha <= 0.2) {
            s.delta = -s.delta;
        }
        s.x += s.vx;
        s.y += s.vy;

        if (s.y < -10) {
            s.y = canvas.height + 10;
            s.x = Math.random() * canvas.width;
        }
        if (s.x < -10) s.x = canvas.width + 10;
        if (s.x > canvas.width + 10) s.x = -10;

        ctx.save();
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.shadowBlur = 12;
        ctx.shadowColor = '#ea2879';
        ctx.fillStyle = `rgba(234, 40, 121, ${s.alpha})`;
        ctx.fill();
        ctx.restore();
    });

    requestAnimationFrame(drawParticles);
}
drawParticles();

// Typewriter Effect
const titles = [
    "Python & SQL Specialist",
    "Data Analyst",
    "AI & ML Enthusiast",
    "Power BI & Excel Developer",
    "Data-Driven Problem Solver"
];

let titleIndex = 0;
let charIndex = 8;
let isDeleting = false;
const typingEl = document.getElementById('typing-text');

function typeLoop() {
    const currentTitle = titles[titleIndex];

    if (!isDeleting) {
        typingEl.textContent = currentTitle.substring(0, charIndex + 1);
        charIndex++;

        if (charIndex === currentTitle.length) {
            isDeleting = true;
            setTimeout(typeLoop, 1800);
            return;
        }
        setTimeout(typeLoop, 85);
    } else {
        typingEl.textContent = currentTitle.substring(0, charIndex - 1);
        charIndex--;

        if (charIndex === 0) {
            isDeleting = false;
            titleIndex = (titleIndex + 1) % titles.length;
            setTimeout(typeLoop, 350);
            return;
        }
        setTimeout(typeLoop, 45);
    }
}
setTimeout(typeLoop, 1200);

// Active Navbar Link Highlight on Scroll
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('#nav-links a');

window.addEventListener('scroll', () => {
    let currentSection = '';
    sections.forEach(sec => {
        const top = sec.offsetTop - 180;
        if (window.scrollY >= top) {
            currentSection = sec.getAttribute('id');
        }
    });

    navItems.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
});

// Scroll to Top Button
document.getElementById('scrollTopBtn').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ================= WORKFLOW NODES INTERACTIVE DATA =================
const workflowData = {
    churn: {
        desc: "Machine learning classification model predicting customer retention and churn behaviors accurately.",
        features: ["Predictive Classification", "Data Preprocessing", "Evaluation Metrics", "Scikit-learn Pipeline"],
        tech: ["Python", "Scikit-learn", "Pandas", "GitHub repo"]
    },
    swiggy: {
        desc: "Interactive Excel dashboard analyzing Swiggy sales data, order trends, and revenue insights.",
        features: ["Pivot Tables & Charts", "Dynamic KPI Tracking", "Order Trend Analysis", "Revenue Optimization"],
        tech: ["Advanced Excel", "Data Visualization", "Formulas", "GitHub repo"]
    },
    spam: {
        desc: "NLP and Machine Learning classification model to detect spam messages accurately.",
        features: ["Natural Language Processing", "Text Vectorization", "Classification Model", "High Accuracy Rate"],
        tech: ["Python", "NLTK", "Scikit-learn", "GitHub repo"]
    },
    hr: {
        desc: "Power BI / Excel dashboard evaluating employee attrition, hiring performance, and workplace metrics.",
        features: ["Employee Attrition KPI", "Hiring Performance", "Interactive Slicers", "Visual Storytelling"],
        tech: ["Power BI", "Excel", "DAX", "GitHub repo"]
    },
    retail: {
        desc: "Analytics dashboard for supply chain inventory optimization and demand forecasting.",
        features: ["Demand Forecasting", "Inventory Optimization", "Stock Level Analysis", "Supply Chain KPIs"],
        tech: ["Python", "SQL", "Power BI", "GitHub repo"]
    }
};

function showNodeDetails(projectKey) {
    document.querySelectorAll('.workflow-branch-card').forEach(card => card.classList.remove('active'));
    event.currentTarget.classList.add('active');

    const data = workflowData[projectKey];
    document.getElementById('inspDesc').textContent = data.desc;
    
    const featContainer = document.getElementById('inspFeatures');
    featContainer.innerHTML = data.features.map(f => `<span>${f}</span>`).join('');

    const techContainer = document.getElementById('inspTech');
    techContainer.innerHTML = data.tech.map(t => `<span>${t}</span>`).join('');
}

function filterWorkflow(category) {
    document.querySelectorAll('.workflow-filters .filter-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
}

// ================= CUSTOM DATA & ML PIPELINE FLOW DATA =================
const pipeData = {
    raw: {
        title: "1. Raw Data Source & Ingestion",
        desc: "Collecting raw datasets from CSV files, Excel spreadsheets, relational databases, and live APIs for analysis."
    },
    sql: {
        title: "2. SQL & ETL Queries",
        desc: "Querying raw databases, performing SQL joins, aggregations, data filtering, and extracting structured information."
    },
    python: {
        title: "3. Python (Pandas & NumPy) Wrangling",
        desc: "Cleaning data, handling missing values, exploratory data analysis (EDA), and transforming dataframes using Python."
    },
    ml: {
        title: "4. Machine Learning & AI Modeling",
        desc: "Training regression and classification models using Scikit-learn, evaluation metrics, and predictive analysis."
    },
    bi: {
        title: "5. Power BI & Business Intelligence Output",
        desc: "Building interactive Power BI and Excel dashboards, visual reports, and delivering actionable insights to stakeholders."
    }
};

function showPipeDetails(nodeKey) {
    document.querySelectorAll('.pipe-node').forEach(node => node.classList.remove('active'));
    event.currentTarget.classList.add('active');

    const data = pipeData[nodeKey];
    document.getElementById('pipeTitle').textContent = data.title;
    document.getElementById('pipeDesc').textContent = data.desc;
}

// ================= CHATBOT LOGIC (ENGLISH) =================
const chatbotToggleBtn = document.getElementById('chatbotToggleBtn');
const chatbotWindow = document.getElementById('chatbotWindow');
const closeChatBtn = document.getElementById('closeChatBtn');
const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');
const sendChatBtn = document.getElementById('sendChatBtn');

chatbotToggleBtn.addEventListener('click', () => {
    chatbotWindow.classList.toggle('open');
});

closeChatBtn.addEventListener('click', () => {
    chatbotWindow.classList.remove('open');
});

function getBotResponse(input) {
    const text = input.toLowerCase();

    if (text.includes('skill') || text.includes('tech') || text.includes('python') || text.includes('sql')) {
        return "Aashi's core technical skills include: <b>Python (Pandas, NumPy, Matplotlib, Seaborn)</b>, <b>SQL</b>, <b>Power BI</b>, <b>Advanced Excel</b>, <b>Tableau</b>, and <b>Machine Learning</b>.";
    }
    if (text.includes('project') || text.includes('dashboard') || text.includes('work')) {
        return "Aashi has built 12+ projects including: <b>Excel Swiggy Sales Dashboard</b>, <b>Customer Churn ML</b>, <b>HR Analytics Dashboard</b>, <b>Customer Segmentation</b>, and <b>Spam Detection</b>. You can explore them in the Projects section!";
    }
    if (text.includes('experience') || text.includes('intern') || text.includes('company')) {
        return "Aashi has worked as an AI & ML Intern at <b>Ducat India</b> (2026 - Present) and as a Data Analyst Intern at <b>S O Infotech Pvt. Ltd.</b> (2025).";
    }
    if (text.includes('education') || text.includes('mca') || text.includes('bca') || text.includes('college')) {
        return "Aashi is currently pursuing her <b>MCA in AI & Data Science</b> (2026 - Present) and holds a <b>BCA</b> degree (2022 - 2025).";
    }
    if (text.includes('resume') || text.includes('cv') || text.includes('download')) {
        return "You can download Aashi's official PDF resume by clicking the pink <b>'Download Resume'</b> button in the Home section!";
    }
    if (text.includes('contact') || text.includes('email') || text.includes('linkedin') || text.includes('hire')) {
        return "You can reach out to Aashi via email at <b>pathakaashi369@gmail.com</b> or connect on LinkedIn!";
    }
    if (text.includes('hi') || text.includes('hello') || text.includes('hey')) {
        return "Hello! 👋 How can I help you learn more about Aashi Pathak's portfolio?";
    }

    return "I can help you with Aashi's <b>Skills</b>, <b>Projects</b>, <b>Experience</b>, <b>Education</b>, or <b>Contact</b> details. Feel free to ask about any of these!";
}

function appendMessage(msg, isUser = false) {
    const div = document.createElement('div');
    div.className = isUser ? 'user-msg' : 'bot-msg';
    div.innerHTML = msg;
    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function sendMessage() {
    const text = chatInput.value.trim();
    if (!text) return;

    appendMessage(text, true);
    chatInput.value = '';

    setTimeout(() => {
        const reply = getBotResponse(text);
        appendMessage(reply, false);
    }, 400);
}

function sendQuickReply(topic) {
    appendMessage(topic, true);
    setTimeout(() => {
        const reply = getBotResponse(topic);
        appendMessage(reply, false);
    }, 350);
}

sendChatBtn.addEventListener('click', sendMessage);

function handleChatKey(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
}