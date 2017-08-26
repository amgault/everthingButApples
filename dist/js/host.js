/*===============================================================
    #SRM host functions
===============================================================*/
hostGlobalVar = {
    deckArray: [],
    playersArray: [],
    playersNum: 5,
    roundsNum: 2,
    redCardsArray: [],
    greenCardsArray: [],
    playerDecks: []

};


// #SRM need to delete this part and make the server actualy work

//1.) Host presses button to create room
//2.) Enters room ID (and told that a game must have 5 players, and will last 2 rounds)
//3.) Assigned a socket, object with roomName, role, players (hardcode 5), and gameLength (hardcode 2)
//#### LISTENER Z: "5 PLAYERS HAVE JOINED ROOM" ##################################
//4.) Host will pull the array of player objects from socket to locally keep track of game stats 





//5.) Host draws n random red cards from the deck and stores them in a redCards array locally
    hostGlobalVar.redCardsTotal = ( (hostGlobalVar.playersNum*5) + ((hostGlobalVar.playersNum - 1)*((hostGlobalVar.playersNum)*roundsNum) ));
    
    //n = ( 25 + 4*5*2)
    //n = 65

//6.) Host draws y random green cards from the deck and stores them in a greenCards array lcoally
    hostGlobalVar.greenCardsTotal = (hostGlobalVar.playersNum*hostGlobalVar.roundsNum);
    


//7.) Host deals the game's worth of red cards to each player via an array of card objects in socket
    
    // #SRM create the individual player decks
    createDecks(function(){
        console.log(hostGlobalVar.playerDecks);
    });

//#### EMIT A: "CARDS DEALT" ####################################################

/*===============================================================
    PlayRound
===============================================================*/
//8.) Host will determine who the next leader is by who is up next in the player array
//#### EMIT B: "YOU ARE THE LEADER" ################
//9.) Send this message to 1 player

//#### EMIT C: "YOU ARE NOT THE LEADER" #########################################
//10.) Send this message to all other players

//11.) Reveal next green card in array
//#### EMIT D: "GREEN CARD REVEALED" ############################################

//#### LISTENER E: ALL 4 "RED CARD PLAYED" MESSAGES RECEIVED ####################
//12.) Host will draw al the submitted cards from socket
//13.) Host will store them locally in a submittedCards array
//14.) Submitted cards will display on the host's machine
//15.) Host will pick a card to win this turn
//16.) Host will check the card.player_id value for teh submitted card, and update that player's score on local storage
//17.) Host adds the winning card to a winningCards array locally
//18.) Host clears the submittedCArds array

//19.) If it is not the last turn of a round start this section of code again from step 8
//20.) If it is the last turn of the round, check if it is the last round as well
//21.) If it is not also the last round, increase the local round counter
//#### EMIT F: "END OF ROUND" ###############################################
//22.) Go back to step 8 and repeat

/*===============================================================
    #SRM EndGame
===============================================================*/
//23.) If it is the last turn of the last round, display winner on screen, and whatever else we want to do
//#### EMIT G: "END OF GAME" ###############################################

function createDecks(cb){

    var deckIndexTracker = 0;

    for (i=0; i<hostGlobalVar.playersNum; i++){
        
        var playerDeckArray = [];
        push    
        hostGlobalVar.playerDecks.push(playerDeckArray);

    }

    return cb;

};