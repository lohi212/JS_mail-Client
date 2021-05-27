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
        // document.getElementById("star").addEventListener("click",this.createStarList());
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
       
        this.mailerData.forEach((data) => {
            const mailerCard = document.createElement('div');
            const card = `
                <div class="mailer-card" id="${data.id}" >
                    <h1 class="mailer-card-title">${data?.title}</h1>
                </div>
            `;
            mailerCard.innerHTML = card;
            this.sideBarList.append(mailerCard);

            // document.getElementById(data.id).addEventListener("click",(event) => {
            //     document.getElementById(data.id).style.cssText="background-color:#cccc"
            //     const previewCard = document.createElement('div');
            //     const description = `
            //         <div class="description-container" id="description-conatiner-${data.id}">
            //             <p>${data?.description}<p>
            //         </div>
            //     `;
            //     previewCard.innerHTML = description;
        
            //     this.previewContainer.append(previewCard);               
            // })
        })
    }

    createStarList = () => {
        this.starred.forEach((data) => {
            const mailerCard = document.createElement('div');
            const card = `
                <div class="mailer-card" id="star-${data.id}" >
                    <h1 class="mailer-card-title">${data?.title}</h1>
                </div>
            `;
            mailerCard.innerHTML = card;
            console.log(mailerCard)
            this.sideBarList.append(mailerCard);

            // document.getElementById(data.id).addEventListener("click",(event) => {
            //     document.getElementById(data.id).style.cssText="background-color:#cccc"
            //     const previewCard = document.createElement('div');
            //     const description = `
            //         <div class="description-container" id="description-conatiner-${data.id}">
            //             <p>${data?.description}<p>
            //         </div>
            //     `;
            //     previewCard.innerHTML = description;
        
            //     this.previewContainer.appendChild(previewCard);               
            // })

        })
    }
   
    createUnstarList = () => {
        
        unStarred.forEach((data) => {
            const mailerCard = document.createElement('div');
            const card = `
                <div class="mailer-card" id="unStar-${data.id}" >
                    <h1 class="mailer-card-title">${data?.title}</h1>
                </div>
            `;
            mailerCard.innerHTML = card;
            this.sideBarList.append(mailerCard);

            // document.getElementById(data.id).addEventListener("click",(event) => {
            //     document.getElementById(data.id).style.cssText="background-color:#cccc"
            //     const previewCard = document.createElement('div');
            //     const description = `
            //         <div class="description-container" id="description-conatiner-${data.id}">
            //             <p>${data?.description}<p>
            //         </div>
            //     `;
            //     previewCard.innerHTML = description;
        
            //     this.previewContainer.appendChild(previewCard);               
            // })

        }) 
    }
}

const mailer = new Mailer('/data.json');
mailer.initMailer();
