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

	var userScore = 0, compScore = 0;

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
	}

	// ROUND CHOOSER FUNCTION
	function roundChooser(){
		
	}

	// BOUND FUNCTIONS
	$('.choice-button').on('click', chooser);

});