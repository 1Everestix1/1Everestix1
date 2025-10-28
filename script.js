// Копирование в буфер обмена
async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        const button = event.currentTarget;
        const icon = button.querySelector('i');
        
        // Сохраняем оригинальную иконку
        const originalIcon = icon.getAttribute('data-feather');
        
        // Меняем на галочку
        icon.setAttribute('data-feather', 'check');
        feather.replace();
        
        // Через 2 секунды возвращаем оригинальную иконку
        setTimeout(() => {
            icon.setAttribute('data-feather', originalIcon);
            feather.replace();
        }, 2000);
    } catch (err) {
        console.error('Failed to copy text: ', err);
    }
}

// Theme Management
const THEME_KEY = 'homescript-theme';

function initTheme() {
    // Load saved theme or default to dark
    const savedTheme = localStorage.getItem(THEME_KEY) || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem(THEME_KEY, newTheme);
    updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
    // Update icon in navbar shadow DOM
    setTimeout(() => {
        const navbar = document.querySelector('custom-navbar');
        if (navbar && navbar.shadowRoot) {
            const themeButton = navbar.shadowRoot.querySelector('#themeToggle');
            const icon = themeButton?.querySelector('i');
            if (icon) {
                if (theme === 'dark') {
                    icon.setAttribute('data-feather', 'sun');
                    themeButton.title = 'Переключить на светлую тему';
                } else {
                    icon.setAttribute('data-feather', 'moon');
                    themeButton.title = 'Переключить на темную тему';
                }
                if (window.feather) {
                    window.feather.replace();
                }
            }
        }
    }, 100);
}

// Sidebar Management
const SIDEBAR_STATE_KEY = 'homescript-sidebar-state';

function initSidebar() {
    const savedState = localStorage.getItem(SIDEBAR_STATE_KEY);
    const sidebar = document.querySelector('custom-sidebar');
    const mainContent = document.querySelector('main');
    
    if (sidebar && sidebar.shadowRoot) {
        const sidebarElement = sidebar.shadowRoot.querySelector('#sidebar');
        
        if (savedState === 'collapsed') {
            sidebarElement?.classList.add('collapsed');
            mainContent?.classList.add('sidebar-collapsed');
        }
    }
}

function toggleSidebar() {
    const sidebar = document.querySelector('custom-sidebar');
    const mainContent = document.querySelector('main');
    const overlay = document.getElementById('sidebarOverlay');
    
    if (sidebar && sidebar.shadowRoot) {
        const sidebarElement = sidebar.shadowRoot.querySelector('#sidebar');
        
        // For mobile - toggle open/close
        if (window.innerWidth <= 768) {
            sidebarElement?.classList.toggle('open');
            if (sidebarElement?.classList.contains('open')) {
                overlay?.classList.add('active');
                document.body.style.overflow = 'hidden';
            } else {
                overlay?.classList.remove('active');
                document.body.style.overflow = '';
            }
        } else {
            // For desktop - toggle collapsed/expanded
            sidebarElement?.classList.toggle('collapsed');
            mainContent?.classList.toggle('sidebar-collapsed');
            
            // Save state
            const isCollapsed = sidebarElement?.classList.contains('collapsed');
            localStorage.setItem(SIDEBAR_STATE_KEY, isCollapsed ? 'collapsed' : 'expanded');
        }
    }
    // Закрытие по клику на overlay
    if (overlay) {
        overlay.onclick = function() {
            if (sidebar && sidebar.shadowRoot) {
                const sidebarElement = sidebar.shadowRoot.querySelector('#sidebar');
                if (sidebarElement?.classList.contains('open')) {
                    sidebarElement.classList.remove('open');
                    overlay.classList.remove('active');
                    document.body.style.overflow = '';
                }
            }
        };
    }
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Initialize theme
    initTheme();
    
    // Initialize sidebar state
    setTimeout(() => {
        initSidebar();
    }, 100);
    
    // Setup theme toggle button
    setTimeout(() => {
        const navbar = document.querySelector('custom-navbar');
        if (navbar && navbar.shadowRoot) {
            const themeButton = navbar.shadowRoot.querySelector('#themeToggle');
            themeButton?.addEventListener('click', toggleTheme);
            
            const sidebarToggle = navbar.shadowRoot.querySelector('#sidebarToggle');
            sidebarToggle?.addEventListener('click', toggleSidebar);
        }
    }, 100);
    
    // Initialize tooltips
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    tooltipElements.forEach(el => {
        const tooltipText = el.getAttribute('data-tooltip');
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip hidden absolute z-50 bg-gray-800 text-white text-xs rounded py-1 px-2 bottom-full mb-2 whitespace-nowrap';
        tooltip.textContent = tooltipText;
        el.appendChild(tooltip);
        
        el.addEventListener('mouseenter', () => {
            tooltip.classList.remove('hidden');
        });
        
        el.addEventListener('mouseleave', () => {
            tooltip.classList.add('hidden');
        });
    });

    // Copy to clipboard functionality for code blocks
    document.querySelectorAll('pre').forEach(pre => {
        const button = document.createElement('button');
        button.className = 'copy-btn absolute top-2 right-2 bg-gray-200 hover:bg-gray-300 rounded px-2 py-1 text-xs';
        button.innerHTML = '<i data-feather="copy" class="w-3 h-3"></i> Копировать';
        button.addEventListener('click', () => {
            const text = pre.textContent;
            navigator.clipboard.writeText(text).then(() => {
                button.innerHTML = '<i data-feather="check" class="w-3 h-3"></i> Скопировано!';
                setTimeout(() => {
                    button.innerHTML = '<i data-feather="copy" class="w-3 h-3"></i> Копировать';
                    feather.replace();
                }, 2000);
            });
        });
        pre.style.position = 'relative';
        pre.appendChild(button);
    });

    // Initialize feather icons
    if (window.feather) {
        feather.replace();
    }
    
    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            const sidebar = document.querySelector('custom-sidebar');
            if (sidebar && sidebar.shadowRoot) {
                const sidebarElement = sidebar.shadowRoot.querySelector('#sidebar');
                // Remove 'open' class when resizing to desktop
                if (window.innerWidth > 768) {
                    sidebarElement?.classList.remove('open');
                }
            }
        }, 250);
    });
});
