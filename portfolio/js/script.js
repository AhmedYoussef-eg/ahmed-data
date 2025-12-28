document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // Dark Mode Toggle
    // ==========================================
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const icon = themeToggle.querySelector('i');

    // Check for saved user preference
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'light') {
        body.classList.add('light-mode');
        icon.classList.replace('ph-sun', 'ph-moon');
    }

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('light-mode');

        if (body.classList.contains('light-mode')) {
            localStorage.setItem('theme', 'light');
            icon.classList.replace('ph-sun', 'ph-moon');
        } else {
            localStorage.setItem('theme', 'dark');
            icon.classList.replace('ph-moon', 'ph-sun');
        }
    });

    // ==========================================
    // Scroll Animations (Intersection Observer)
    // ==========================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => observer.observe(el));

    // ==========================================
    // Mobile Menu Toggle
    // ==========================================
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('toggle');
        });
    }

    // ==========================================
    // Smooth Scrolling for Anchor Links
    // ==========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    hamburger.classList.remove('toggle');
                }
            }
        });
    });

    // ==========================================
    // Language Translation
    // ==========================================
    const langToggle = document.getElementById('lang-toggle');
    const translatableElements = document.querySelectorAll('[data-i18n]');
    const placeholderElements = document.querySelectorAll('[data-i18n-placeholder]');

    const translations = {
        en: {
            nav_about: "About",
            nav_skills: "Skills",
            nav_projects: "Projects",
            nav_experience: "Experience",
            nav_services: "Services",
            nav_contact: "Contact",
            hero_subtitle: "Hello, I'm",
            hero_title: "Ahmed Mohamed Youssef",
            hero_role: "Data Analyst",
            hero_desc: "I transform raw data into clear, actionable insights that empower data-driven decision-making and measurable business growth.",
            hero_btn_projects: "View Projects",
            hero_btn_contact: "Contact Me",
            about_title: "About Me",
            about_p1: "Ahmed is a dedicated Data Analyst with practical, hands-on experience in data cleaning and preparation, exploratory analysis, KPI modeling, dashboard development, and insight reporting.",
            about_p2: "He follows a structured, analysis-driven methodology — starting from understanding the business problem, collecting and cleaning data, performing deep exploratory analysis, visualizing trends, and finally converting insights into actionable recommendations. His work focuses on improving performance, optimizing conversions, and enabling smarter decision-making.",
            skills_title: "Technical Skills",
            skills_cat1: "Analytics & BI",
            skills_cat2: "Programming & DB",
            skills_cat3: "Data & Statistics",
            skill_adv: "Advanced",
            skill_int: "Intermediate",
            skill_int_adv: "Int-Adv",
            skill_vc: "Version Control",
            skill_cleaning: "Data Cleaning & Prep",
            skill_eda: "EDA & Statistics",
            skill_kpi: "KPI Tracking & A/B Testing",
            skill_marketing: "Marketing Analytics",
            projects_title: "Featured Projects",
            proj1_title: "E-Commerce Performance Analysis",
            proj1_desc: "Identified a 35% checkout drop-off and optimized the conversion funnel, increasing conversion rate by 14% and significantly boosting monthly revenue.",
            tag_conversion: "Conversion Optimization",
            tag_funnel: "Funnel Analysis",
            proj2_title: "KPI Dashboard for Service Company",
            proj2_desc: "Built an interactive Power BI dashboard — reducing reporting time from 3 hours daily to just 10 minutes and improving decision-making speed.",
            tag_automation: "Automation",
            tag_dashboarding: "Dashboarding",
            proj3_title: "Marketing Campaign Analysis",
            proj3_desc: "Improved ROAS by 22% and reduced total campaign cost by 12% through segmentation, channel analysis, and A/B testing.",
            tag_marketing: "Marketing Analytics",
            tag_ab: "A/B Testing",
            achievements_title: "Measurable Achievements",
            ach_uplift: "Conversion Uplift",
            ach_cost: "Cost Reduction",
            ach_speed: "Faster Reporting",
            exp_title: "Experience",
            exp1_date: "2023 — Present",
            exp1_role: "Data Analyst — Freelance",
            exp1_li1: "Delivered end-to-end data analysis supporting business optimization.",
            exp1_li2: "Built interactive dashboards for real-time KPI tracking.",
            exp1_li3: "Improved reporting efficiency and conversion insights across multiple projects.",
            exp2_date: "2022 — 2023",
            exp2_role: "Junior Data Analyst — Internship",
            exp2_li1: "Assisted in data preparation, cleaning, and KPI development.",
            exp2_li2: "Supported marketing and user-behavior analysis.",
            exp2_li3: "Contributed to insight and performance reporting.",
            services_title: "Services Offered",
            serv1: "Data Analysis & Reporting",
            serv2: "Dashboard Development",
            serv3: "Marketing & Conversion Analytics",
            serv4: "KPI Modeling & Consulting",
            objective_text: "Ahmed’s goal is to leverage data analytics to drive measurable business growth, improve decision-making efficiency, and continuously deliver insights that create real-world impact.",
            contact_title: "Get In Touch",
            label_name: "Name",
            ph_name: "Your Name",
            label_email: "Email",
            ph_email: "Your Email",
            label_message: "Message",
            ph_message: "How can I help you?",
            btn_send: "Send Message",
            footer_copy: "&copy; 2025 Ahmed Mohamed Youssef. All rights reserved.",
            back_to_top: "Back to Top"
        },
        ar: {
            nav_about: "من أنا",
            nav_skills: "المهارات",
            nav_projects: "المشاريع",
            nav_experience: "الخبرة",
            nav_services: "الخدمات",
            nav_contact: "تواصل معي",
            hero_subtitle: "أهلاً، أنا",
            hero_title: "أحمد محمد يوسف",
            hero_role: "محلل بيانات",
            hero_desc: "أقوم بتحويل البيانات الخام إلى رؤى واضحة وقابلة للتنفيذ تدعم اتخاذ القرارات المبنية على البيانات وتساهم في نمو الأعمال.",
            hero_btn_projects: "عرض المشاريع",
            hero_btn_contact: "تواصل معي",
            about_title: "من أنا",
            about_p1: "أحمد هو محلل بيانات متخصص يتمتع بخبرة عملية في تنظيف البيانات وإعدادها، التحليل الاستكشافي، نمذجة مؤشرات الأداء الرئيسية (KPIs)، تطوير لوحات المعلومات، وإعداد تقارير الرؤى.",
            about_p2: "يتبع منهجية منظمة قائمة على التحليل — بدءاً من فهم مشكلة العمل، جمع وتنظيف البيانات، إجراء تحليل استكشافي عميق، تصور الاتجاهات، وأخيراً تحويل الرؤى إلى توصيات قابلة للتنفيذ. يركز عمله على تحسين الأداء، زيادة معدلات التحويل، وتمكين اتخاذ قرارات أكثر ذكاءً.",
            skills_title: "المهارات التقنية",
            skills_cat1: "التحليل وذكاء الأعمال",
            skills_cat2: "البرمجة وقواعد البيانات",
            skills_cat3: "البيانات والإحصاء",
            skill_adv: "متقدم",
            skill_int: "متوسط",
            skill_int_adv: "متوسط-متقدم",
            skill_vc: "إدارة النسخ",
            skill_cleaning: "تنظيف وإعداد البيانات",
            skill_eda: "التحليل الاستكشافي والإحصاء",
            skill_kpi: "تتبع KPIs واختبار A/B",
            skill_marketing: "تحليلات التسويق",
            projects_title: "مشاريع مختارة",
            proj1_title: "تحليل أداء التجارة الإلكترونية",
            proj1_desc: "تم تحديد انخفاض بنسبة 35% في مرحلة الدفع وتحسين قمع التحويل، مما أدى لزيادة معدل التحويل بنسبة 14% وزيادة الإيرادات الشهرية بشكل ملحوظ.",
            tag_conversion: "تحسين التحويل",
            tag_funnel: "تحليل القمع",
            proj2_title: "لوحة مؤشرات لشركة خدمات",
            proj2_desc: "بناء لوحة تفاعلية باستخدام Power BI — مما قلل وقت إعداد التقارير من 3 ساعات يومياً إلى 10 دقائق فقط وحسن سرعة اتخاذ القرار.",
            tag_automation: "أتمتة",
            tag_dashboarding: "لوحات المعلومات",
            proj3_title: "تحليل الحملات التسويقية",
            proj3_desc: "تحسين العائد على الإنفاق الإعلاني (ROAS) بنسبة 22% وتقليل تكلفة الحملة الإجمالية بنسبة 12% من خلال التقسيم وتحليل القنوات واختبار A/B.",
            tag_marketing: "تحليلات التسويق",
            tag_ab: "اختبار A/B",
            achievements_title: "إنجازات قابلة للقياس",
            ach_uplift: "زيادة التحويل",
            ach_cost: "خفض التكاليف",
            ach_speed: "تقارير أسرع",
            exp_title: "الخبرة العملية",
            exp1_date: "2023 — الحاضر",
            exp1_role: "محلل بيانات — مستقل",
            exp1_li1: "تقديم تحليلات بيانات شاملة لدعم تحسين الأعمال.",
            exp1_li2: "بناء لوحات معلومات تفاعلية لتتبع مؤشرات الأداء في الوقت الفعلي.",
            exp1_li3: "تحسين كفاءة التقارير ورؤى التحويل عبر مشاريع متعددة.",
            exp2_date: "2022 — 2023",
            exp2_role: "محلل بيانات مبتدئ — تدريب",
            exp2_li1: "المساعدة في إعداد وتنظيف البيانات وتطوير مؤشرات الأداء.",
            exp2_li2: "دعم تحليلات التسويق وسلوك المستخدم.",
            exp2_li3: "المساهمة في تقارير الرؤى والأداء.",
            services_title: "الخدمات المقدمة",
            serv1: "تحليل البيانات والتقارير",
            serv2: "تطوير لوحات المعلومات",
            serv3: "تحليلات التسويق والتحويل",
            serv4: "نمذجة KPIs والاستشارات",
            objective_text: "هدف أحمد هو الاستفادة من تحليلات البيانات لدفع نمو الأعمال القابل للقياس، تحسين كفاءة اتخاذ القرار، وتقديم رؤى تخلق تأثيراً حقيقياً باستمرار.",
            contact_title: "تواصل معي",
            label_name: "الاسم",
            ph_name: "اسمك",
            label_email: "البريد الإلكتروني",
            ph_email: "بريدك الإلكتروني",
            label_message: "الرسالة",
            ph_message: "كيف يمكنني مساعدتك؟",
            btn_send: "إرسال الرسالة",
            footer_copy: "&copy; 2025 أحمد محمد يوسف. جميع الحقوق محفوظة.",
            back_to_top: "العودة للأعلى"
        }
    };

    function setLanguage(lang) {
        // Update HTML attributes
        document.documentElement.setAttribute('lang', lang);
        document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');

        // Update Toggle Button Text
        langToggle.textContent = lang === 'ar' ? 'EN' : 'AR';

        // Update Text Content
        translatableElements.forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang][key]) {
                el.innerHTML = translations[lang][key];
            }
        });

        // Update Placeholders
        placeholderElements.forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            if (translations[lang][key]) {
                el.placeholder = translations[lang][key];
            }
        });

        // Save Preference
        localStorage.setItem('lang', lang);
    }

    // Initialize Language
    const savedLang = localStorage.getItem('lang') || 'en';
    setLanguage(savedLang);

    // Toggle Event
    langToggle.addEventListener('click', () => {
        const currentLang = document.documentElement.getAttribute('lang');
        const newLang = currentLang === 'en' ? 'ar' : 'en';
        setLanguage(newLang);
    });

});
