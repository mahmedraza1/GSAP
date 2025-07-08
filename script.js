// GSAP Learning Hub - Interactive JavaScript
class GSAPHub {
    constructor() {
        this.init();
    }

    async init() {
        // Initialize GSAP plugins
        gsap.registerPlugin(ScrollTrigger);
        
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.start());
        } else {
            this.start();
        }
    }

    async start() {
        // Show loading screen
        this.showLoadingScreen();
        
        // Load all data
        await Promise.all([
            this.loadGitHubData(),
            this.loadProjects(),
            this.initializeAnimations()
        ]);
        
        // Hide loading screen
        this.hideLoadingScreen();
        
        // Initialize event listeners
        this.initializeEventListeners();
    }

    showLoadingScreen() {
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen) {
            loadingScreen.style.display = 'flex';
        }
    }

    hideLoadingScreen() {
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen) {
            gsap.to(loadingScreen, {
                opacity: 0,
                duration: 0.5,
                onComplete: () => {
                    loadingScreen.style.display = 'none';
                }
            });
        }
    }

    async loadGitHubData() {
        try {
            const username = 'mahmedraza1';
            const repo = 'GSAP';
            
            // Fetch user data
            const userResponse = await fetch(`https://api.github.com/users/${username}`);
            const userData = await userResponse.json();
            
            // Fetch repo data
            const repoResponse = await fetch(`https://api.github.com/repos/${username}/${repo}`);
            const repoData = await repoResponse.json();
            
            // Update profile information
            this.updateProfile(userData);
            
            // Update repository stats
            this.updateRepoStats(repoData);
            
        } catch (error) {
            console.error('Error loading GitHub data:', error);
            this.setFallbackData();
        }
    }

    updateProfile(userData) {
        const profilePicture = document.getElementById('profilePicture');
        const footerProfilePicture = document.getElementById('footerProfilePicture');
        const profileName = document.getElementById('profileName');
        const profileUsername = document.getElementById('profileUsername');
        
        if (profilePicture && userData.avatar_url) {
            profilePicture.src = userData.avatar_url;
            profilePicture.alt = `${userData.name || userData.login} Avatar`;
        }
        
        if (footerProfilePicture && userData.avatar_url) {
            footerProfilePicture.src = userData.avatar_url;
            footerProfilePicture.alt = `${userData.name || userData.login} Avatar`;
        }
        
        if (profileName) {
            profileName.textContent = userData.name || 'Muhammad Ahmed Raza';
        }
        
        if (profileUsername) {
            profileUsername.textContent = `@${userData.login}`;
        }
    }

    updateRepoStats(repoData) {
        const starCount = document.getElementById('starCount');
        const heroStarCount = document.getElementById('heroStarCount');
        const repoStars = document.getElementById('repoStars');
        const footerStarCount = document.getElementById('footerStarCount');
        const lastUpdated = document.getElementById('lastUpdated');
        
        const stars = repoData.stargazers_count || 0;
        
        if (starCount) {
            this.animateCounter(starCount, stars);
        }
        
        if (heroStarCount) {
            this.animateCounter(heroStarCount, stars);
        }
        
        if (repoStars) {
            this.animateCounter(repoStars, stars);
        }
        
        if (footerStarCount) {
            this.animateCounter(footerStarCount, stars);
        }
        
        if (lastUpdated && repoData.updated_at) {
            const date = new Date(repoData.updated_at);
            lastUpdated.textContent = date.toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric' 
            });
        }
    }

    setFallbackData() {
        const profilePicture = document.getElementById('profilePicture');
        const footerProfilePicture = document.getElementById('footerProfilePicture');
        const profileName = document.getElementById('profileName');
        const profileUsername = document.getElementById('profileUsername');
        const lastUpdated = document.getElementById('lastUpdated');
        
        if (profilePicture) {
            profilePicture.src = `https://github.com/mahmedraza1.png`;
            profilePicture.alt = 'Muhammad Ahmed Raza Avatar';
        }
        
        if (footerProfilePicture) {
            footerProfilePicture.src = `https://github.com/mahmedraza1.png`;
            footerProfilePicture.alt = 'Muhammad Ahmed Raza Avatar';
        }
        
        if (profileName) {
            profileName.textContent = 'Muhammad Ahmed Raza';
        }
        
        if (profileUsername) {
            profileUsername.textContent = '@mahmedraza1';
        }
        
        if (lastUpdated) {
            lastUpdated.textContent = new Date().toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric' 
            });
        }
    }

    async loadProjects() {
        try {
            const response = await fetch('./projects.json');
            const data = await response.json();
            
            this.renderProjects(data.projects);
            this.updateProjectStats(data.projects);
            
        } catch (error) {
            console.error('Error loading projects:', error);
            this.showProjectsError();
        }
    }

    renderProjects(projects) {
        const projectsGrid = document.getElementById('projectsGrid');
        const projectsLoading = document.getElementById('projectsLoading');
        
        if (projectsLoading) {
            projectsLoading.style.display = 'none';
        }
        
        if (!projectsGrid) return;
        
        projectsGrid.innerHTML = '';
        
        projects.forEach((project, index) => {
            const projectCard = this.createProjectCard(project, index);
            projectsGrid.appendChild(projectCard);
        });
        
        // Animate project cards
        this.animateProjectCards();
    }

    createProjectCard(project, index) {
        const card = document.createElement('div');
        card.className = 'project-card bg-card-secondary border border-border-custom rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-card relative overflow-hidden group mb-4';
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        
        const difficultyClass = project.difficulty.toLowerCase() === 'beginner' ? 'bg-primary/10 border border-primary/20 text-primary' :
                               project.difficulty.toLowerCase() === 'intermediate' ? 'bg-secondary/10 border border-secondary/20 text-secondary' :
                               'bg-red-500/10 border border-red-500/20 text-red-400';
        
        const projectUrl = `./${encodeURIComponent(project.name)}/`;
        
        card.innerHTML = `
            <div class="absolute top-0 left-0 w-full h-1 bg-gradient-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
            
            <div class="flex justify-between items-start mb-4">
                <div>
                    <h3 class="text-xl font-semibold text-text-primary mb-1">${project.name}</h3>
                    <p class="text-sm text-text-secondary font-medium">${project.category}</p>
                </div>
                <span class="px-3 py-1 rounded-lg text-xs font-semibold uppercase tracking-wide ${difficultyClass}">${project.difficulty}</span>
            </div>
            
            <p class="text-text-secondary mb-4 leading-relaxed">${project.description}</p>
            
            <div class="flex flex-wrap gap-2 mb-4">
                ${project.technologies.map(tech => `<span class="px-3 py-1 bg-card border border-border-custom rounded-lg text-xs text-text-secondary font-medium">${tech}</span>`).join('')}
            </div>
            
            <div class="mb-6">
                <h4 class="text-sm font-semibold text-text-primary mb-3 flex items-center gap-2">
                    <i class="fas fa-list-check text-primary text-xs"></i>
                    Features:
                </h4>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    ${project.features.map(feature => `
                        <div class="flex items-center gap-2 text-sm text-text-secondary">
                            <div class="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0"></div>
                            <span>${feature}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div class="flex justify-between items-center pt-4 border-t border-border-custom">
                <span class="text-xs text-text-muted flex items-center gap-2">
                    <i class="fas fa-calendar text-xs"></i>
                    ${new Date(project.lastUpdated).toLocaleDateString()}
                </span>
                <a href="${projectUrl}" class="flex items-center gap-2 px-4 py-2 bg-gradient-primary rounded-lg text-white text-sm font-semibold hover:-translate-y-0.5 transition-all duration-300">
                    <i class="fas fa-external-link-alt"></i>
                    <span>View Project</span>
                </a>
            </div>
        `;
        
        return card;
    }

    animateProjectCards() {
        const cards = document.querySelectorAll('.project-card');
        
        gsap.fromTo(cards, 
            {
                opacity: 0,
                y: 50
            },
            {
                opacity: 1,
                y: 0,
                duration: 0.6,
                stagger: 0.1,
                ease: 'power2.out'
            }
        );
    }

    updateProjectStats(projects) {
        const projectCount = document.getElementById('heroProjectCount');
        const totalProjects = document.getElementById('totalProjects');
        const totalFiles = document.getElementById('totalFiles');
        
        if (projectCount) {
            this.animateCounter(projectCount, projects.length);
        }
        
        if (totalProjects) {
            this.animateCounter(totalProjects, projects.length);
        }
        
        if (totalFiles) {
            // Estimate 3 files per project (HTML, CSS, JS)
            this.animateCounter(totalFiles, projects.length * 3);
        }
    }

    animateCounter(element, target) {
        const obj = { value: 0 };
        gsap.to(obj, {
            value: target,
            duration: 2,
            ease: 'power2.out',
            onUpdate: () => {
                element.textContent = Math.round(obj.value);
            }
        });
    }

    showProjectsError() {
        const projectsGrid = document.getElementById('projectsGrid');
        const projectsLoading = document.getElementById('projectsLoading');
        
        if (projectsLoading) {
            projectsLoading.innerHTML = `
                <div class="text-center py-12">
                    <div class="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i class="fas fa-exclamation-triangle text-accent text-xl"></i>
                    </div>
                    <p class="text-text-secondary">Failed to load projects. Please try again later.</p>
                </div>
            `;
        }
    }

    initializeAnimations() {
        // Navbar animation
        gsap.fromTo('.navbar', 
            { y: -100, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }
        );
        
        // Hero section animation
        const heroTl = gsap.timeline();
        heroTl.fromTo('.hero-title .title-word', 
            { y: 100, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: 'power2.out' }
        )
        .fromTo('.hero-subtitle', 
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }, '-=0.4'
        )
        .fromTo('.hero-stats .stat-item', 
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out' }, '-=0.3'
        );
        
        // Stats section animation
        ScrollTrigger.create({
            trigger: '.stats-section',
            start: 'top 80%',
            onEnter: () => {
                gsap.fromTo('.stat-card', 
                    { y: 50, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out' }
                );
            }
        });
        
        // Floating animation for hero particles
        gsap.to('.hero-particles', {
            y: -10,
            duration: 4,
            repeat: -1,
            yoyo: true,
            ease: 'power2.inOut'
        });
    }

    initializeEventListeners() {
        // Star button functionality
        const starBtn = document.getElementById('starBtn');
        if (starBtn) {
            starBtn.addEventListener('click', () => {
                window.open('https://github.com/mahmedraza1/GSAP', '_blank');
            });
        }
        
        // View toggle functionality
        const viewToggle = document.getElementById('viewToggle');
        if (viewToggle) {
            viewToggle.addEventListener('click', () => {
                this.toggleView();
            });
        }
        
        // Refresh button functionality
        const refreshBtn = document.getElementById('refreshBtn');
        if (refreshBtn) {
            refreshBtn.addEventListener('click', () => {
                this.refreshProjects();
            });
        }
        
        // Add hover effects to project cards
        this.addProjectCardHoverEffects();
    }

    toggleView() {
        const projectsGrid = document.getElementById('projectsGrid');
        const viewToggle = document.getElementById('viewToggle');
        
        if (projectsGrid && viewToggle) {
            const icon = viewToggle.querySelector('i');
            
            if (projectsGrid.classList.contains('list-view')) {
                projectsGrid.classList.remove('list-view');
                projectsGrid.className = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8';
                icon.className = 'fas fa-th-large';
            } else {
                projectsGrid.classList.add('list-view');
                projectsGrid.className = 'list-view gap-6 mb-8';
                icon.className = 'fas fa-list';
            }
            
            // Re-animate cards after view change
            this.animateProjectCards();
        }
    }

    async refreshProjects() {
        const refreshBtn = document.getElementById('refreshBtn');
        if (refreshBtn) {
            const icon = refreshBtn.querySelector('i');
            icon.style.animation = 'spin 1s linear infinite';
            
            await this.loadProjects();
            
            setTimeout(() => {
                icon.style.animation = '';
            }, 1000);
        }
    }

    addProjectCardHoverEffects() {
        const cards = document.querySelectorAll('.project-card');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                gsap.to(card, {
                    scale: 1.02,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });
            
            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    scale: 1,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });
        });
    }
}

// Initialize the GSAP Hub when the page loads
const gsapHub = new GSAPHub();
