$(document).ready(function() {
	
	var choices = {
		r:{
			s:1,
			lz:1,
			r:0,
			p:-1,
			sp:-1
		},
		p:{
			r:1,
			sp:1,
			p:0,
			s:-1,
			lz:-1
		},
		s:{
			p:1,
			lz:1,
			s:0,
			r:-1,
			sp:-1
		},
		lz:{
			p:1,
			sp:1,
			lz:0,
			r:-1,
			s:-1
		},
		sp:{
			s:1,
			r:1,
			sp:0,
			lz:-1,
			p:-1
		}
	};

	var userScore = 0, compScore = 0, roundCount=1, rounds;

	// CHOOSE FUNCTION	
	function chooser(){
		var choiceData = $(this).attr('data-choice');
		var userChoice = choices[choiceData];
		var compRandArr = ['s', 'r', 'p', 'lz', 'sp'];
		var compRand = compRandArr[Math.floor(Math.random()*compRandArr.length)];
		var compChoice = userChoice[compRand];

		console.log(userChoice);
		console.log(compRand);
	
		if(compChoice === 1){
			console.log('you win');
			userScore++;
		}else if(compChoice === 0){
			console.log('tied');
		}else if(compChoice === -1){
			console.log('you lose');
			compScore++;
		}
	
		$('#user-score').html(userScore);
		$('#comp-score').html(compScore);

		roundIncrementer();
	}

	// ROUND CHOOSE FUNCTION 
	function roundChoose(){
		rounds = parseInt($(this).attr('data-rounds'));
		console.log(rounds);
	}

	// GAME START FUNCTION
	function gameStart(){
		// check if rounds var has a number
		if(rounds === undefined){
			console.log('you must pick a number of rounds.');
			return;
		}

		// make round chooser buttons, start button and rules disappear
		$('.game-start-area').fadeOut(1000);
		// make game elements appear (wrap them all in a giant div to make it appear, same as gamestart screen)
		$('.game-area').fadeIn(1500);
		// set 'rounds' global var to be equal to roundsChosen
	}

	// ROUND LIMITER FUNCTION
	function roundIncrementer(){
		// if roundCount var = rounds var, hide game elements div, show final score screen
		roundCount++;
		if(roundCount > rounds){
			console.log('game finished');
			$('.choice-button').off();
		}
	}

	// BOUND FUNCTIONS
	$('.round-button').on('click', roundChoose);
	$('.start-button').on('click', gameStart);
	$('.choice-button').on('click', chooser);

	// FUNCTIONS CALLED

});