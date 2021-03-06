class BaseHero {
  constructor(name, health, race) {
    this.name = name;
    this.health = health;
    this.maxHealth = health;
    this.race = race;

    this.mainHand = {
      name: `None`,
      minDamage: null,
      maxDamage: null
    };
    this.mainArmor = {
      name: `None`,
      damageDefend: null
    };
  };
}

class Hero extends BaseHero {
  constructor(name, health, race, pClass, stats = {
    str: 0,
    agi: 0,
    int: 0,
    con: 0
  }) {
    stats = {
      str: 0,
      agi: 0,
      int: 0,
      con: 0
    };
    super(name, health, race);
    this.pClass = pClass;
    this.stats = stats;
    this.xp = 0;
    this.xpUp = 10;
    this.gold = 100;
    this.level = 1;
    this.bank = 50;
    this.questCounter = 0;
    this.quest = NaN;
  };
}

class Monster {
  constructor(name, health, minDamage, maxDamage, xp, gold) {
    this.name = name;
    this.health = health;
    this.maxHealth = health;
    this.minDamage = minDamage;
    this.maxDamage = maxDamage;
    this.xp = xp;
    this.gold = gold;
  };
};

class Store {
  constructor(name, discription) {
    this.name = name;
    this.discription = discription;

    this.inStore = {
      name: `None`,
      minDamage: null,
      maxDamage: null,
      price: null
    };
  }
}

class questNPC {
  constructor(name, quest, reward, questCounter, monsterObjective) {
    this.name = name;
    this.quest = quest;
    this.reward = reward;
    this.questCounter = questCounter;
    this.monsterObjective = monsterObjective;
  };
}

function clearAllBoxes() { // not used yet, will clear all boxes
  clearBox("mainmonsterbox");
  clearBox("mainvendorbox");
  clearBox("mainfightbox");
  clearBox("mainmedicbox");
  clearBox("mainbankbox");
  clearBox("mainquestbox");
  document.getElementById("maininfobox").style.display = "none";
}

const calculateClass = (player, characterClass) => {
  lowerCharacterClass = characterClass.toLowerCase();
  switch (lowerCharacterClass) {
    case `warrior`:
      player.stats.str += 3;
      player.stats.agi++;
      player.stats.con += 3
      break;
    case `ranger`:
      player.stats.str++;
      player.stats.agi += 3;
      player.stats.int++;
      player.stats.con += 2;
      break;
    case `druid`:
      player.stats.str++;
      player.stats.agi++;
      player.stats.int += 3;
      player.stats.con++;
      break;
    default:
      characterClass = prompt("Wrong class choice, Please chose one of the following(Warrior, Ranger, Druid");
      player.characterClass = characterClass;
      calculateClass(player, player.characterClass);
      break;
  };
}

const calculateRace = (player, race) => {
  lowerCharacterRace = race.toLowerCase();
  switch (lowerCharacterRace) {
    case `human`:
      break;
    case `dwarf`:
      player.stats.str++;
      player.stats.agi--;
      player.stats.int--;
      player.stats.con++;
      break;
    case `elf`:
      player.stats.int++;
      player.stats.agi++;
      player.stats.str--;
      break;
    case `gnome`:
      player.stats.int++;
      player.stats.agi--;
      player.stats.str--;
      player.stats.con += 2;
      break;
    default:
      characterRace = prompt("Wrong input! Please choose a race of the following (Human, Dwarf, Elf, Gnome)");
      player.race = characterRace;
      calculateRace(player, player.race);
      break;
  };

}

const startingWeapon = (player, playerClass) => {
  lowPlayerClass = playerClass.toLowerCase();
  if (lowPlayerClass === `warrior`) {
    player.mainHand = {
      name: `Bronze Sword(2-4)`,
      minDamage: 2,
      maxDamage: 4
    };
  } else if (lowPlayerClass === `ranger`) {
    player.mainHand = {
      name: `Short Bow(1-5)`,
      minDamage: 1,
      maxDamage: 5
    };
  } else if (lowPlayerClass === `druid`) {
    player.mainHand = {
      name: `Wodden Staff(2-5)`,
      minDamage: 2,
      maxDamage: 5
    };
  } else {
    characterClass = prompt("Wrong class choice, Please chose one of the following(Warrior, Ranger, Druid");
    player.characterClass = characterClass;
    startingWeapon(player, player.characterClass);
  };
};

