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
const texts = ["Interface of the main menu gives the player 4 options: start a new game, continue playing from the last save, go to settings and exit the game. In settings there are options to change music and sound effects volume, that allow for changing sound environment to individual liking",
    "Fighting system includes 3 types of wepons with different mechanics: 1) Magical projectile - ranged attack, that deals medium damage to a single target. It has a small cooldown, so it can be used often in fight.\n2) Meteor - powerfull ability with long cooldown, that deals massive AOE damage. Player can select attack area with his mouse, which adds tactical flexibility.\n3) Sword - melee weapon, which deals damage in short radius in front of the player. It has a delay between attacks, but it can damage multiple enemies at once",
    "Dialog system grants player the ability to interact with NPCs for accepting quests and getting rewards. UI supports such functions as automatic dialog progression and skipping, which allows players with different playstyles to enjoy the game more. Dialogs have very simple structure: a textbox and the name of currently talking NPC",
    "Player's inventory allows to look through all available items and equipment. Currently used items are highlighted, while unused items are grayed out. Inventory UI includes abilities to equip armor, change weapons and check player's stats. There is also a separate section that allows for choosing a companion, which gives some specific bonus to player's stats",
    "Shop UI gives an ability to buy and sell items. Each item has its own name, description and price. Convinient bulk selection system allows the player to quickly manage his inventory"];
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