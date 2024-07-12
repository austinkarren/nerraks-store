class NavBar extends HTMLElement {
    constructor() {
        super()
    }

    connectedCallback() {
        document.querySelectorAll('[data-parent-link]').forEach(item => {
            item.addEventListener('mouseenter', () => {
                item.classList.add('submenu-open')
            })
            item.addEventListener('mouseleave', () => {
                item.classList.remove('submenu-open')
            })
        })
    }
}

customElements.define('nav-bar', NavBar)