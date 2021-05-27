class Mailer {
    constructor(url) {
        this.url = url;
        this.mailerData = [];
        this.starred = [];
        this.unStarred = [];
        this.sideBarContainer = document.getElementById('sidebar');
        this.previewContainer = document.getElementById('preview-container');
    }

    initMailer = () => {
        this.fetchMailer();
    }

    fetchMailer = () => {
        fetch(this.url)
        .then(res => res.json())
        .then(json => {
            this.mailerData = json;
            this.createMailerList();
        })
    }

    createMailerList = () => {       
        this.mailerData.forEach((data) => {
            const mailerCard = document.createElement('div');
            const card = `
                <div class="mailer-card" id="all-${data.id}" >
                    <h1 class="mailer-card-title">${data?.title}</h1>
                </div>
            `;
            mailerCard.innerHTML = card;
            this.sideBarContainer.append(mailerCard);

            document.getElementById(data.id).addEventListener("click",(event) => {
                // document.getElementById(data.id).style.cssText="background-color:#cccc"
                const previewCard = document.createElement('div');
                const description = `
                    <div class="description-container" id="description-conatiner-${data.id}">
                        <p>${data?.description}<p>
                    </div>
                `;
                previewCard.innerHTML = description;
        
                this.previewContainer.appendChild(previewCard);               
            })
        })
    }

    fetchStarred = () => {
        starred.forEach((data) => {
            const mailerCard = document.createElement('div');
            const card = `
                <div class="mailer-card" id="star-${data.id}" >
                    <h1 class="mailer-card-title">${data?.title}</h1>
                </div>
            `;
            mailerCard.innerHTML = card;
            this.sideBarContainer.append(mailerCard);

            document.getElementById(data.id).addEventListener("click",(event) => {
                document.getElementById(data.id).style.cssText="background-color:#cccc"
                const previewCard = document.createElement('div');
                const description = `
                    <div class="description-container" id="description-conatiner-${data.id}">
                        <p>${data?.description}<p>
                    </div>
                `;
                previewCard.innerHTML = description;
        
                this.previewContainer.appendChild(previewCard);               
            })

        })
    }
   
    fetchUnstarred = () => {
        
        unStarred.forEach((data) => {
            const mailerCard = document.createElement('div');
            const card = `
                <div class="mailer-card" id="unStar-${data.id}" >
                    <h1 class="mailer-card-title">${data?.title}</h1>
                </div>
            `;
            mailerCard.innerHTML = card;
            this.sideBarContainer.append(mailerCard);

            document.getElementById(data.id).addEventListener("click",(event) => {
                document.getElementById(data.id).style.cssText="background-color:#cccc"
                const previewCard = document.createElement('div');
                const description = `
                    <div class="description-container" id="description-conatiner-${data.id}">
                        <p>${data?.description}<p>
                    </div>
                `;
                previewCard.innerHTML = description;
        
                this.previewContainer.appendChild(previewCard);               
            })

        }) 
    }
}

const mailer = new Mailer('/data.json');
mailer.initMailer();
