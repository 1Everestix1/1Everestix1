class CustomNavbar extends HTMLElement {
    connectedCallback() {
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.innerHTML = `
        <style>
          .navbar {
            background-color: var(--navbar-bg);
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            height: 4rem;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            z-index: 50;
            transition: background-color 0.3s;
          }
          .navbar-container {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 1.5rem;
            height: 100%;
            max-width: 100%;
          }
          .navbar-left {
            display: flex;
            align-items: center;
          }
          .sidebar-toggle {
            background: none;
            border: none;
            color: var(--text-primary);
            cursor: pointer;
            padding: 0.5rem;
            margin-right: 1rem;
            border-radius: 0.375rem;
            transition: background-color 0.2s;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .sidebar-toggle:hover {
            background-color: var(--hover-bg);
          }
          .navbar-brand {
            display: flex;
            align-items: center;
            text-decoration: none;
          }
          .brand-icon {
            color: #3b82f6;
            margin-right: 0.75rem;
          }
          .brand-text {
            font-size: 1.25rem;
            font-weight: 700;
            color: var(--text-primary);
          }
          .navbar-right {
            display: flex;
            align-items: center;
            gap: 0.5rem;
          }
          .search-container {
            position: relative;
            margin-right: 1rem;
          }
          .search-input {
            padding: 0.5rem 1rem 0.5rem 2.5rem;
            border: 1px solid var(--border-color);
            border-radius: 0.5rem;
            width: 300px;
            background-color: var(--input-bg);
            color: var(--text-primary);
            transition: all 0.2s;
          }
          .search-input:focus {
            outline: none;
            border-color: #3b82f6;
            box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
          }
          .search-icon {
            position: absolute;
            left: 0.75rem;
            top: 50%;
            transform: translateY(-50%);
            color: var(--text-secondary);
            width: 1rem;
            height: 1rem;
          }
          .theme-toggle {
            background: none;
            border: none;
            color: var(--text-primary);
            cursor: pointer;
            padding: 0.5rem;
            border-radius: 0.375rem;
            transition: background-color 0.2s;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .theme-toggle:hover {
            background-color: var(--hover-bg);
          }
          .github-link {
            color: var(--text-primary);
            padding: 0.5rem;
            border-radius: 0.375rem;
            transition: background-color 0.2s;
            display: flex;
            align-items: center;
            text-decoration: none;
          }
          .github-link:hover {
            background-color: var(--hover-bg);
          }
          @media (max-width: 768px) {
            .search-container {
              display: none;
            }
          }
        </style>
        <nav class="navbar">
          <div class="navbar-container">
            <div class="navbar-left">
              <button class="sidebar-toggle" id="sidebarToggle">
                <i data-feather="menu" style="width: 20px; height: 20px;"></i>
              </button>
              <a href="/" class="navbar-brand">
                <i data-feather="layers" class="brand-icon" style="width: 28px; height: 28px;"></i>
                <span class="brand-text">HomeScript</span>
              </a>
            </div>
            <div class="navbar-right">
              <div class="search-container">
                <i data-feather="search" class="search-icon"></i>
                <input type="text" class="search-input" placeholder="Поиск скриптов...">
              </div>
              <button class="theme-toggle" id="themeToggle" title="Переключить тему">
                <i data-feather="sun" style="width: 20px; height: 20px;"></i>
              </button>
              <a href="https://github.com" class="github-link" target="_blank" title="GitHub">
                <i data-feather="github" style="width: 20px; height: 20px;"></i>
              </a>
            </div>
          </div>
        </nav>
      `;
      
      // Initialize Feather icons in Shadow DOM
      setTimeout(() => {
        if (window.feather) {
          const icons = this.shadowRoot.querySelectorAll('[data-feather]');
          icons.forEach(icon => {
            const iconName = icon.getAttribute('data-feather');
            const svg = window.feather.icons[iconName];
            if (svg) {
              icon.outerHTML = svg.toSvg({
                width: icon.style.width || '20px',
                height: icon.style.height || '20px',
                class: icon.className
              });
            }
          });
        }
      }, 0);
    }
  }
  customElements.define('custom-navbar', CustomNavbar);
