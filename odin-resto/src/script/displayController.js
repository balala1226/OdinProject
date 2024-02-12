import '../style/style.css'
import { homePage } from './pages/homePage.js';
import { aboutPage } from './pages/aboutPage.js';
import { menuPage } from './pages/menuPage.js';
import { printLog, printError } from './helper/printLog.js';

export class displayController{
    constructor() {
        this.contentContainer = document.getElementById('contentContainer');

        this.homeButton = document.getElementById('homeButton');
        this.menuButton = document.getElementById('menuButton');
        this.aboutButton = document.getElementById('aboutButton');

        this.homePage = new homePage();
        this.menuPage = new menuPage();
        this.aboutPage = new aboutPage();

        this.currentTab = 0;

        this.homeButton.addEventListener("click", () => {
            this.changeDisplay(0);
        });
        
        this.menuButton.addEventListener("click", () => {
            this.changeDisplay(1);
        });
        
        this.aboutButton.addEventListener("click", () => {
            this.changeDisplay(2);
        });

        while (this.contentContainer.hasChildNodes()) {
            this.contentContainer.removeChild(this.contentContainer.firstChild);
        }

        this.homeButton.style.backgroundColor = "red";
        this.contentContainer.appendChild(this.homePage.getPage());
        printLog("Display Init Success");
    }

    changeDisplay(index){
        if (this.currentTab == index)
        {
            return;
        }

        while (this.contentContainer.hasChildNodes()) {
            this.contentContainer.removeChild(this.contentContainer.firstChild);
        }

        switch (this.currentTab)
        {
            case 0:
                this.homeButton.style.backgroundColor = "lightcoral";
                break;
            case 1:
                this.menuButton.style.backgroundColor = "lightcoral";
                break;
            case 2:
                this.aboutButton.style.backgroundColor = "lightcoral";
                break;
        }

        switch (index)
        {
            case 0:
                this.homeButton.style.backgroundColor = "red";
                this.contentContainer.appendChild(this.homePage.getPage());
                break;
            case 1:
                this.menuButton.style.backgroundColor = "red";
                this.contentContainer.appendChild(this.menuPage.getPage());
                break;
            case 2:
                this.aboutButton.style.backgroundColor = "red";
                this.contentContainer.appendChild(this.aboutPage.getPage());
                break;
        }

        this.currentTab = index;
    }
}