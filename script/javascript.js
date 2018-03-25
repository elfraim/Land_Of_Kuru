function capFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

function clearBox(elementID) {
    document.getElementById(elementID).innerHTML = "";
    document.getElementById(elementID).style.display = "none";
};

//hides html blocks
document.getElementById("createplayer").style.display = "none";
document.getElementById("mainvendorbox").style.display = "none";
document.getElementById("mainmonsterbox").style.display = "none";
document.getElementById("mainfightbox").style.display = "none";
document.getElementById("mainmedicbox").style.display = "none";
document.getElementById("mainbankbox").style.display = "none";
document.getElementById("mainquestbox").style.display = "none";
document.getElementById("currentquest").style.display = "none";
// checkes if player is defined, if not shows create a player block.
if (typeof player === 'undefined') {
    document.getElementById("leftmenu").style.display = "none";
    document.getElementById("createplayer").style.display = "block";
};

const homePage = () => {
    clearAllBoxes();
    document.getElementById("maininfobox").style.display = "block";
}

function createPlayer() {
    document.getElementById("createplayer").style.display = "none";
    playerName = document.getElementById("createplayer").elements[0].value;
    playerClass = document.getElementById("createplayer").elements[1].value;
    playerRace = document.getElementById("createplayer").elements[2].value;
    player = new Hero(playerName, 20, playerRace, playerClass);
    calculateClass(player, player.pClass);
    calculateRace(player, player.race);
    startingWeapon(player, player.pClass);
    createLeftMenu();
    document.getElementById("createplayer").style.display = "none";
    if(typeof player !== 'undefined'){
        document.getElementById("createplayer").style.display = "block";
    } else {
        alert("Something went wrong, please check your spelling")
        location.reload();
    }
};

function createLeftMenu() {
    // Name, Class, Race on left menu
    document.getElementById("playername").innerHTML = capFirstLetter(playerName + " |");
    document.getElementById("playerclass").innerHTML = capFirstLetter(playerClass + " |");
    document.getElementById("playerrace").innerHTML = capFirstLetter(playerRace);
    //Stats
    document.getElementById("hp").innerHTML = "Health: " + player.health + "/" + player.maxHealth;
    document.getElementById("exp").innerHTML = "Exp: " + player.xp + "/" + player.xpUp; 
    document.getElementById("gold").innerHTML = "Gold: " + player.gold;
    document.getElementById("bank").innerHTML = "Bank: " + player.bank;
    document.getElementById("mainhand").innerHTML = "Main Hand: " + player.mainHand.name;
    document.getElementById("level").innerHTML = "Level: " + player.level;
    document.getElementById("currentquest").innerHTML = "Current Quest: " + player.quest.name + ", " + player.questCounter + " Left!";
    /////
    document.getElementById("leftmenu").style.display = "block";
    document.getElementById("createplayerbox").style.display = "none";
};



function startWeaponStore(){
    clearAllBoxes();
    document.getElementById("mainvendorbox").innerHTML = "<h2> Weapon Vendor </h2>"
    document.getElementById("mainvendorbox").style.display = "block";
    for(let i = 0; i < weaponVendor.inStore.length; i++) { 
        weapon = weaponVendor.inStore[i];
        insertParagraph = document.createElement('p')
        insertParagraph.id = 'wep' + i;
        insertParagraph.innerHTML += "<p>" + weapon.name + " Price: " + weapon.price + "</p>"+"<br>";
        vendorBlock = document.getElementById('mainvendorbox');
        vendorBlock.appendChild(insertParagraph);

        document.getElementById("wep" + i).addEventListener("click", function(){
            if(player.gold >= weaponVendor.inStore[i].price) {
                player.gold -= weaponVendor.inStore[i].price;
                player.mainHand = weaponVendor.inStore[i]
                alert("You bought " + weaponVendor.inStore[i].name);
                createLeftMenu();
            } else {
                alert("You dont have enough gold!")
            };
        });
    };
};

