class Tabset {
    constructor(container) {
        this.container = container;
        this.currentTabIndex = 0;
        this.titles = this.container.getElementsByClassName(Tabset.TABSET_TITLE_ITEM_CLASS);
        this.contentItems = this.container.getElementsByClassName(Tabset.TABSET_CONTENT_ITEM_CLASS);

        this.initialize();

        this.activateTabItem(this.currentTabIndex);
    }

    static TABSET_CONTAINER_CLASS = 'tabset-container';
    static TABSET_HEADER_CLASS = 'tabset-header';
    static TABSET_TITLES_CLASS = 'tabset-titles';
    static TABSET_TITLE_ITEM_CLASS = 'tabset-title-item';
    static TABSET_NAV_BUTTONS_CLASS = 'tabset-nav-buttons';
    static TABSET_BTN_CLASS = 'btn';
    static TABSET_NEXT_CLASS = 'next';
    static TABSET_PREV_CLASS = 'prev';
    static TABSET_CONTENT_CLASS = 'tabset-content';
    static TABSET_CONTENT_ITEM_CLASS = 'tabset-content-item';
    static TABSET_ACTIVE_CLASS = 'active';

    initialize() {
        this.restructure();
        this.bindCallbacks();
    }

    restructure() {
        this.container.classList.add(Tabset.TABSET_CONTAINER_CLASS);
        
        let headerDiv = this.createBlock(Tabset.TABSET_HEADER_CLASS);
        let titlesDiv = this.createBlock(Tabset.TABSET_TITLES_CLASS);
        let contentDiv = this.createBlock(Tabset.TABSET_CONTENT_CLASS);

        headerDiv.append(this.container.querySelector('.' + Tabset.TABSET_NAV_BUTTONS_CLASS));

        Array.prototype.forEach.call(this.container.children, element => {
            titlesDiv.append(element.children[0]);
            contentDiv.append(element.children[0]);
        });

        this.container.append(headerDiv);
        headerDiv.prepend(titlesDiv);
        this.container.append(contentDiv);

        this.removeEmptyDivs();
    }

    createBlock(className) {
        let div = document.createElement('div');
        div.classList.add(className);

        return div;
    }

    removeEmptyDivs() {
        let elements = this.container.children;
        for(let i = 0; i < elements.length; i++) {
            if(elements[i].classList.length === 0) {
                elements[i].remove();
                i--;
            }
        }
    }

    bindCallbacks() {
        this.container.querySelector('.' + Tabset.TABSET_HEADER_CLASS).addEventListener('click', this.onHeaderClick.bind(this));
    }

    onHeaderClick(e) {
        if(e.target.classList.contains(Tabset.TABSET_TITLE_ITEM_CLASS)) {
            this.onTitleClick(e.target);
        } else if(e.target.classList.contains(Tabset.TABSET_BTN_CLASS)) {
            this.onNavButtonsClick(e.target);
        }
    }

    onTitleClick(titleItem) {
        const index = this.getIndexOfTitleItem(titleItem);

        if(index !== this.currentTabIndex) {
            this.hide();
            this.currentTabIndex = index;
            this.activateTabItem();
        }
    }

    getIndexOfTitleItem(titleItem) {
        return Array.from(titleItem.parentNode.children).indexOf(titleItem);
    }

    onNavButtonsClick(btn) {
        this.hide();
        if(btn.classList.contains(Tabset.TABSET_PREV_CLASS)) {
            this.prev();
        } else if(btn.classList.contains(Tabset.TABSET_NEXT_CLASS)) {
            this.next();
        }
        this.activateTabItem();
    }

    hide() {
        this.titles[this.currentTabIndex].classList.remove(Tabset.TABSET_ACTIVE_CLASS);
        this.contentItems[this.currentTabIndex].classList.remove(Tabset.TABSET_ACTIVE_CLASS);
    }

    activateTabItem() {
        this.titles[this.currentTabIndex].classList.add(Tabset.TABSET_ACTIVE_CLASS);
        this.contentItems[this.currentTabIndex].classList.add(Tabset.TABSET_ACTIVE_CLASS);
    }

    prev() {
        if(this.currentTabIndex > 0) {
            this.currentTabIndex--;
        } else {
            this.currentTabIndex = this.titles.length - 1;
        }
    }

    next() {
        if(this.currentTabIndex < this.titles.length - 1) {
            this.currentTabIndex++;
        } else {
            this.currentTabIndex = 0;
        }
    }
}