class Weapon {
  constructor(name, minDamage, maxDamage, price) {
    this.name = name;
    this.minDamage = minDamage;
    this.maxDamage = maxDamage;
    this.price = price;
  }
}

const equipNewWeapon = (player, weapon) => {
  player.mainHand.name = weapon.name;
  player.mainHand.minDamage = weapon.minDamage;
  player.mainHand.maxDamage = weapon.maxDamage;
}

//Vendor
const weaponVendor = new Store("Weapon Store", "Get new weapons to get stronger!")

// weapon list
const ironSword = new Weapon("Iron Sword(4-8)", 4, 8, 100);
const steelSword = new Weapon("Steel Sword(8-12)", 8, 12, 300);
const mithrilSword = new Weapon("Mithril Sword(13-17)", 13, 17, 550);
const runeSword = new Weapon("Rune Sword(18-22)", 18, 22, 850);
const swordOfArcane = new Weapon("<font color=#4072D8>Sword of Arcane(23-30)</font>", 23, 30, 1500);
const swordOfShadow = new Weapon("<font color=#D20AFF>Sword of Shadow(30-40)</font>", 30, 40, 2500);
weaponVendor.inStore = [
  ironSword,
  steelSword,
  mithrilSword,
  runeSword,
  swordOfArcane,
  swordOfShadow
];

//monster list
const rat = new Monster("Rat(Lv1)", 15, 1, 3, 5, randomNum(25));
const spider = new Monster("Spider(Lv2)", 18, 2, 4, 13, randomNum(45));
const scorpion = new Monster("Scorpion(Lv3)", 22, 3, 6, 16, randomNum(65));
const blackScorpion = new Monster("BlackScorpion(Lv4)", 25, 4, 8, 20, randomNum(85));

const monsterList = [rat, spider, scorpion, blackScorpion];

//wild forest mobs
const owl = new Monster("Owl(Lv5)", 35, 8, 10, 30, randomNum(105));
const buck = new Monster("WildBuck(Lv6)", 40, 10, 14, 37, randomNum(125));
const bear = new Monster("Bear(Lv8)", 45, 12, 16, 42, randomNum(145));
const viper = new Monster("Viper(Lv9)", 50, 14, 18, 50, randomNum(165));
const urgot = new Monster("Urgot(Lv10BOSS)", 85, 10, 30, 100, randomNum(200));
const wildForestList = [owl, buck, bear, viper];
const spawnedMobs = []

// Quests
const killThreeRats = new questNPC("End the rats", "Rats are everywhere! Please eliminate 3 Rats. (200 Gold Reward)", 200, 5, rat.name);
const killFiveBlackScorpions = new questNPC("Stings so bad", "We've lost some good men and women to these awful Black Scorpions, Please help us and eliminate 8 of them! (450 Gold Reward)", 450, 8, blackScorpion.name);
const killSpiders = new questNPC("Web of trouble", "My wife is scared of spiders and they're everywhere now, Please kill 5 of them she can't sleep at night!", 300, 5, spider.name)
const killOwls = new questNPC("Terror at night", "I can't get any sleep! These owls are killing me! kill 6 owls and i'll reward you 500 gold", 500, 5, owl.name)
const firstBoss = new questNPC("Him", "I saw him I sweare I did! He's huge.. I .. I .. can't say anymore", 1000, 1, urgot.name)
questList = [killThreeRats, killSpiders, killFiveBlackScorpions, killOwls, firstBoss];

function randomNum(num) {
  output = Math.floor(Math.random() * num - 1);
  return output;
}

