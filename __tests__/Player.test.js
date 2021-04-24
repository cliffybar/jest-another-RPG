const Potion  = require('../lib/Potion');
jest.mock('../lib/Potion');
console.log(new Potion());

const Player = require('../lib/Player');

test('creates a player object', () => {

    // when we run npm run test Player, it'll create 4 properties: player name, and the 3 player values
    const player = new Player('Dave');
  
    expect(player.name).toBe('Dave');
    expect(player.health).toEqual(expect.any(Number));
    expect(player.strength).toEqual(expect.any(Number));
    expect(player.agility).toEqual(expect.any(Number));
  });