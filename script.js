// ============================================================
// DONNÉES DE TRADUCTION (FR / EN)
// ============================================================
const traductions = {
    fr: {
        "titre-poste":   "Étudiant en Licence 2 Informatique",
        "coordonnees":   "Coordonnées",
        "competences":   "Compétences",
        "bdd":           "Bases de données",
        "anglais":       "Anglais",
        "qualites":      "Qualités",
        "q1":            "Polyvalent",
        "q2":            "Dynamique",
        "q3":            "Rigoureux",
        "q4":            "Capacité de travail sous pression",
        "interets":      "Centres d'intérêt",
        "i1":            "Pratique de la natation",
        "i2":            "Voyages",
        "i3":            "Sport",
        "apropos":       "À propos de moi",
        "apropos-txt":   "Étudiant en deuxième année de licence en informatique, je suis passionné par le développement et les technologies. Je maîtrise plusieurs langages de programmation ainsi que les systèmes de gestion de bases de données relationnelles (SGBDR). Rigoureux et motivé, je cherche à mettre mes compétences en pratique et à continuer à évoluer dans le domaine du développement logiciel.",
        "experiences":   "Expériences professionnelles",
        "exp1-titre":    "Projet académique — Application de gestion de bibliothèque",
        "exp1-desc":     "Conception et développement d'une application de gestion de bibliothèque avec une base de données MySQL. Modélisation des données et création des requêtes SQL.",
        "exp2-titre":    "Projet personnel — Site web portfolio",
        "exp2-desc":     "Création d'un site web personnel présentant mes projets et compétences en utilisant HTML, CSS et JavaScript.",
        "formations":    "Formations",
        "formation1":    "Baccalauréat scientifique en 2024 au Lycée Malick Sall de Louga",
        "formation2":    "Licence Informatique en 2026 à l'UIDT de Thiès",
    },
    en: {
        "titre-poste":   "2nd Year Computer Science Student",
        "coordonnees":   "Contact",
        "competences":   "Skills",
        "bdd":           "Databases",
        "anglais":       "English",
        "qualites":      "Qualities",
        "q1":            "Versatile",
        "q2":            "Dynamic",
        "q3":            "Rigorous",
        "q4":            "Ability to work under pressure",
        "interets":      "Interests",
        "i1":            "Swimming",
        "i2":            "Travelling",
        "i3":            "Sports",
        "apropos":       "About me",
        "apropos-txt":   "Second-year computer science student, passionate about development and technology. I am proficient in several programming languages as well as relational database management systems (RDBMS). Rigorous and motivated, I seek to apply my skills and continue to grow in software development.",
        "experiences":   "Work Experience",
        "exp1-titre":    "Academic Project — Library Management Application",
        "exp1-desc":     "Design and development of a library management application with a MySQL database. Data modeling and SQL query creation.",
        "exp2-titre":    "Personal Project — Portfolio Website",
        "exp2-desc":     "Creation of a personal website showcasing my projects and skills using HTML, CSS and JavaScript.",
        "formations":    "Education",
        "formation1":    "Scientific Baccalaureate in 2024 at Lycée Malick Sall, Louga",
        "formation2":    "Bachelor's in Computer Science (2026) at UIDT, Thiès",
    }
};

// Langue active (lire depuis localStorage, défaut = fr)
let langueActive = localStorage.getItem('langue') || 'fr';


// ============================================================
// TYPING EFFECT
// ============================================================
function typingEffect(elementId, texte, vitesse = 60) {
    const el = document.getElementById(elementId);
    el.textContent = '';
    let i = 0;
    const interval = setInterval(() => {
        el.textContent += texte[i];
        i++;
        if (i >= texte.length) clearInterval(interval);
    }, vitesse);
}

// Lancer le typing effect au chargement avec le bon texte
function lancerTyping() {
    typingEffect('titre-poste', traductions[langueActive]['titre-poste'], 55);
}


// ============================================================
// TRADUCTION — appliquer la langue active sur toute la page
// ============================================================
function appliquerLangue(langue) {
    // Mettre à jour tous les éléments avec data-cle (sauf titre-poste géré par typing)
    document.querySelectorAll('[data-cle]').forEach(el => {
        const cle = el.getAttribute('data-cle');
        if (cle !== 'titre-poste' && traductions[langue][cle]) {
            el.textContent = traductions[langue][cle];
        }
    });

    // Mettre à jour langueActive EN PREMIER avant le typing
    langueActive = langue;

    // Relancer le typing effect pour le titre
    lancerTyping();

    // Changer le label du bouton langue
    const btnLangue = document.getElementById('btn-langue');
    btnLangue.textContent = langue === 'fr' ? 'EN' : 'FR';

    // Mettre à jour l'attribut lang de la page
    document.documentElement.lang = langue;

    // Sauvegarder
    localStorage.setItem('langue', langue);
}

// Bouton toggle langue
document.getElementById('btn-langue').addEventListener('click', () => {
    const nouvelleLangue = langueActive === 'fr' ? 'en' : 'fr';
    appliquerLangue(nouvelleLangue);
});


// ============================================================
// COPIER EMAIL AU CLIC
// ============================================================
document.getElementById('btn-copier-email').addEventListener('click', () => {
    const email = document.getElementById('email-texte').textContent;
    navigator.clipboard.writeText(email).then(() => {
        const confirme = document.getElementById('copie-confirme');
        confirme.textContent = langueActive === 'fr' ? '✓ Copié !' : '✓ Copied!';
        confirme.classList.add('visible');
        setTimeout(() => {
            confirme.textContent = '';
            confirme.classList.remove('visible');
        }, 2000);
    });
});


// ============================================================
// TOGGLE MODE SOMBRE / CLAIR
// ============================================================
const btnTheme = document.getElementById('btn-theme');
const iconeTheme = btnTheme.querySelector('i');

if (localStorage.getItem('theme') === 'clair') {
    document.body.classList.add('mode-clair');
    iconeTheme.classList.replace('fa-moon', 'fa-sun');
}

btnTheme.addEventListener('click', () => {
    document.body.classList.toggle('mode-clair');
    const estClair = document.body.classList.contains('mode-clair');
    if (estClair) {
        iconeTheme.classList.replace('fa-moon', 'fa-sun');
        localStorage.setItem('theme', 'clair');
    } else {
        iconeTheme.classList.replace('fa-sun', 'fa-moon');
        localStorage.setItem('theme', 'sombre');
    }
});


// ============================================================
// BARRES DE PROGRESSION ANIMÉES
// ============================================================
function animerBarres() {
    document.querySelectorAll('.barre-remplissage').forEach(barre => {
        const niveau = barre.getAttribute('data-niveau');
        barre.style.width = '0%';
        setTimeout(() => {
            barre.style.width = niveau + '%';
        }, 300);
    });
}


// ============================================================
// INITIALISATION AU CHARGEMENT
// ============================================================
window.addEventListener('load', () => {
    appliquerLangue(langueActive); // applique la langue sauvegardée + lance typing
    animerBarres();
});