//Generates random monster & amount of monsters
function randomMonster() {
  randomMob = Math.floor(Math.random() * 100);
  if (player.level <= 4) {
    if (randomMob >= 75) {
      for (let i = 0; i < monsterList.length; i++) {
        const monster = monsterList[Math.floor(Math.random() * monsterList.length)];
        spawnedMobs.push(monster);
      };
    } else if (randomMob < 75 && randomMob > 45) {
      for (let i = 1; i < monsterList.length; i++) {
        const monster = monsterList[Math.floor(Math.random() * monsterList.length)];
        spawnedMobs.push(monster);
      };
    } else {
      for (let i = 2; i < monsterList.length; i++) {
        const monster = monsterList[Math.floor(Math.random() * monsterList.length)];
        spawnedMobs.push(monster);
      };
    };
  } else if (player.level > 4 && player.level <= 10) { // wild forest

    if (randomMob >= 75) {
      for (let i = 0; i < wildForestList.length; i++) {
        const monster = wildForestList[Math.floor(Math.random() * monsterList.length)];
        spawnedMobs.push(monster);
      };
    } else if (randomMob < 75 && randomMob > 45) {
      for (let i = 1; i < wildForestList.length; i++) {
        const monster = wildForestList[Math.floor(Math.random() * monsterList.length)];
        spawnedMobs.push(monster);
      };
    } else {
      for (let i = 2; i < wildForestList.length; i++) {
        const monster = wildForestList[Math.floor(Math.random() * monsterList.length)];
        spawnedMobs.push(monster);
      };
    };
  }
  if (player.level > 4 && questList.includes(firstBoss)) {
    if (randomMob <= 7) { // low chance of spawning Urgot
      const monster = urgot
      spawnedMobs.push(monster);
    };
  }
};

//Damage calculator, Returns damage after calculating the players stats.
function calculateDamage(minDamage, maxDamage) {
  if (player.pClass === "warrior") {
    calculatedMinDamage = (minDamage + player.stats.str + player.stats.agi) / 2.5;
    calculatedMaxDamage = (maxDamage + player.stats.str + player.stats.agi) / 2.5;
  } else if (player.pClass === "ranger") {
    calculatedMinDamage = (minDamage + player.stats.agi + player.stats.str) / 2.5;
    calculatedMaxDamage = (maxDamage + player.stats.agi + player.stats.str) / 2.3;
  } else if (player.pClass === "druid") {
    calculatedMinDamage = (minDamage + player.stats.int + player.stats.agi) / 2.5;
    calculatedMaxDamage = (maxDamage + player.stats.int + player.stats.agi) / 2.4;
  }
  outPut = Math.floor(Math.random() * Math.floor(calculatedMaxDamage) + calculatedMinDamage - 1);
  return outPut;
};

function calculateEnemyDamage(minDamage, maxDamage) {
  outPut = Math.floor(Math.random() * Math.floor(maxDamage) + minDamage - 1);
  return outPut;
};

//Leveling up Function
function levelUp() {
  if (player.pClass === "warrior") {
    player.stats.con++;
    player.stats.str += 2;
    player.stats.agi++;
    player.maxHealth += Math.round(player.stats.con + player.level * 0.4);
  } else if (player.pClass === "ranger") {
    player.stats.con++;
    player.stats.str++;
    player.stats.agi += 2;
    player.maxHealth += Math.round(player.stats.con + player.level * 0.3);
  } else if (player.pClass === "druid") {
    player.stats.con++;
    player.stats.agi++;
    player.stats.int += 2;
    player.stats.str++;
    player.maxHealth += Math.round(player.stats.con + player.level * 0.2);
  };
  player.health = player.maxHealth;
  player.level += 1;
  player.xp = 0;
  player.xpUp *= Math.round(1.8);
};

//Fight function