function findAndFight(){
    fight();
};

function medic(){
    clearAllBoxes();
    document.getElementById("mainmedicbox").innerHTML += "<h2> Medic Tent </h2>"
    document.getElementById("mainmedicbox").style.display = "block";
    medicTextBox = document.getElementById("mainmedicbox");
    medicText = document.createElement("p");
        healOrNot = document.createElement("span");
        healOrNot.innerHTML = ("Heal me!")
        healOrNot.id = "heal";
        medicTextBox = document.getElementById("mainmedicbox");
        medicText = document.createElement("p");
        medicText.innerHTML += ("Quick! He's hurt! We can save you, But it'll cost you 50 Gold coins.")
        medicTextBox.appendChild(medicText);
        medicTextBox.appendChild(healOrNot);
        document.getElementById("heal").style.display = "block";
        document.getElementById("heal").addEventListener("click", function(){  
            if(player.gold >= 50){
                player.health = player.maxHealth;
                player.gold -= 50;
                clearBox("mainmedicbox");
                alert("We managed to save you! Thanks for the gold.")
                createLeftMenu();
            } else {
                alert("You need 50 Gold to heal up.")
            }
        });
};


function bank(){
    clearAllBoxes();
    document.getElementById("mainbankbox").innerHTML += "<h2><font color='yellow'>Bank</font></h2>"
    document.getElementById("mainbankbox").style.display = "block";
    bankTextBox = document.getElementById("mainbankbox");
    bankText = document.createElement("p");
    bankText.innerHTML += "Hello! Welcome to the bank, Deposit your gold so you dont lose it!";
    deposit = document.createElement("span");
    deposit.id = "deposit";
    deposit.innerHTML += "Deposit"
    withdraw = document.createElement("span");
    withdraw.id = "withdraw";
    withdraw.innerHTML = "Withdraw"
    bankTextBox.appendChild(bankText);
    bankTextBox.appendChild(deposit);
    bankTextBox.appendChild(withdraw);
    document.getElementById("deposit").addEventListener("click", function(){
        amount = Math.round(prompt("How much would you like to deposit?"));
        if(amount <= player.gold){
            player.bank += amount;
            player.gold -= amount;
            createLeftMenu();
        } else {
            alert("You don't hold that much gold !");
        };
    });
    document.getElementById("withdraw").addEventListener("click", function(){
        amount = Math.round(prompt("How much would you like to withdraw?"));
        if(amount <= player.bank){
            player.bank -= amount;
            player.gold += amount;
            createLeftMenu();
        } else {
            alert("You don't have that amount of gold.")
        };
    });
};

function quests() {
    clearAllBoxes();
    document.getElementById("mainquestbox").innerHTML = "<h2> Quest List </h2>";
    document.getElementById("mainquestbox").style.display = "block";
    for(let i = 0; i < questList.length; i++){
        quest = questList[i];
        insertParagraph = document.createElement("p");
        insertParagraph.id = "quest" + i;
        insertParagraph.innerHTML = "<p>" + quest.name + "</p>"
        questBox = document.getElementById("mainquestbox");
        questBox.appendChild(insertParagraph);
        document.getElementById("quest" + i). addEventListener("click", function(){
            questDetails = document.createElement("p");
            questDetails.innerHTML = "<h4>" + questList[i].quest + "</h4>"
            acceptOrNot = document.createElement("span");
            acceptOrNot.id = "accept"
            acceptOrNot.innerHTML = "Accept Quest";
            questDetails.setAttribute("class", "questdetails")
            questBox.appendChild(questDetails);
            questBox.appendChild(acceptOrNot);
            document.getElementById("accept").addEventListener("click", function(){
                alert(`You accepted the quest! Good luck! ${questList[i].quest}`)
                player.questCounter = questList[i].questCounter;
                player.quest = questList[i];
                document.getElementById("currentquest").style.display = "block";
                clearAllBoxes();
                createLeftMenu();
            });
        });
    };
}