/* ═══════════════════════════════════════════
   SUJIT PRAMANIK — AI/ML PORTFOLIO SCRIPT
   ═══════════════════════════════════════════ */

// ── THEME TOGGLE ──
const html = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');

const savedTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener('click', () => {
  const curr = html.getAttribute('data-theme');
  const next = curr === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  updateThemeIcon(next);
});

function updateThemeIcon(theme) {
  themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

// ── NAVBAR SCROLL ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
});

// ── HAMBURGER MENU ──
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ── TYPED EFFECT ──
const phrases = [
  'smart automation systems',
  'voice-based AI assistants',
  'AI-powered chatbots',
  'machine learning solutions',
  'NLP & speech systems'
];
let phraseIndex = 0, charIndex = 0, deleting = false;
const typedEl = document.getElementById('typed');

function typeLoop() {
  const current = phrases[phraseIndex];
  if (!deleting) {
    typedEl.textContent = current.slice(0, charIndex + 1);
    charIndex++;
    if (charIndex === current.length) {
      deleting = true;
      setTimeout(typeLoop, 2000);
      return;
    }
  } else {
    typedEl.textContent = current.slice(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      deleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }
  }
  setTimeout(typeLoop, deleting ? 50 : 80);
}
typeLoop();

// ── SKILL BAR ANIMATIONS ──
const skillFills = document.querySelectorAll('.skill-fill');
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      el.style.width = el.dataset.width + '%';
      skillObserver.unobserve(el);
    }
  });
}, { threshold: 0.3 });
skillFills.forEach(fill => skillObserver.observe(fill));

// ── TIMELINE ANIMATION ──
const timelineItems = document.querySelectorAll('.timeline-item');
const timelineObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.2 });
timelineItems.forEach(item => timelineObserver.observe(item));

// ── GENERAL FADE-IN OBSERVER ──
const fadeEls = document.querySelectorAll('.project-card, .skill-card, .about-card, .proof-card');
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
fadeEls.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity 0.55s ease, transform 0.55s ease';
  fadeObserver.observe(el);
});

// ── CHATBOT ──
const chatbotPanel = document.getElementById('chatbotPanel');
let chatOpen = false;

function toggleChatbot() {
  chatOpen = !chatOpen;
  chatbotPanel.classList.toggle('open', chatOpen);
}

const botResponses = {
  projects: `🚀 Sujit has built 3 AI projects:\n1. <b>AI Voice Assistant</b> — Understands voice commands using NLP\n2. <b>Customer Support AI Agent</b> — Automates ~80% of support queries\n3. <b>ML Prediction System</b> — Data-driven prediction pipeline`,
  skills: `⚡ Sujit's top skills:\n• Python (Advanced) — ML & automation\n• AI/ML — Chatbots, classifiers, NLP\n• Voice AI\n• Web Dev — HTML, CSS, JavaScript\n• Tools — Git, GitHub`,
  contact: `📬 You can reach Sujit at:\n• Email: sujitpramanik017@gmail.com\n• LinkedIn: /sujit-pramanaik\n• GitHub: @sujit-pramaniik\n• Phone/WhatsApp: +91 6294520901`,
  education: `🎓 Sujit is pursuing B.Tech in CSE (AI & ML) at SETGOI, affiliated to MAKAUT (2025–2028). He scored 80% in Higher Secondary (WBCHSE).`,
  hire: `💼 Sujit is open to freelance AI/ML work, collaborations, and learning partnerships! Send him a message using the contact section or email directly.`,
  voice: `🎙️ Sujit's Voice Assistant can:\n• Recognize natural speech commands\n• Search Wikipedia & the web\n• Tell time, date, jokes\n• Respond with text-to-speech\nClick the "Voice AI Demo" button to try it!`,
  default: `🤖 Great question! I can tell you about Sujit's:\n• <b>Projects</b> — AI systems he's built\n• <b>Skills</b> — Tech stack and expertise\n• <b>Education</b> — His learning journey\n• <b>Contact</b> — How to reach him\nJust ask!`
};

function getResponse(msg) {
  const lower = msg.toLowerCase();
  if (lower.includes('project') || lower.includes('built') || lower.includes('made')) return botResponses.projects;
  if (lower.includes('skill') || lower.includes('tech') || lower.includes('python') || lower.includes('language')) return botResponses.skills;
  if (lower.includes('contact') || lower.includes('reach') || lower.includes('email') || lower.includes('whatsapp') || lower.includes('linkedin')) return botResponses.contact;
  if (lower.includes('study') || lower.includes('education') || lower.includes('college') || lower.includes('degree') || lower.includes('btech')) return botResponses.education;
  if (lower.includes('hire') || lower.includes('work') || lower.includes('job') || lower.includes('freelance') || lower.includes('available')) return botResponses.hire;
  if (lower.includes('voice') || lower.includes('speech') || lower.includes('assistant') || lower.includes('microphone')) return botResponses.voice;
  if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey')) return `👋 Hello! I'm Sujit's AI assistant. What would you like to know about him?`;
  if (lower.includes('name') || lower.includes('who')) return `That's Sujit Pramanik — an AI/ML Developer from Durgapur, West Bengal!`;
  if (lower.includes('age') || lower.includes('old')) return `Sujit is a first-year B.Tech student (AI & ML), currently 18 years old.`;
  return botResponses.default;
}

