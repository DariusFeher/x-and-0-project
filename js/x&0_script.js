
newGame(false);
this.start_again = false;
function newGame(start_again_value) {
	this.start_again = start_again_value;
	this.no_filled_cells = 0;
	this.clear = new Array(10);
	this.symbols = new Array(3);
	for (var i = 0; i < 3; i++) {
		this.symbols[i] = new Array(3);
		if (this.start_again == true) {
			for (var j = 0; j < 3; j++) {
				var id = "item";
				var item_no = i * 3 + j;
				id = id.concat(item_no.toString());
				document.getElementById(id).innerHTML = '';
			}
		}
	}
	for (var i = 0; i < 10; i++) {
		this.clear[i] = true;
	}
	this.player = 1;
	this.playerSymbol = ['O' , 'X'];
}


function addSymbol(box) {
	playerMove(box);
}

async function playerMove(box) {
	if (this.no_filled_cells % 2 == 0) {
		var item_no = parseInt(box.className.charAt(box.className.length - 1));
		if (this.clear[item_no] == false) {
			alert("Please choose another square!");
		} else {
			this.clear[item_no] = false;
			this.symbols[Math.floor(item_no / 3)][item_no % 3] = this.playerSymbol[this.player];
			document.getElementById(box.id).innerHTML = this.playerSymbol[this.player];
			this.no_filled_cells++;
			this.player = 0;
			if (checkWin() == true) {
				await new Promise(r => setTimeout(r, 100));
				alert("Player X won this game!");
				newGame(true);
			} else if (this.no_filled_cells == 9) {
				await new Promise(r => setTimeout(r, 100));
				newGame(true);
				alert("Game over, no winner!");
			} else {
				pcMove();
			}
		}
	}
}

async function pcMove() {
	if (this.no_filled_cells < 9) {
		var chosen_cell = Math.floor(Math.random() * 9);
		while (this.clear[parseInt(chosen_cell)] == false) {
			chosen_cell = Math.floor(Math.random() * 9);
		}
		this.clear[chosen_cell] = false;
		this.symbols[Math.floor(chosen_cell / 3)][chosen_cell % 3] = this.playerSymbol[this.player];
		var id = "item";
		id = id.concat(chosen_cell.toString());
		document.getElementById(id).innerHTML = this.playerSymbol[this.player];
		this.no_filled_cells++;
		this.player = 1;
		if (checkWin() == true) {
			await new Promise(r => setTimeout(r, 100));
			alert("Player O won this game!");
			newGame(true);
		} else if (this.no_filled_cells == 9) {
			await new Promise(r => setTimeout(r, 100));
			newGame(true);
			alert("Game over, no winner!");
		}
	}
}

function checkWin() {
	var win = false;
	for (var row = 0; row < 3; row++) {
		var equal = true;
		var symbol = this.symbols[row][0];
		if (symbol == 'X' || symbol == 'O') {
			for (var col = 1; col < 3; col++) {
				if (this.symbols[row][col] != symbol) {
					equal = false;
					break;
				}
			}
			if (equal == true) {
				win = true;
				break;
			}
		}
		if (win == false) {
			var equal = true;
			var symbol = this.symbols[0][row];
			if (symbol == 'X' || symbol == 'O') {
				for (var col = 1; col < 3; col++) {
					if (this.symbols[col][row] != symbol) {
						equal = false;
						break;
					}
				}
				if (equal == true) {
					win = true;
					break;
				}
			}
		}
	}
	if (win == false) {
		var equal_main_diagonal = false;
		var equal_secondary_diagonal = false;
		var symbol_main_diag = this.symbols[0][0];
		var symbol_secondary_diagonal = this.symbols[0][2];
		if (symbol_main_diag == 'X' || symbol_main_diag == 'O') {
			equal_main_diagonal = true;
		}
		if (symbol_secondary_diagonal == 'X' || symbol_secondary_diagonal == 'O') {
			equal_secondary_diagonal = true;
		}
		for (var i = 1; i < 3; i++) {
			if (this.symbols[i][i] != symbol_main_diag && (symbol_main_diag == 'X' || symbol_main_diag == 'O')) {
				equal_main_diagonal = false;
			}
			if (this.symbols[i][3 - i - 1] != symbol_secondary_diagonal && (symbol_secondary_diagonal == 'X' || symbol_secondary_diagonal == 'O')) {
				equal_secondary_diagonal = false;
			}
		}
		if (equal_main_diagonal == true || equal_secondary_diagonal == true) {
			win = true;
		}
	}
	return win;
}
