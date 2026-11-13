// ==========================================================================
// SOMESHA K — OFFICIAL SOFTWARE ENGINEERING & AI PORTFOLIO (somesha.shop)
// Cross-Browser Compatible: Chrome, Firefox, Safari, Edge, Mobile & Tablet
// 100% Client-Side Edge Architecture (Cloudflare / GitHub Pages Compatible)
// ==========================================================================

// 1. Mouse Glow Follower (Desktop Only)
const mouseGlow = document.getElementById("mouseGlow");

window.addEventListener("mousemove", (e) => {
    if (mouseGlow && window.innerWidth > 768) {
        mouseGlow.style.left = `${e.clientX}px`;
        mouseGlow.style.top = `${e.clientY}px`;
    }
});

// 2. Cyber Matrix Canvas Rain Animation
function initMatrixCanvas() {
    const canvas = document.getElementById("cyberMatrixCanvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let resizeTimeout;
    window.addEventListener("resize", () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        }, 150);
    });

    const chars = "010101SK01SOMESHASHOP101010FULLSTACKAIENGINEER101";
    const fontSize = 14;
    const columns = Math.floor(width / fontSize);
    const drops = [];

    for (let i = 0; i < columns; i++) {
        drops[i] = Math.random() * -100;
    }

    function draw() {
        ctx.fillStyle = "rgba(7, 9, 14, 0.08)";
        ctx.fillRect(0, 0, width, height);

        ctx.fillStyle = "#10b981";
        ctx.font = `${fontSize}px monospace`;

        for (let i = 0; i < drops.length; i++) {
            const text = chars.charAt(Math.floor(Math.random() * chars.length));
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }

    setInterval(draw, 50);
}

// 3. Dynamic Typewriter Effect
const typeWords = [
    "Aspiring Software Engineer",
    "Python & Full-Stack Developer",
    "AI & Machine Learning Builder",
    "Cloud & Web Systems Developer",
    "B.E. CSE @ SJM Institute of Technology"
];

let wordIdx = 0;
let charIdx = 0;
let isDeleting = false;
const typingElem = document.getElementById("typingText");

function runTypewriter() {
    if (!typingElem) return;
    const current = typeWords[wordIdx];

    if (isDeleting) {
        typingElem.textContent = current.substring(0, charIdx - 1);
        charIdx--;
    } else {
        typingElem.textContent = current.substring(0, charIdx + 1);
        charIdx++;
    }

    let speed = isDeleting ? 30 : 65;

    if (!isDeleting && charIdx === current.length) {
        speed = 2200;
        isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        wordIdx = (wordIdx + 1) % typeWords.length;
        speed = 350;
    }

    setTimeout(runTypewriter, speed);
}

// 4. Navbar Scroll & Active Link Spy
const navbar = document.getElementById("navbar");
const toTopBtn = document.getElementById("toTopBtn");

window.addEventListener("scroll", () => {
    const scrollPos = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollPos > 50) {
        navbar?.classList.add("scrolled");
    } else {
        navbar?.classList.remove("scrolled");
    }

    if (scrollPos > 450) {
        toTopBtn?.classList.add("show");
    } else {
        toTopBtn?.classList.remove("show");
    }

    const sections = document.querySelectorAll("section[id]");
    sections.forEach((sec) => {
        const h = sec.offsetHeight;
        const top = sec.offsetTop - 140;
        const id = sec.getAttribute("id");
        const link = document.querySelector(`.nav-links a[href*="${id}"]`);

        if (scrollPos > top && scrollPos <= top + h) {
            link?.classList.add("active");
        } else {
            link?.classList.remove("active");
        }
    });
});

// 5. Back To Top Action
if (toTopBtn) {
    toTopBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

// 6. Mobile Menu Toggle (Cross-Browser Touch Support)
const mobileBtn = document.getElementById("mobileMenuBtn");
const navLinks = document.getElementById("navLinks");

if (mobileBtn && navLinks) {
    mobileBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        navLinks.classList.toggle("open");
        const icon = mobileBtn.querySelector("i");
        if (navLinks.classList.contains("open")) {
            icon?.classList.remove("fa-bars-staggered");
            icon?.classList.add("fa-xmark");
            document.body.style.overflow = "hidden"; // Prevent background scroll on mobile
        } else {
            icon?.classList.remove("fa-xmark");
            icon?.classList.add("fa-bars-staggered");
            document.body.style.overflow = "";
        }
    });

    document.querySelectorAll(".nav-item, .nav-cta-btn").forEach((item) => {
        item.addEventListener("click", () => {
            navLinks.classList.remove("open");
            document.body.style.overflow = "";
            const icon = mobileBtn.querySelector("i");
            if (icon) {
                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars-staggered");
            }
        });
    });

    // Close when clicking outside
    document.addEventListener("click", (e) => {
        if (navLinks.classList.contains("open") && !navLinks.contains(e.target) && !mobileBtn.contains(e.target)) {
            navLinks.classList.remove("open");
            document.body.style.overflow = "";
            const icon = mobileBtn.querySelector("i");
            if (icon) {
                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars-staggered");
            }
        }
    });
}

