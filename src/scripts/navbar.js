class NavBar extends HTMLElement {
    constructor() {
        super()
    }

    connectedCallback() {
        console.log("NAVBAR MOUNTED")
        document.querySelectorAll('.parent-link').forEach(item => {
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