class CustomSidebar extends HTMLElement {
    connectedCallback() {
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.innerHTML = `
        <style>
          .sidebar {
            width: 16rem;
            background-color: var(--sidebar-bg);
            box-shadow: 1px 0 3px rgba(0, 0, 0, 0.1);
            height: calc(100vh - 4rem);
            position: fixed;
            top: 4rem;
            left: 0;
            overflow-y: auto;
            transition: transform 0.3s ease-in-out, width 0.3s ease-in-out;
            z-index: 40;
          }
          .sidebar.collapsed {
            width: 4rem;
          }
          .sidebar-header {
            padding: 1.5rem 1rem 1rem;
            border-bottom: 1px solid var(--border-color);
            margin-bottom: 1rem;
          }
          .sidebar-title {
            font-weight: 600;
            color: var(--text-primary);
            display: flex;
            align-items: center;
            white-space: nowrap;
            overflow: hidden;
          }
          .sidebar.collapsed .sidebar-title {
            justify-content: center;
          }
          .sidebar-icon {
            margin-right: 0.5rem;
            color: #3b82f6;
            flex-shrink: 0;
          }
          .sidebar.collapsed .sidebar-icon {
            margin-right: 0;
          }
          .title-text {
            transition: opacity 0.3s;
          }
          .sidebar.collapsed .title-text {
            opacity: 0;
            width: 0;
          }
          .sidebar-menu {
            padding: 0 1rem;
          }
          .menu-title {
            font-size: 0.75rem;
            font-weight: 600;
            color: var(--text-secondary);
            text-transform: uppercase;
            letter-spacing: 0.05em;
            margin-bottom: 0.5rem;
            padding-left: 0.5rem;
            white-space: nowrap;
            overflow: hidden;
            transition: opacity 0.3s;
          }
          .sidebar.collapsed .menu-title {
            opacity: 0;
            height: 0;
            margin: 0;
            padding: 0;
          }
          .menu-item {
            display: flex;
            align-items: center;
            padding: 0.75rem 1rem;
            border-radius: 0.375rem;
            color: var(--text-secondary);
            font-weight: 500;
            transition: all 0.2s;
            cursor: pointer;
            margin-bottom: 0.25rem;
            text-decoration: none;
            position: relative;
            white-space: nowrap;
          }
          .menu-item:hover {
            background-color: var(--hover-bg);
            color: #3b82f6;
          }
          .menu-item.active {
            background-color: rgba(59, 130, 246, 0.1);
            color: #3b82f6;
          }
          .menu-icon {
            margin-right: 0.75rem;
            width: 1rem;
            height: 1rem;
            flex-shrink: 0;
          }
          .sidebar.collapsed .menu-icon {
            margin-right: 0;
          }
          .menu-text {
            transition: opacity 0.3s;
            flex: 1;
          }
          .sidebar.collapsed .menu-text {
            opacity: 0;
            width: 0;
          }
          .menu-badge {
            margin-left: auto;
            background-color: var(--badge-bg);
            color: var(--badge-text);
            font-size: 0.75rem;
            font-weight: 600;
            padding: 0.125rem 0.5rem;
            border-radius: 9999px;
            transition: opacity 0.3s;
          }
          .sidebar.collapsed .menu-badge {
            opacity: 0;
            width: 0;
            padding: 0;
          }
          .sidebar.collapsed .menu-item {
            justify-content: center;
            padding: 0.75rem 0.5rem;
          }
          .mt-4 {
            margin-top: 1rem;
          }
          @media (max-width: 768px) {
            .sidebar {
              transform: translateX(-100%);
            }
            .sidebar.open {
              transform: translateX(0);
            }
          }
        </style>
        <div class="sidebar" id="sidebar">
          <div class="sidebar-header">
            <h3 class="sidebar-title">
              <i data-feather="menu" class="sidebar-icon"></i>
              <span class="title-text">Меню</span>
            </h3>
          </div>
          <div class="sidebar-menu">
            <div class="menu-title">Категории</div>
            <a href="/category/network.html" class="menu-item">
              <i data-feather="server" class="menu-icon"></i>
              <span class="menu-text">Сетевые сервисы</span>
              <span class="menu-badge">1</span>
            </a>
            <a href="/category/database.html" class="menu-item">
              <i data-feather="database" class="menu-icon"></i>
              <span class="menu-text">Базы данных</span>
              <span class="menu-badge">0</span>
            </a>
            <a href="/category/security.html" class="menu-item">
              <i data-feather="shield" class="menu-icon"></i>
              <span class="menu-text">Безопасность</span>
              <span class="menu-badge">1</span>
            </a>
            <a href="/category/containers.html" class="menu-item">
              <i data-feather="box" class="menu-icon"></i>
              <span class="menu-text">Контейнеры</span>
              <span class="menu-badge">0</span>
            </a>
            
            <div class="menu-title mt-4">Дополнительно</div>
            <a href="/popular.html" class="menu-item">
              <i data-feather="trending-up" class="menu-icon"></i>
              <span class="menu-text">Популярные</span>
              <span class="menu-badge">2</span>
            </a>
            <a href="/new.html" class="menu-item">
              <i data-feather="plus-circle" class="menu-icon"></i>
              <span class="menu-text">Новые</span>
              <span class="menu-badge">2</span>
            </a>
            <a href="/docs.html" class="menu-item">
              <i data-feather="book" class="menu-icon"></i>
              <span class="menu-text">Документация</span>
            </a>
            <a href="/contribute.html" class="menu-item">
              <i data-feather="github" class="menu-icon"></i>
              <span class="menu-text">Внести вклад</span>
            </a>
          </div>
        </div>
      `;

      // Initialize Feather icons in Shadow DOM
      setTimeout(() => {
        if (window.feather) {
          const icons = this.shadowRoot.querySelectorAll('[data-feather]');
          icons.forEach(icon => {
            const iconName = icon.getAttribute('data-feather');
            const svg = window.feather.icons[iconName];
            if (svg) {
              const newSvg = svg.toSvg({
                class: icon.className,
                width: '1rem',
                height: '1rem'
              });
              const tempDiv = document.createElement('div');
              tempDiv.innerHTML = newSvg;
              const svgElement = tempDiv.firstChild;
              // Copy original classes and add new ones if needed
              svgElement.setAttribute('class', icon.className);
              icon.parentNode.replaceChild(svgElement, icon);
            }
          });
        }
      }, 0);
    }
  }
  customElements.define('custom-sidebar', CustomSidebar);