// 7. Toast Notification Helper
function showToast(message) {
    const toast = document.getElementById("toastBubble");
    const msgElem = document.getElementById("toastMsg");
    if (!toast) return;

    if (msgElem) msgElem.textContent = message;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 3800);
}

function copyEmailToClipboard() {
    const email = "ksomesha13@gmail.com";
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(email).then(() => {
            showToast("Copied ksomesha13@gmail.com to clipboard!");
        }).catch(() => {
            showToast("Email: ksomesha13@gmail.com");
        });
    } else {
        showToast("Email: ksomesha13@gmail.com");
    }
}

// 8. Resume Download Tracker
function trackResumeDownload() {
    try {
        const count = parseInt(localStorage.getItem("somesha_resume_downloads") || "0", 10) + 1;
        localStorage.setItem("somesha_resume_downloads", count.toString());
        showToast("Resume download started!");
    } catch (e) {}
}

// 9. Contact Form Handler (Direct Cloud Submission & Fail-Safe Fallback)
async function handleFormSubmission(e) {
    e.preventDefault();
    const name = document.getElementById("senderName").value.trim();
    const email = document.getElementById("senderEmail").value.trim();
    const phone = document.getElementById("senderPhone")?.value.trim() || "";
    const subject = document.getElementById("msgSubject").value.trim();
    const message = document.getElementById("msgBody").value.trim();
    const btnText = document.getElementById("submitBtnText");
    const submitBtn = document.getElementById("submitMsgBtn");

    if (!name || !email || !message) {
        showToast("Please fill in all required fields.");
        return;
    }

    if (btnText) btnText.textContent = "Sending Message...";
    if (submitBtn) submitBtn.disabled = true;

    // Save message locally
    try {
        const existing = JSON.parse(localStorage.getItem("somesha_inbox") || "[]");
        existing.unshift({
            name, email, phone, subject, message, date: new Date().toISOString()
        });
        localStorage.setItem("somesha_inbox", JSON.stringify(existing.slice(0, 50)));
    } catch (err) {}

    // Send via Web3Forms API (Direct Cloud Email Delivery to ksomesha13@gmail.com)
    try {
        const res = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                access_key: "3d508e8b-21d4-42b7-a36c-2f22b7d27e8a", // Public Web3Forms form token
                name: name,
                email: email,
                phone: phone,
                subject: `[Portfolio Inquiry] ${subject || "Contact from somesha.shop"}`,
                message: message,
                from_name: `${name} (somesha.shop)`
            })
        });

        const result = await res.json();
        if (res.ok && result.success) {
            showToast(`Thank you ${name}! Your message has been sent to Somesha K.`);
            document.getElementById("contactForm").reset();
        } else {
            // Fallback to mailto
            triggerMailtoFallback(name, email, phone, subject, message);
        }
    } catch (error) {
        // Fallback to mailto if offline or blocked
        triggerMailtoFallback(name, email, phone, subject, message);
    } finally {
        if (btnText) btnText.textContent = "Send Message Directly";
        if (submitBtn) submitBtn.disabled = false;
    }
}

function triggerMailtoFallback(name, email, phone, subject, message) {
    showToast(`Opening your email client to send to ksomesha13@gmail.com...`);
    const mailSubject = encodeURIComponent(`[somesha.shop] ${subject || "Portfolio Contact"}`);
    const mailBody = encodeURIComponent(
        `Hi Somesha,\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}\n\nSent via somesha.shop`
    );
    window.location.href = `mailto:ksomesha13@gmail.com?subject=${mailSubject}&body=${mailBody}`;
}

// 10. Document Ready Initialization
document.addEventListener("DOMContentLoaded", () => {
    initMatrixCanvas();
    runTypewriter();
});
