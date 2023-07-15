console.log('Hello');

// Initializations DOM Variables

let attackBtn = document.querySelector('#attack-btn');
let defendBtn = document.querySelector('#defend-btn');
let powerAttackBtn = document.querySelector('#power-attack-btn');

// Game container
let gameContainer = document.querySelector('#game-container');
// Instructions
let instructionsToggle = document.querySelector('#instructions-toggle');
let instructions = document.querySelector('#instructions');
// Game area
let gameArea = document.querySelector('#game-area');
// Health Bars
let healthBarAdventurer = document.querySelector('#player-health');
let healthBarOgre = document.querySelector('#ogre-health');
// Adventurer Name
let adventurerName = document.querySelector('#adventurer-name');

// Health Bars
const updateHealthBar = (bar, health) => {
  const maxHealth = 3000; // Max health value for the ogre
  const healthPercentage = (health / maxHealth) * 100;
  bar.style.width = `${healthPercentage}%`;

  if (healthPercentage > 75) {
    bar.style.backgroundColor = 'green';
  } else if (healthPercentage > 30) {
    bar.style.backgroundColor = 'yellow';
  } else {
    bar.style.backgroundColor = 'red';
  }
};

// Create variables instructionsToggle and instructions.
// Use querySelector to select the corresponding elements by their IDs.
// Create a Player Class:

// Define a class for the player character.
class Adventurer {
  constructor(name, health = 1000) {
    this.name = name;
    this.health = health; // max 1000
    this.loss = false;
    this.weapon = {
      sword: 20,
    };
  }

  decision(choice) {
    if (choice === 'Attack') {
      return this.attack();
    }
    if (choice === 'Power Attack') {
      return this.powerAttack();
    }
    if (choice === 'Defend') {
      return this.defend();
    }
  }

  attack() {
    console.log('I hit you!');
    let damage = this.weapon.sword;
    console.log(damage);
    ogre.takeDamage(damage);
  }

  powerAttack() {
    console.log('I hit you REALLY HARD!');
    let damage = this.weapon.sword * 3;
    console.log(damage);
    ogre.takeDamage(damage);
  }

  defend() {
    console.log("I'm defending!");
    let damage = ogre.weapon.club - ogre.weapon.club;
    ogre.takeDamage(damage);
  }

  takeDamage(damage) {
    this.health -= damage;
    if (this.health < 0) {
      this.health = 0;
    }
    updateHealthBar(healthBarAdventurer, this.health);
  }
}

// Prompt for the adventurer's name
const adventurerNameInput = prompt('Enter the adventurer name:');
const adventurer = new Adventurer(adventurerNameInput);

// Create an Ogre Class:
class Ogre {
  constructor(name, health = 3000) {
    this.name = name;
    this.health = health; // max 1000
    this.win = false;
    this.weapon = {
      club: 40,
    };
  }

  decision() {
    let choice = Math.random();
    if (choice < 0.7) {
      return this.attack();
    } else {
      return this.powerAttack();
    }
  }

  attack() {
    console.log('I hit you!');
    let damage = this.weapon.club;
    console.log(damage);
    adventurer.takeDamage(damage);
  }

  powerAttack() {
    console.log('I hit you REALLY HARD!');
    let damage = this.weapon.club * 3;
    console.log(damage);
    adventurer.takeDamage(damage);
  }

  takeDamage(damage) {
    this.health -= damage;
    if (this.health < 0) {
      this.health = 0;
    }
    updateHealthBar(healthBarOgre, this.health);
  }
}

const gameLoop = setInterval(() => {
  game();
}, 1000); 

const ogre = new Ogre('Gronk');

// Add event listener to toggle instructions

instructionsToggle.addEventListener('click', () => {
  if (instructions.style.display === 'none') {
    instructions.style.display = 'block';
  } else {
    instructions.style.display = 'none';
  }
});

//Global Functions

const checkWin = () => {
  adventurer.win = true;
  if (adventurer.win) {
    clearInterval(gameLoop);
    alert('Congratulations, You have slain the Ogre!');
  }
  adventurer.win = false;
};

const checkLoss = () => {
  ogre.loss = true;
  if (ogre.loss) {
    clearInterval(gameLoop);
    alert('You have been slain by the Ogre!');
  }
  ogre.loss = false;
};

const game = () => {
  if (adventurer.health <= 0) {
    checkLoss();
    return;
  } else if (ogre.health <= 0) {
    checkWin();
    return;
  }

  playersTurn();
  setTimeout(() => {
    ogresTurn();
  }, 1000); // Introduce a 1-second delay before the Ogre's turn
};

const playersTurn = () => {
  adventurer.decision();
};

const ogresTurn = () => {
  ogre.decision();
};

// Buttons

attackBtn.addEventListener('click', () => {
  adventurer.decision('Attack');
});
defendBtn.addEventListener('click', () => {
  adventurer.decision('Defend');
});
powerAttackBtn.addEventListener('click', () => {
  adventurer.decision('Power Attack');
});

// Set adventurer's name in the HTML
adventurerName.innerText = adventurer.name;

game(); // Start the game