function appendMsg(text, type) {
  const messages = document.getElementById('chatbotMessages');
  const div = document.createElement('div');
  div.className = `chat-msg ${type}-msg`;
  div.innerHTML = `<div class="chat-bubble">${text.replace(/\n/g, '<br/>')}</div>`;
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
}

function sendChat() {
  const input = document.getElementById('chatInput');
  const msg = input.value.trim();
  if (!msg) return;
  // Hide suggestions after first message
  const sugg = document.getElementById('chatSuggestions');
  if (sugg) sugg.style.display = 'none';
  appendMsg(msg, 'user');
  input.value = '';
  setTimeout(() => {
    appendMsg(getResponse(msg), 'bot');
  }, 600);
}

function sendSuggestion(text) {
  document.getElementById('chatSuggestions').style.display = 'none';
  appendMsg(text, 'user');
  setTimeout(() => appendMsg(getResponse(text), 'bot'), 600);
}

// ── DEMO MODAL ──
const demoModal = document.getElementById('demoModal');
const demoData = {
  voice: {
    title: '🎙️ AI Voice Assistant',
    body: `<p style="margin-bottom:12px">This project is a Python-powered voice assistant that listens to spoken commands via microphone, processes them using NLP, and responds with synthesized speech.</p>
           <p style="margin-bottom:12px"><b>Key features:</b></p>
           <ul style="list-style:none;display:flex;flex-direction:column;gap:6px;">
             <li>✅ Real-time speech recognition</li>
             <li>✅ Intent detection</li>
             <li>✅ Wikipedia lookups & web search</li>
             <li>✅ Date/time queries, jokes, and more</li>
             <li>✅ Text-to-speech responses</li>
           </ul>
           <br><a href="https://github.com/sujit-pramaniik" target="_blank" style="color:var(--accent);font-weight:600;">🔗 View on GitHub →</a>`
  },
  support: {
    title: '🤖 Customer Support AI Agent',
    body: `<p style="margin-bottom:12px">An NLP-based chatbot that classifies customer queries and provides automated responses, designed to handle repetitive support interactions 24/7.</p>
           <p style="margin-bottom:12px"><b>Key features:</b></p>
           <ul style="list-style:none;display:flex;flex-direction:column;gap:6px;">
             <li>✅ Intent classification</li>
             <li>✅ ~80% of queries handled automatically</li>
             <li>✅ Escalation logic for complex queries</li>
             <li>✅ Flask REST API backend</li>
             <li>✅ Trained on custom domain dataset</li>
           </ul>
           <br><a href="https://github.com/sujit-pramaniik" target="_blank" style="color:var(--accent);font-weight:600;">🔗 View on GitHub →</a>`
  },
  ml: {
    title: '📈 ML Prediction System',
    body: `<p style="margin-bottom:12px">A supervised machine learning pipeline that takes raw data, preprocesses it, trains models, evaluates them, and outputs predictions with visualizations.</p>
           <p style="margin-bottom:12px"><b>Key features:</b></p>
           <ul style="list-style:none;display:flex;flex-direction:column;gap:6px;">
             <li>✅ Full data preprocessing pipeline</li>
             <li>✅ Multiple model comparison</li>
             <li>✅ Cross-validation & evaluation metrics</li>
             <li>✅ matplotlib data visualizations</li>
             <li>✅ Clean notebook workflow</li>
           </ul>
           <br><a href="https://github.com/sujit-pramaniik" target="_blank" style="color:var(--accent);font-weight:600;">🔗 View on GitHub →</a>`
  }
};

function openDemoModal(type) {
  const data = demoData[type];
  document.getElementById('modalTitle').textContent = data.title;
  document.getElementById('modalBody').innerHTML = data.body;
  demoModal.classList.add('open');
}
function closeModal(e) {
  if (e.target === demoModal) closeDemoModal();
}
function closeDemoModal() {
  demoModal.classList.remove('open');
}

// ── VOICE MODAL ──
const voiceModal = document.getElementById('voiceModal');
document.getElementById('voiceDemoBtn').addEventListener('click', () => {
  voiceModal.classList.add('open');
});
function closeVoiceModal(e) {
  if (e.target === voiceModal) voiceModal.classList.remove('open');
}
function closeVoiceModalDirect() {
  voiceModal.classList.remove('open');
  stopVoiceVisualizer();
}

