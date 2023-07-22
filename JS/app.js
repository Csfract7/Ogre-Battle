console.log('Hello');

// Initializations DOM Variables

let attackBtn = document.querySelector('#attack-btn');
let defendBtn = document.querySelector('#defend-btn');
let powerAttackBtn = document.querySelector('#power-attack-btn');

// Game container
let gameContainer = document.querySelector('#game-container');

// Name Toggle
let nameToggle = document.querySelector('#name-toggle');
let nameA = document.querySelector('#name');
let newNameInput = document.querySelector('#newName');
let adventurerNameElem = document.querySelector('#adventurer-name');


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

// Win Message
let win = document.querySelector('#Win')

// Loss Message
let loss = document.querySelector('#Loss')

// Health Bars
const updateHealthBarOgre = (bar, health) => {
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
}
  const updateHealthBarAdventurer = (bar, health) => {
  const maxHealth = 1000; // Max health value for the ogre
  const healthPercentage = (health / maxHealth) * 100;
  bar.style.width = `${healthPercentage}%`;
    
  if (healthPercentage > 75) {
    bar.style.backgroundColor = 'green';
  } else if (healthPercentage > 30) {
    bar.style.backgroundColor = 'yellow';
  } else {
    bar.style.backgroundColor = 'red';
  }
}
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
    setTimeout(() => {
    ogre.takeDamage(damage);
  }, 2000);
  
  }

  defend() {
    console.log("I'm defending!");
    let damage = ogre.weapon.club - 2*ogre.weapon.club
    adventurer.takeDamage(damage)
  }

  takeDamage(damage) {
    this.health -= damage;
    if (this.health < 0) {
      this.health = 0;
    }
    if (this.health > 1000){
      this.health = 1000;
    }
    updateHealthBarAdventurer(healthBarAdventurer, this.health);
  }
}

// Prompt for the adventurer's name
const adventurerNameInput = adventurerNameElem.innerText
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
    let damage = this.weapon.club * 4;
    console.log(damage);
    setTimeout(() => {
    adventurer.takeDamage(damage);
  }, 2000);
  }

  takeDamage(damage) {
    this.health -= damage;
    if (this.health < 0) {
      this.health = 0;
    }
    updateHealthBarOgre(healthBarOgre, this.health);
  }
}


const gameLoop = setInterval(() => {
  game();
}, 500);


const ogre = new Ogre('Gronk');

//Global Functions

const checkWin = () => {
  adventurer.win = true;
  let winMsg = win
  if (adventurer.win) {
    clearInterval(gameLoop);
    winMsg.style.display = "block"
  }
  adventurer.health += 1000
  adventurer.win = false;
};

const checkLoss = () => {
  ogre.loss = true;
  let lossMsg = loss
  if (ogre.loss) {
    clearInterval(gameLoop);
    lossMsg.style.display = "block"  
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

instructionsToggle.addEventListener('click', () => {
  if (instructions.style.display === 'none') {
    instructions.style.display = 'block';
  } else {
    instructions.style.display = 'none';
  }
});

nameToggle.addEventListener('click', () => {
  if (nameA.style.display === 'none') {
    nameA.style.display = 'block';
  }
  else {
    nameA.style.display = 'none';
  }

  const adventurerNameInput = newNameInput.value.trim();
  if (adventurerNameInput !== '') {
    // Hide the name input and update the adventurer's name
    
    nameA.style.display = 'none';
    adventurerNameElem.innerText = adventurerNameInput;
    adventurer.name = adventurerNameInput;
  }
  game();
  
});




game(); // Start the game





























