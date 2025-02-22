//draggble carousel
const container = document.querySelector('.mouse-dragging');
const carousel = container.querySelector('sl-carousel');

carousel.toggleAttribute('mouse-dragging', true);

//drawer controls
const drawer = document.querySelector('.drawer-placement-start');
const openButton = document.querySelector('.drawer .transparent-button');
const closeButton = drawer.querySelector('sl-button[variant="default"]');

openButton.addEventListener('click', () => drawer.show());
closeButton.addEventListener('click', () => drawer.hide());

const links = drawer.querySelectorAll('a.menu');
links.forEach(link => {
    link.addEventListener('click', () => drawer.hide());
});

//carousel text
const texts = ["The interface of the main menu gives the player 4 options: start a new game, continue playing from the last save, go to settings and exit the game. In settings, there are options to change music and sound effects volume, which allow for adjusting the sound environment to individual liking.",
    "The fighting system includes 3 types of weapons with different mechanics: 1) Magical projectile - ranged attack, that deals medium damage to a single target. It has a small cooldown, so can be used often in fights. 2) Meteor - powerful ability with long cooldown, that deals massive AOE damage. The player can select an attack area with his mouse, which adds tactical flexibility. 3) Sword - melee weapon, which deals damage in a short radius in front of the player. It has a delay between attacks, but it can damage multiple enemies at once.",
    "The dialogue system grants players the ability to interact with NPCs to accept quests and get rewards. UI supports such functions as automatic dialogue progression and skipping, which allows players with different playstyles to enjoy the game more. Dialogues have a very simple structure: a textbox and the name of the currently talking NPC.",
    "The player's inventory allows to look through all available items and equipment. Currently used items are highlighted, while unused items are grayed out. Inventory UI includes abilities to equip armour, change weapons and check player's stats. There is also a separate section that allows for choosing a companion, which gives some specific bonus to the player's stats.",
    "Shop UI gives the ability to buy and sell items. Each item has its name, description and price. A convenient bulk selection system allows the player to quickly manage his inventory."];
const carouselText = document.querySelector('.item-caption');
carouselText.textContent = texts[0];
carouselText.classList.add('active');

carousel.addEventListener('sl-slide-change', event => {
    carouselText.classList.remove('active');

    const indexAcive = event.detail.index;
    setTimeout(() => {
        void carouselText.offsetHeight;

        carouselText.textContent = texts[indexAcive];
        carouselText.classList.add('active');
    }, 500);
});

//details control
const containerDetails = document.querySelector('.dev-list');

containerDetails.addEventListener('sl-show', event => {
    if (event.target.localName === 'sl-details') {
        [...containerDetails.querySelectorAll('sl-details')].map(details => (details.open = event.target === details));
    }
});

//registration controls
const dialog = document.querySelector('.dialog-focus');
const openButtonRegWin = document.querySelector('.equal-buttons .darkblue');
const openButtonRegLin = document.querySelector('.equal-buttons .darkgreen');
const closeButtonReg = dialog.querySelector('sl-button[slot="footer"]');
const form = document.getElementById('formReg');
const inputs = form.querySelectorAll('sl-input');
const textInput = form.querySelector('sl-textarea');

//congrats dialog
const dialogCong = document.querySelector('.dialog-overview');
const closeButtonCong = dialogCong.querySelector('sl-button[slot="footer"]');

//registration validation
openButtonRegWin.addEventListener('click', () => dialog.show());
openButtonRegLin.addEventListener('click', () => dialog.show());
(async () => {
    await Promise.all([
        customElements.whenDefined('sl-button'),
        customElements.whenDefined('sl-input'),
        customElements.whenDefined('sl-textarea')
    ]).then(() => {
        form.addEventListener('submit', event => {
            event.preventDefault();
            const formData = new FormData(form);
            console.log(Object.fromEntries(formData.entries()));
            dialog.hide();
            form.reset();
            dialogCong.show();
        });

        inputs.forEach(input => {
            if (input.name === 'Username') {
                input.addEventListener('sl-input', () => {
                    if (input.value.trim().length > 15) {
                        console.log(input.value.trim().length);
                        input.setCustomValidity('Username should be less than 16 symbols long.');
                    } else {
                        input.setCustomValidity('');
                    }
                });
            }

            if (input.name === 'Email') {
                input.addEventListener('sl-input', () => {
                    if (!input.value.includes('@gmail.com')) {
                        input.setCustomValidity('We accept only @gmail.com.');
                    } else {
                        input.setCustomValidity('');
                    }
                });
            }

            if (input.name === 'BDay') {
                input.addEventListener('sl-input', () => {
                    const userDate = new Date(input.value);
                    const today = new Date();
                    const validMinDate = new Date().setFullYear(today.getFullYear() - 18);
                    const validMaxDate = new Date().setFullYear(today.getFullYear() - 100);

                    if (userDate >= validMinDate) {
                        input.setCustomValidity('You must be at least 18 years old.');
                    } else if (userDate < validMaxDate) {
                        input.setCustomValidity('How can you be this old?');
                    } else {
                        input.setCustomValidity('');
                    }
                });
            }

            if (input.name === 'Country') {
                input.addEventListener('sl-input', () => {
                    if (input.value.trim().length > 28) {
                        input.setCustomValidity('-_-');
                    } else if (input.value.trim().toLowerCase() === 'russia') {
                        input.setCustomValidity('🐷🔥');
                    } else if (input.value.trim().toLowerCase() === 'belarus') {
                        input.setCustomValidity('Жыве Беларусь!');
                    } else {
                        input.setCustomValidity('');
                    }
                });
            }
        });

        textInput.addEventListener('sl-input', () => {
            const pattern = /^[A-Za-z0-9._: ]+$/;
            if (textInput.value.trim().length > 100) {
                textInput.setCustomValidity('Up to 100 symbols max.');
            }
            else if (!pattern.test(textInput.value)) {
                textInput.setCustomValidity('Only latin letters, numbers and "./: " are permitted.');
            }
            else {
                textInput.setCustomValidity('');
            }
        });
    });
})();

//cong
closeButtonCong.addEventListener('click', () => dialogCong.hide());