let socket = io.connect();

// #Max To hide first div and show second
let showAndHide = function (id1, id2) {
    $(`#${id1}`).hide()
    $(`#${id2}`).show()
}

// #Max This was all Written before socket and is useless no
// //This is to validate code
// function codeComparison() {
//     let inputCode = $("#code-input").val();
//     console.log(inputCode)
//     //Compare input code to room codes available
//     // if (input code exists)
//         showAndHide("roomCode", "pregame")
//     // else
//     // Request new code
// } /#Max

function submitUsername() {
    //#Max  I don't think there needs to be validation if name is already taken but it may mess us up.  Unless each player is named player i to our programming

    //AJAX post user name to room
        //This should post it to the host to display the name on the players box

    //Shows next input if they want /#Max
    showAndHide("username", "createCards")
}

function Card(text, player) {
    this.text = text;
    this.description = "A homemade card, made with love from " + player
}


function getRandNum(){
		return (Math.floor(Math.random()*(99999-10000+1)+10000));
}

//Code comparison listener
$('#roomCode').submit(function(e) {
    e.preventDefault()
    let userData = {
        userName: $("#player-name-form").val().trim(),
        roomId: $("#code-input").val().trim(),
        role: "player",
        playerId: socket.id
    }
    console.log(userData)
    
    socket.emit('set user', userData, function(){
        
        // showAndHide("", "game")
    })
    showAndHide("roomCode", "pregame")
});

//New Card submit listener
$("#createCards").submit(function(e) {
    e.preventDefault();
    submitCards()
})

//listener for host a game 
$("#host").on("click", function(){
    let room = getRandNum()
    let userData = {
        userName: "Host-"+room,
        roomId: room,
        role: "host",
        playerId: socket.id
    }
    console.log(userData)
    //Bex: I moved this out here so I can see the host page while I'm working on it; it wasn't working before
    showAndHide('landing','host-page');
    //Bex: some setup for displaying the lobby page
    $("#room-code").text(userData.roomId);
    updatePlayerConnections(["Player1", "Player2"]);
    
    socket.emit('set user', userData, function(){
        
    })
})


//#Max Writing card click to favorite
function cardClickToFavorite(cardNum) {
    let card = document.getElementById(cardNum).innerHTML
    // console.log(document.getElementById(cardNum).innerHTML)
    document.getElementById("fav").innerHTML = card
}
 //#Max  These listeners are for switching each specific card into the fav div.
$("#card1").on("click", function(){
    cardClickToFavorite('card1')
})
$("#card2").on("click", function(){
    cardClickToFavorite('card2')
})
$("#card3").on("click", function(){
    cardClickToFavorite('card3')
})
$("#card4").on("click", function(){
    cardClickToFavorite('card4')
})
$("#card5").on("click", function(){
    cardClickToFavorite('card5')
})




// general functions for running Host
function getRandNumByInterval(min, max){
  return Math.floor(Math.random()*(max-min+1)+min);
}

//from: https://stackoverflow.com/a/2450976
function shuffleArray(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function removeItemFromArray(item, array){
    return array.splice($.inArray(item, array),1);
}


// Host Functions

function preparePlayedCards (cardArray){
    var index = 0;
    $(".played-card").each(function(){
        console.log(cardArray[index])
        $(this).find(".card-back").data("cardInfo", cardArray[index]);
        $(this).toggleClass('flipped');
        index++;
    })
}

function startJudging (){
    // Bex: should run whenever all player cards are submitted
    // Bex: switch the prompt on the host screen
    showAndHide("pre-judging-message", "mid-judging-message");
    // Bex: TODO: assign the data for the cards (and the players they belong to? might not be necessary if we keep info on player hands in the host side) on each card div
    var dummySubmittedCards = ["1", "2", "3", "4"]

    preparePlayedCards(dummySubmittedCards);
    
}



function startGame(){
    //Bex: TODO: Generate random numbers to represent each card for each player
    //then run a query to obtain all of those cards and shuffle them
    //then construct an array of cards for each players hand and the remaining cards

    showAndHide("host-pregame-lobby", "host-game");
}

$("#start-game-button").on("click", function(){
    startGame()
});

function updatePlayerConnections(playerList){
    $("#player-connections-container").empty();
    for(var p in playerList){
        $("#player-connections-container").append($("<div>").addClass("player-circle").text(playerList[p]))
    }
}

function updateScore(winningPlayerId, winningPlayerName){
    // Increment the score of the winner
    var winnerJqueryObj = $("#"+winningPlayerId);
    var updatedScore = parseInt(winnerJqueryObj.attr("data-score")) + 1;
    winnerJqueryObj.attr("data-score", updatedScore).text(updatedScore+" : "+winningPlayerName);

}


$(".card-back").on("dblclick", function(){
    console.log($(this).data("cardInfo"));
});


socket.on('deal cards', function(cards) {
    cards.forEach( card => console.log(card.title));
})
