const inquirer = require('inquirer');
const Enemy = require('./Enemy');
const Player = require('./Player');

function Game() {
    this.roundNumber = 0;
    this.isPlayerTurn = false;
    this.enemies = [];
    this.enemies.push(new Enemy('goblin', 'sword'));
    this.enemies.push(new Enemy('orc', 'baseball bat'));
    this.enemies.push(new Enemy('skeleton', 'axe'));
    this.currentEnemy;
    this.player;
}

module.exports = Game;

Game.prototype.initializeGame = function () {
    this.currentEnemy = this.enemies[0];

    inquirer
        .prompt({
            type: 'text',
            name: 'name',
            message: 'What is your name?'
        })
        // destructure name form the prompt object
        .then(({ name }) => {
            this.player = new Player(name);

            // this method will be called anytime a new round starts
            // want this method to choose who's taking their turn first based on agility, display Player stats,
            // and display description of current enemy
            this.startNewBattle()
        });
};

// want this method to choose who's taking their turn first based on agility, display Player stats,
// and display description of current enemy
Game.prototype.startNewBattle = function () {
    if (this.player.agility > this.currentEnemy.agility) {
        this.isPlayerTurn = true;
    } else {
        this.isPlayerTurn = false;
    }

    console.log('Your stats are as follows:');
    console.table(this.player.getStats());
    console.log(this.currentEnemy.getDescription());

    this.battle();
};

Game.prototype.battle = function () {
    if (this.isPlayerTurn) {
        if (this.isPlayerTurn) {
            inquirer
                .prompt({
                    type: 'list',
                    message: 'What would you like to do?',
                    name: 'action',
                    choices: ['Attack', 'Use potion']
                })
                .then(({ action }) => {
                    if (action === 'Use potion') {
                        if (!this.player.getInventory()) {
                            console.log("You don't have any potions!");
                            return;
                        }

                        inquirer
                            .prompt({
                                type:'list',
                                message: 'Which potion would you like to use?',
                                name: 'action',
                                choices: this.player.getInventory().map((item, index) => `${index + 1}: ${item.name}`)
                            })
                            .then(({ action }) => {
                                const potionDetails = action.split(': ');

                                this.player.usePotion(potionDetails[0] - 1);
                                console.log(`You used a ${potionDetails[1]} potion.`);
                            });
                    } else {
                        const damage = this.player.getAttackValue();
                        this.currentEnemy.reduceHealth(damage);

                        console.log(`You attacked the ${this.currentEnemy.name}`);
                        console.log(this.currentEnemy.getHealth());
                    }
                }
            );
        }
    } else {
        const damage = this.currentEnemy.getAttackValue();
        this.player.reduceHealth(damage);

        console.log(`You were attack by the ${this.currentEnemy.name}`);
        console.log(this.player.getHealth());
    }
};