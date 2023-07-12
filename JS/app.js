console.log('Hello')

// Initializations DOM Variables

const instructionsToggle = document.querySelector('#instructions-toggle');
const instructions = document.querySelector('#instructions');
        
        

// Create variables instructionsToggle and instructions.
// Use querySelector to select the corresponding elements by their IDs.
// Create a Player Class:

// Define a class for the player character.
// Include properties such as health, damage, and attack methods.
// Implement necessary functions and methods for player actions.
// Create an Ogre Class:

// Define a class for the ogre enemy.
// Include properties such as health, damage, and attack methods.
// Implement necessary functions and methods for ogre actions.





// Get the elements

// Add event listener to toggle instructions

instructionsToggle.addEventListener('click', () => {
    if (instructions.style.display === 'none') {
      instructions.style.display = 'block';
    } else {
      instructions.style.display = 'none';
    }
})
