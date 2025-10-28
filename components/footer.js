class CustomFooter extends HTMLElement {
    connectedCallback() {
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.innerHTML = `
        <style>
          .footer {
            background-color: var(--navbar-bg);
            border-top: 1px solid var(--border-color);
            padding: 2rem 1.5rem;
            margin-top: 4rem;
            transition: background-color 0.3s;
          }
          .footer-container {
            max-width: 1200px;
            margin: 0 auto;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 2rem;
          }
          .footer-section h3 {
            color: var(--text-primary);
            font-size: 1.125rem;
            font-weight: 600;
            margin-bottom: 1rem;
          }
          .footer-section ul {
            list-style: none;
            padding: 0;
            margin: 0;
          }
          .footer-section li {
            margin-bottom: 0.5rem;
          }
          .footer-section a {
            color: var(--text-secondary);
            text-decoration: none;
            transition: color 0.2s;
            display: flex;
            align-items: center;
          }
          .footer-section a:hover {
            color: #3b82f6;
          }
          .footer-section a i {
            margin-right: 0.5rem;
            width: 1rem;
            height: 1rem;
          }
          .footer-bottom {
            border-top: 1px solid var(--border-color);
            margin-top: 2rem;
            padding-top: 1rem;
            text-align: center;
            color: var(--text-secondary);
            font-size: 0.875rem;
          }
          .social-links {
            display: flex;
            gap: 1rem;
            margin-top: 1rem;
          }
          .social-link {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 2rem;
            height: 2rem;
            border-radius: 0.375rem;
            background-color: var(--hover-bg);
            color: var(--text-primary);
            transition: all 0.2s;
          }
          .social-link:hover {
            background-color: #3b82f6;
            color: white;
          }
        </style>
        <footer class="footer">
          <div class="footer-container">
            <div class="footer-section">
              <h3>О проекте</h3>
              <p style="color: var(--text-secondary); line-height: 1.6;">
                HomeScript - коллекция готовых скриптов для автоматизации установки и настройки сервисов на Proxmox.
              </p>
              <div class="social-links">
                <a href="https://github.com" class="social-link" target="_blank" title="GitHub">
                  <i data-feather="github"></i>
                </a>
                <a href="https://twitter.com" class="social-link" target="_blank" title="Twitter">
                  <i data-feather="twitter"></i>
                </a>
                <a href="https://discord.com" class="social-link" target="_blank" title="Discord">
                  <i data-feather="message-circle"></i>
                </a>
              </div>
            </div>
            
            <div class="footer-section">
              <h3>Ссылки</h3>
              <ul>
                <li><a href="/"><i data-feather="home"></i>Главная</a></li>
                <li><a href="/popular.html"><i data-feather="trending-up"></i>Популярные</a></li>
                <li><a href="/docs.html"><i data-feather="book"></i>Документация</a></li>
              </ul>
            </div>
            
            <div class="footer-section">
              <h3>Сообщество</h3>
              <ul>
                <li><a href="/contribute.html"><i data-feather="github"></i>Внести вклад</a></li>
                <li><a href="/about.html"><i data-feather="info"></i>О нас</a></li>
              </ul>
            </div>
          </div>
          
          <div class="footer-bottom">
            <p>&copy; 2025 HomeScript. Все права защищены.</p>
          </div>
        </footer>
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
              svgElement.setAttribute('class', icon.className);
              icon.parentNode.replaceChild(svgElement, icon);
            }
          });
        }
      }, 0);
    }
  }
  customElements.define('custom-footer', CustomFooter);
