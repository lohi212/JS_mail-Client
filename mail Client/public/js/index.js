class Mailer {
    constructor(url) {
        this.url = url;
        this.mailerData = [];
        this.starred = [];
        this.unStarred = [];
        this.headerCard = document.getElementById("header");
        this.sideBarList = document.getElementById('list');
        this.previewContainer = document.getElementById('preview-container');
    }

    initMailer = () => {
        this.fetchMailer();
        this.createHeader();
    }

    createHeader = () => {
        const navBar= document.createElement('div'); 
        const tab = `
            <p class="all" id="all">All</p>
            <p class="star" id="star">Star</p>
            <p class="unstar" id="unstar">Unstar</p>
        `;
        navBar.innerHTML = tab;
        this.headerCard.append(navBar); 

        navBar.addEventListener("click",(event) => {
            console.log(event.target.id);
            if(event.target.id === "star") {
                this.createStarList();
            } else if(event.target.id === "unstar") {
                this.createUnstarList();
            } else {
                this.createMailerList();
            }
        })
    }

    fetchMailer = () => {
        fetch(this.url)
        .then(res => res.json())
        .then(json => {
            this.mailerData = json;
            this.starred = json.filter(element =>  element.star === true); 
            this.unStarred = json.filter(element =>  element.star === false);

            this.createMailerList();
        })
    }

    createMailerList = () => { 
        const mailerList = document.createElement('div');      
        this.mailerData.forEach((data) => {
            const mailerCard = document.createElement('div');
            const card = `
                <div class="mailer-card" id="${data.id}" >
                    <h1 class="mailer-card-title">${data?.title}</h1>
                </div>
            `;
            mailerCard.innerHTML = card;
            mailerList.append(mailerCard);
        })
        this.sideBarList.addEventListener("click",(event) => {
            console.log(event.target.id)
            this.displayDescription(event.target.id);
        })
        this.sideBarList.innerHTML = mailerList.innerHTML;
    }

    createStarList = () => {
        const mailerList = document.createElement('div');      
        this.starred.forEach((data) => {
            const mailerCard = document.createElement('div');
            const card = `
                <div class="mailer-card" id="${data.id}" >
                    <h1 class="mailer-card-title">${data?.title}</h1>
                </div>
            `;
            mailerCard.innerHTML = card;
            mailerList.append(mailerCard);
        })
        this.sideBarList.innerHTML = mailerList.innerHTML;
    }
   
    createUnstarList = () => { 
        const mailerList = document.createElement('div');         
        this.unStarred.forEach((data) => {
            const mailerCard = document.createElement('div');
            const card = `
                <div class="mailer-card" id="${data.id}" >
                    <h1 class="mailer-card-title">${data?.title}</h1>
                </div>
            `;
            mailerCard.innerHTML = card;
            mailerList.append(mailerCard);
        })
        this.sideBarList.innerHTML = mailerList.innerHTML; 
    }

    displayDescription = (id) => {
        const previewCard =  document.createElement('div');
        const selectedMail = this.mailerData.filter(attr => attr.id === id);
        console.log(selectedMail)
        document.getElementById(id).style.cssText="background-color:#cccc"
        const descriptionCard = document.createElement('div');
        const description = `
            <div class="description-container" id="description-conatiner-${id}">
                <p>${selectedMail[0]?.description}<p>
            </div>
        `;
        descriptionCard.innerHTML = description;
        previewCard.append(descriptionCard);
        this.previewContainer.innerHTML = previewCard.innerHTML;        
    }
}

const mailer = new Mailer('/data.json');
mailer.initMailer();
