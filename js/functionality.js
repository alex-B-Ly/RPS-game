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

		console.log('choicedata: '+choiceData);
		console.log(compRand);

		modalStuff();
		$('#results-modal').modal('show');

		if(compChoice === 1){
			console.log('you win');
			userScore++;
			roundIncrementer();
		}else if(compChoice === 0){
			console.log('tied');
		}else if(compChoice === -1){
			console.log('you lose');
			compScore++;
			roundIncrementer();
		}
	
		$('#user-score').html(userScore);
		$('#comp-score').html(compScore);

		function modalStuff(){
			var humanChoice = $('#human-choice-img');
			var computerChoice = $('#comp-choice-img');

			humanChoice.removeClass();
			computerChoice.removeClass();

			function imgSet(choice, player){
				if(choice==='r'){
					player.addClass('fa fa-hand-rock-o');
				}else if(choice==='p'){
					player.addClass('fa fa-hand-paper-o');
				}else if(choice==='s'){
					player.addClass('fa fa-scissors');
				}else if(choice==='lz'){
					player.addClass('fa fa-hand-lizard-o');
				}else if(choice==='sp'){
					player.addClass('fa fa-hand-spock-o');
				}
			}

			imgSet(choiceData, humanChoice);
			imgSet(compRand, computerChoice);
		}

	}

	// ROUND CHOOSE FUNCTION 
	function roundChoose(){
		rounds = parseInt($(this).attr('data-rounds'));
		$('.rounds-display-number').html(rounds).css('visibility', 'visible');

		if($('.round-choose-title').hasClass('round-choose-title-warn')){
			$('.round-choose-title').removeClass('round-choose-title-warn');
		}

		$('.start-button').addClass('start-button-animate');
	}

	// GAME START FUNCTION
	function gameStart(){
		// check if rounds var has a number
		if(rounds === undefined){
			console.log('you must pick a number of rounds.');
			$('.round-choose-title').addClass('round-choose-title-warn');
			return;
		}

		// make round chooser buttons, start button and rules disappear
		$('.game-start-area').fadeOut(500);
		// make game elements appear (wrap them all in a giant div to make it appear, same as gamestart screen)
		$('.game-area').fadeIn(500);
		// Allow game buttons to work
		$('.choice-button').on('click', chooser);
	}

	// ROUND LIMITER FUNCTION
	function roundIncrementer(){
		// if roundCount var = rounds var, hide game elements div, show final score screen
		roundCount++;
		if(roundCount > rounds){
			console.log('game finished');
			$('.choice-button').off();

			$('.choice-row').fadeOut(500, function(){
				$('.final-button-area').fadeIn(600);
			});

			$('.final-button').on('click', function(){
				$('.game-area').fadeOut(600,function(){
					$('.game-finish-area').fadeIn(1000);
				});
			});
				
			winnerAnnounce();
		}
	}

	// FINISH SCREEN FUNCTION
	function winnerAnnounce(){
		if(userScore === compScore){
			$('.overall-winner').html('Tie.  There is no victor.');
		}else if(userScore > compScore){
			$('.overall-winner').html('You Win')
		}else{
			$('.overall-winner').html('Computer Wins');
		}

		$('.final-user-score').html(userScore);
		$('.final-comp-score').html(compScore);
	}

		// BOUND FUNCTIONS
	$('.round-button').on('click', roundChoose);
	$('.start-button').on('click', gameStart);
	

	// FUNCTIONS CALLED

});