import { printLog } from '../helper/printLog';
import { newDiv, newP, newImg, newButton } from '../helper/htmlElementsMaker';
import profilePicture from '../../resource/images/pizza.png';

import phone from '../../resource/images/phone.svg';
import openExternal from '../../resource/images/open-in-new.svg';
import email from '../../resource/images/email-variant.svg';

import nature from '../../resource/images/nature.jpg';

const gitHubIconLink = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg';

const linkedInIconLink ="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linkedin/linkedin-plain.svg";

const twitterIconLink = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/twitter/twitter-original.svg";

function newWork(newScreenshot, newTitle, newDescription, newGitLink, newPreviewLink){
    const screenshot = newScreenshot;
    const title = newTitle;
    const description = newDescription;
    const gitLink = newGitLink;
    const previewLink = newPreviewLink;

    return {screenshot, title, description, gitLink, previewLink}
}

const workArray = [
    newWork(profilePicture, "BattleShip", "Classic battleship game made with Javascript, HTML, and CSS. It als contains unit testing using Jest.","aa","aa"),
    newWork(profilePicture, "To Do App", "A to do application with Javascript, HTML, and CSS.","aa","aa"),
    newWork(profilePicture, "Weather App", "Just a simple weather app to show the use of api.","aa","aa"),
    newWork(profilePicture, "Bouncy Blob", "A casual game made using Unity.","-","aa"),
    newWork(profilePicture, "None", "Will eventually think of more placeholder for now.","-","-"),
    newWork(profilePicture, "None", "Will eventually think of more placeholder for now.","-","-"),
]

export function homePageGenerator(){
    setupHeader();
    setupMainContent();
    setupFooter();
}

function setupHeader(){
    const header = document.getElementsByTagName('HEADER')[0];

    const headerContent = newDiv('headerContent');


    const profilePictureContainer = newDiv('profilePictureContainer');
    const profilePictureImage = newImg(profilePicture, '-', 'profilePicture');
    profilePictureContainer.appendChild(profilePictureImage);
    const profileName = newDiv('profileName');
    profileName.innerHTML = 'This Name'
    profilePictureContainer.appendChild(profileName);
    headerContent.appendChild(profilePictureContainer);

    const aboutContainer = newDiv('aboutMe');
    const aboutMeText = newP('About me', 'landMarkName');
    aboutContainer.appendChild(aboutMeText);
    const aboutMeDescription = newP('Software developer with experience releasing applications on the Play Store, App Store, Amazon Store, and Web platforms. Uses different programming languages such as C#, C++, Java, Javascript , HTML, CSS, and Objective C.', 'descriptionText');
    aboutContainer.appendChild(aboutMeDescription);
    const linkButtonsContainer = generateContactButtonLinks('aboutMeButtonLinks');
    
    aboutContainer.appendChild(linkButtonsContainer);
    headerContent.appendChild(aboutContainer);

    header.appendChild(headerContent);
    printLog('header done');
}

function generateContactButtonLinks(buttonClass){
    const linkButtonsContainer = newDiv(buttonClass);

    const newGitLink = document.createElement('a');
    newGitLink.className = 'contactLink';
    newGitLink.target = '_blank';
    newGitLink.href = 'aa';
          
    const gitIcon = newImg(gitHubIconLink);
    newGitLink.appendChild(gitIcon);
    linkButtonsContainer.appendChild(newGitLink);

    const newLinkedInLink = document.createElement('a');
    newLinkedInLink.className = 'contactLink';
    newLinkedInLink.target = '_blank';
    newLinkedInLink.href = 'aa';
    const linkedInIcon = newImg(linkedInIconLink);
    newLinkedInLink.appendChild(linkedInIcon);
    linkButtonsContainer.appendChild(newLinkedInLink);

    const newXLink = document.createElement('a');
    newXLink.className = 'contactLink';
    newXLink.target = '_blank';
    newXLink.href = 'aa';
    const xIcon = newImg(twitterIconLink);
    newXLink.appendChild(xIcon);
    linkButtonsContainer.appendChild(newXLink);

    return linkButtonsContainer;
}

function setupMainContent(){
    const main = document.getElementsByTagName('MAIN')[0];
    const myWorkText = newP('My work', 'landMarkName');
    main.appendChild(myWorkText);

    const workContainer = newDiv('workContainer');

    workArray.forEach(work => {
        var newWorkItem = generateWorkItem(work);
        workContainer.appendChild(newWorkItem);
    });

    main.appendChild(workContainer);
    printLog('main done');
}

function generateWorkItem(work){
    var workItem = newDiv('workItem');

    const workImage = newImg(work.screenshot, 'workImage');
    workItem.appendChild(workImage);

    const workHeader = newDiv('workHeader');
    const workTitle = newP(work.title, 'mainContentTitle');
    workHeader.appendChild(workTitle);

    const buttonContainer = generateMainContentButtons(work.gitLink, work.previewLink);
    workHeader.appendChild(buttonContainer);
    workItem.appendChild(workHeader);

    const workDescription = newP(work.description, 'workDescription');
    workItem.appendChild(workDescription);

    return workItem;
}

function generateMainContentButtons(gitLink, previewLink){
    const mainContentButtons = newDiv('mainContentButtons');

    if (gitLink != '-'){
        const newLink = document.createElement('a');
        newLink.target = '_blank';
        newLink.href = gitLink;
        const gitIcon = newImg(gitHubIconLink, 'workLinkImage');
        newLink.appendChild(gitIcon);
        mainContentButtons.appendChild(newLink);
    }

    if (previewLink != '-'){
        const newLink = document.createElement('a');
        newLink.target = '_blank';
        newLink.href = previewLink;
        const previewIcon = newImg(openExternal, 'workLinkImage');
        newLink.appendChild(previewIcon);
        mainContentButtons.appendChild(newLink);
    }

    return mainContentButtons;
}

function setupFooter(){
    const footer = document.getElementsByTagName('FOOTER')[0];

    const footerContent = newDiv('footerContent');

    const contactMe = newDiv('contactMe');
    const footerTitle = newP('Contact me', 'landMarkName', 'footerName');
    footer.appendChild(footerTitle);

    const footerDescription = newP('Please get in touch if you think our work could be mutually benficial.', 'descriptionText');
    contactMe.appendChild(footerTitle);

    const addressText = newP('address', 'descriptionText');
    contactMe.appendChild(addressText);

    const mobileDiv = newDiv('contactMethod');
    const phoneIcon = newImg(phone, 'contactIcon');
    mobileDiv.appendChild(phoneIcon);
    const mobileText = newP('(+63)9012345678', 'descriptionText');
    mobileDiv.appendChild(mobileText);
    contactMe.appendChild(mobileDiv);

    const emailDiv = newDiv('contactMethod');
    const emailIcon = newImg(email, 'contactIcon');
    emailDiv.appendChild(emailIcon);
    const emailText = newP('a@gmail.com', 'descriptionText');
    emailDiv.appendChild(emailText);
    contactMe.appendChild(emailDiv);

    const linkButtonsContainer = generateContactButtonLinks('contactsButtonLinks');
    
    contactMe.appendChild(linkButtonsContainer);

    footerContent.appendChild(contactMe);

    const footerImage = newImg(nature,'footerImage');
    footerContent.appendChild(footerImage);

    footer.appendChild(footerContent);
    printLog('footer done');
}