let visualizerInterval = null;
function startVoiceDemo() {
  const btn = document.getElementById('voiceTriggerBtn');
  const status = document.getElementById('voiceStatus');
  const bars = document.querySelectorAll('.v-bar');
  btn.style.background = 'linear-gradient(135deg, #ef4444, #f97316)';
  status.textContent = 'Listening... Speak your command!';
  // Animate bars
  visualizerInterval = setInterval(() => {
    bars.forEach(bar => {
      bar.style.height = (Math.random() * 42 + 8) + 'px';
    });
  }, 120);
  setTimeout(() => {
    stopVoiceVisualizer();
    status.textContent = 'Processing command...';
    setTimeout(() => {
      simulateVoice('Tell me about AI');
      status.textContent = 'Click the microphone to start';
      btn.style.background = '';
    }, 1000);
  }, 3000);
}

function stopVoiceVisualizer() {
  if (visualizerInterval) {
    clearInterval(visualizerInterval);
    visualizerInterval = null;
    document.querySelectorAll('.v-bar').forEach(bar => bar.style.height = '8px');
  }
}

const voiceReplies = {
  'what time is it?': `🕐 The current time is ${new Date().toLocaleTimeString('en-IN', {hour:'2-digit', minute:'2-digit'})}.`,
  'tell me about ai': '🤖 Artificial Intelligence is the simulation of human intelligence processes by computer systems. It includes learning, reasoning, and self-correction! (Source: Wikipedia)',
  'open youtube': '🎬 Opening YouTube in your browser... (In the real assistant, this would launch youtube.com)',
  'who are you?': "🎙️ I am Sujit's AI Voice Assistant! I can help you search the web, tell you the time, date, jokes, and more. How can I assist you?",
  'tell me about ml': '📊 Machine Learning is a type of AI where systems learn from data to improve their performance over time without being explicitly programmed.',
  'hello': '👋 Hello! I am your AI assistant. How can I help you today?',
};

function simulateVoice(cmd) {
  if (!cmd || !cmd.trim()) return;
  const commandEl = document.getElementById('voiceCommandDisplay');
  const replyEl = document.getElementById('voiceReplyDisplay');
  const inputEl = document.getElementById('voiceTextInput');
  commandEl.textContent = `You said: "${cmd}"`;
  replyEl.textContent = 'Processing...';
  if (inputEl) inputEl.value = '';
  setTimeout(() => {
    const lowerCmd = cmd.toLowerCase().trim();
    const reply = voiceReplies[lowerCmd] ||
      `🔍 Searching for "${cmd}"... Here's what I found: This is a simulated response. In the real voice assistant built with Python, this would fetch results from Wikipedia or the web!`;
    replyEl.innerHTML = reply;
  }, 800);
}

// ── CONTACT FORM (EMAILJS) ──
// Initialize EmailJS with your Public Key (Replace 'YOUR_PUBLIC_KEY' with your actual public key from the EmailJS dashboard)
emailjs.init("6lK7kGAUA6j2gWcSn");

function handleFormSubmit(e) {
  e.preventDefault();
  const btn = document.getElementById('formSubmitBtn');
  const note = document.getElementById('formNote');
  
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
  btn.disabled = true;

  // Parameters: service_id, template_id, target_form_element
  // Note: Service ID for Gmail usually starts with "service_". Please verify in your EmailJS dashboard.
  emailjs.sendForm('service_bp184mh', 'template_pdmr7uc', e.target)
    .then(() => {
      // Success
      btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
      btn.style.background = 'linear-gradient(135deg, #10b981, #06b6d4)';
      note.textContent = '✅ Thanks! Sujit will get back to you within 24 hours.';
      document.getElementById('contactForm').reset();
      
      // Reset button after 4 seconds
      setTimeout(() => {
        btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
        btn.style.background = '';
        btn.disabled = false;
        note.textContent = '';
      }, 4000);
      
    }, (error) => {
      // Error
      console.error('EmailJS Error:', error);
      btn.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Failed to send';
      btn.style.background = '#ef4444';
      note.textContent = '❌ Something went wrong. Please check if your Public Key and Service ID are correct in script.js.';
      
      // Reset button after 4 seconds
      setTimeout(() => {
        btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
        btn.style.background = '';
        btn.disabled = false;
        note.textContent = '';
      }, 4000);
    });
}

// ── ACTIVE NAV LINK HIGHLIGHT ──
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });
  navAnchors.forEach(a => {
    a.classList.remove('active');
    if (a.getAttribute('href') === '#' + current) a.classList.add('active');
  });
}, { passive: true });
