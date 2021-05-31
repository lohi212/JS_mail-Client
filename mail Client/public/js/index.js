class Mailer {
    constructor(url) {
        this.url = url;
        this.mailerData = [];
        this.starred = [];
        this.unStarred = [];
        this.headerCard = document.getElementById("header");
        this.sideBarList = document.getElementById('list');
        this.previewContainer = document.getElementById('preview-container');
        this.tabOptions = [
            {
                name:'all',
                label:'All'
            },
            {
                name:'star',
                label:'Star'
            },
            {
                name:'unstar',
                label:'Unstar'
            }
        ];
    }

    initMailer = () => {
        this.fetchMailer();
        this.createHeader();
    }

    createHeader = () => {
        const navBar= document.createElement('div');
        let tab="";
        this.tabOptions.forEach(e => {
            tab += `<p class="${e.name}" id="${e.name}">${e.label}</p>`
        }) 
    
        navBar.innerHTML = tab;
        this.headerCard.append(navBar); 

        navBar.addEventListener("click",(event) => {
            const newArr = this.mailerData.map(e => {
                const obj = JSON.parse(localStorage.getItem(e?.id));
                return obj
            })
            this.mailerData = newArr;
            if(event.target.id === "star") {
                this.starred = this.mailerData.filter(element =>  element.star === true); 
                this.createMailerList('star');
            } else if(event.target.id === "unstar") {
                this.unStarred = this.mailerData.filter(element =>  element.star === false);
                this.createMailerList('unstar');
            } else {
                this.createMailerList('all');
            }
        })
    }

    fetchMailer = () => {
        fetch(this.url)
        .then(res => res.json())
        .then(json => {
            this.mailerData = json;
            this.createMailerList('all');
            json.forEach(e => {
                localStorage.setItem(e?.id,JSON.stringify(e))
            })
        })
    }

    createMailerList = (type) => { 
        
        let newArr ;
        if(type === 'star') {
            newArr = this.starred; 
        } else if(type === 'unstar') {
            newArr = this.unStarred;
        } else {
            newArr = this.mailerData
        }

        const mailerList = document.createElement('div');      
        newArr.forEach((data) => {
            const mailerCard = document.createElement('div');
            const card = `
                <div class="mailer-card" id="${data?.id}" data-mail-description="${data?.description}" data-mail-status="${data?.star}">
                    <h1 class="mailer-card-title">${data?.title}</h1>
                </div>
            `;
            mailerCard.innerHTML = card;
            mailerList.append(mailerCard);
        })
        this.sideBarList.addEventListener("click",(event) => {
            this.displayDescription(event.target);
            event.stopPropagation();
        })
        this.sideBarList.innerHTML = mailerList.innerHTML;
    }

    displayDescription = (target) => {
        const previewCard =  document.createElement('div');       
        const starred = this.starStatus(`${target?.dataset.mailStatus}`);        
        target.classList.add('selected-mail');
        
        const button = document.createElement("Button");
        button.setAttribute("id","button-status");
        button.innerHTML = starred;
        button.classList.add('button-status');

        const descriptionCard = document.createElement('div');
        const description = `
            <div class="description-container" id="description-conatiner-${target?.id}">
                <p>${target?.dataset.mailDescription}<p>
            </div>
        `;
        descriptionCard.innerHTML = description;
        previewCard.append(button)
        previewCard.append(descriptionCard);
        this.previewContainer.innerHTML = previewCard.innerHTML;
        
        document.getElementById("button-status").addEventListener("click",(event) => {
            const starredMail = JSON.parse(localStorage.getItem(target?.id));
            let newObj = {...starredMail};
            newObj.star = !starredMail.star;
            localStorage.setItem(target?.id,JSON.stringify(newObj))
            if(starred === "star") {
                button.innerHTML = "Unstar";
            } else {
                button.innerHTML = "Star"
            }
            
        })
    }

    starStatus = (flag) => {
        if(flag === "true") {
            return "star";
        } else {
            return "Unstar"
        }
    }
}

const mailer = new Mailer('/data.json');
mailer.initMailer();