//till WIP, changed fighting to Turn Based.
function newFight() {
  createLeftMenu();
  clearAllBoxes();
  spawnedMobs.length = 0;
  $('#mainmonsterbox').html("");
  $("#mainmonsterbox").html("<h2> Monsters around you </h2>");
  document.getElementById("mainmonsterbox").style.display = "block";
  randomMonster();
  for (let i = 0; i < spawnedMobs.length; i++) { // Mob selector
    monster = spawnedMobs[i];
    $("#mainmonsterbox").append('<p id=mob' + i + '>' + monster.name + '</p>');
    $('#mob' + i).on("click", function() {
      monster = spawnedMobs[i]
      $("#mainfightbox").html("");
      clearAllBoxes();
      $("#fightpage").show();
      $("#mainfightbox").show();
      showButtons();
      document.getElementById("mainfightbox").style.display = 'block';
      $("#mainfightoption").show();
      $('#mainfightbox').prepend(`<img id="mobimg" src='./pics/${monster.name}.jpg' />`)
      $("#mainfightbox").append("<h4 id='tableheadere'>" + monster.name + "</h4>");
      // Attack Button
      $("#attackbtn").on("click", function(){
        hideButtons();
        $("#mainfightbox").html("");
	      $("#mainfightbox").append("<h5 id='tableheaderp'>You</h6>");
        $("#mainfightbox").append("<h5 id='tableheadere'>" + monster.name + "</h5>");
        
        // checkes if player dead before fight start
        if (player.health <= 0 && monster.health > 0) { 
          monster.health = monster.maxHealth;
          fightBox = document.getElementById("mainfightbox");
          $("#mainfightbox").html("<br /> <h3>You are DEAD!</h3>");
          createLeftMenu();
        } else if (player.health > 0) {
          //starts fight while player health is over 0 and mob too
          while (player.health > 0 && monster.health > 0) {
            //Fighting table
            var x = document.createElement("TABLE");
            x.setAttribute("id", "myTable");
            let mainfightbox = document.getElementById("mainfightbox");
            mainfightbox.appendChild(x);
            var table = document.getElementById("myTable");
            var row = table.insertRow(0);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            playerDamageNumber = calculateDamage(player.mainHand.minDamage, player.mainHand.maxDamage);
            monster.health -= playerDamageNumber;
            cell1.innerHTML = `You hit ${monster.name} for <font color="red">${playerDamageNumber}</font> Damage! <br>`;
            // checks if mob is dead
            if (player.health > 0 && monster.health <= 0) { 
              monster.health = monster.maxHealth;
              player.xp += monster.xp;
              player.gold += monster.gold;
              text = document.createElement('h4')
              $("#mainfightbox").append(`You have won! You gained <font color="#98B0FD">${monster.xp} exp</font> and <font color="#FFFB0A">${monster.gold} gold</font>.`);
              createLeftMenu();
              if (player.xp >= player.xpUp) {
                $("#mainfightbox").append("<br /> You have gained a level!")
                levelUp();
                createLeftMenu();
              };
              if (monster.name === player.quest.monsterObjective) {
                player.questCounter -= 1;
                createLeftMenu();
                questParagraph = document.createElement("p");
                $("#mainfightbox").append(`-=!Quest!=- ${player.questCounter} ${player.quest.monsterObjective}s remain!`);
                if (player.questCounter === 0) {
                  arrayOfQuest = questList.indexOf(player.quest); // Select's the quests index
                  questList.splice(arrayOfQuest, 1); // removes the quest
                  player.gold += player.quest.reward; // reward to player
                  alert(`You finished the quest! You have been rewarded with ${player.quest.reward} Gold`);
                  player.quest = NaN; // resets current quest
                  player.questCounter = 0; // resets quest counter\
                  createLeftMenu();
                  document.getElementById("currentquest").style.display = "none";
                };
              };
            } else { 
            enemyDamageNumber = calculateEnemyDamage(monster.minDamage, monster.maxDamage);
            player.health -= enemyDamageNumber;
            cell2.innerHTML = `${monster.name} hit you for <font color="red">${enemyDamageNumber}</font> Damage! <br>`;
              if (player.health <= 0 && monster.health > 0) { // if player dead
                $("#hp").css("color", "red");
                let lostGold = Math.floor(Math.random() * player.gold)
                player.gold -= lostGold;
                $("#mainfightbox").append("You have lost the fight and <font color='red'>died!</font> ");
                $("#mainfightbox").append(`Sadly you lost ${lostGold} gold for losing the fight <br> You can depsoit your gold to keep it safe!`);
                monster.health = monster.maxHealth;
                player.health = 0;
                createLeftMenu();
                break;
              } else {
                continue;
              };
            }
            break;
          };
        };
      });
    });
  };
};
