
newGame(false);
this.start_again = false;
function newGame(start_again_value) {
	var winMessageHeader = document.getElementById('winMessageHeader');
	if (winMessageHeader) {
		var parentHeader = winMessageHeader.parentElement;
		parentHeader.removeChild(winMessageHeader);
	}
	this.start_again = start_again_value;
	this.no_filled_cells = 0;
	this.clear = new Array(10);
	this.symbols = new Array(3);
	this.x_symbols = new Array(8);
	this.o_symbols = new Array(8);
	for (var i = 0; i < 8; i++) {
		this.x_symbols[i] = 0;
		this.o_symbols[i] = 0;
	}
	for (var i = 0; i < 3; i++) {
		this.symbols[i] = new Array(3);
		if (this.start_again == true) {
			for (var j = 0; j < 3; j++) {
				this.symbols[i][j] = "";
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
	console.log(this.symbols);
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
			console.log(this.symbols);
			var win = false;
			var row = Math.floor(item_no / 3);
			var col = item_no % 3;
			this.x_symbols[row]++;
			if (this.x_symbols[row] == 3) {
				win = true;
			}
			this.x_symbols[3 + col]++;
			if (this.x_symbols[3 + col] == 3) {
				win = true;
			}
			if (row == col) {
				this.x_symbols[6]++;
				if (this.x_symbols[6] == 3) {
					win = true;
				}
			}
			if (row + col == 2) {
				this.x_symbols[7]++;
				if (this.x_symbols[7] == 3) {
					win = true;
				}
			}
			console.log(Math.floor(item_no / 3), item_no % 3);
			if (win == true) {
				await new Promise(r => setTimeout(r, 100));
				displayResult("Player X won this game!");
				disableCells();
			} else if (this.no_filled_cells == 9) {
				await new Promise(r => setTimeout(r, 100));
				displayResult("It's a draw!");
				disableCells();
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
		var win = false;
		var row = Math.floor(chosen_cell / 3);
		var col = chosen_cell % 3;
		this.o_symbols[row]++;
		if (this.o_symbols[row] == 3) {
			win = true;
		}
		this.o_symbols[3 + col]++;
		if (this.o_symbols[3 + col] == 3) {
			win = true;
		}
		if (row == col) {
			this.o_symbols[6]++;
			if (this.o_symbols[6] == 3) {
				win = true;
			}
		}
		if (row + col == 2) {
			this.o_symbols[7]++;
			if (this.o_symbols[7] == 3) {
				win = true;
			}
		}
		if (win == true) {
			await new Promise(r => setTimeout(r, 100));
			displayResult("Player O won this game!");
			disableCells();
		} else if (this.no_filled_cells == 9) {
			await new Promise(r => setTimeout(r, 100));
			displayResult("It's a draw!");
			disableCells();
		}
	}
}

function displayResult(result) {
	var winMessageDiv = document.getElementById("winMessage");
	var winMessageHeader = document.createElement("h1");
	winMessageHeader.id = "winMessageHeader"
	winMessageHeader.innerHTML = result;
	winMessageDiv.appendChild(winMessageHeader);
}

function disableCells() {
	for (var i = 0; i < 3; i++) {
		for (var j = 0; j < 3; j++) {
			var item_no = i * 3 + j;
			id = "item"
			id = "item" + item_no.toString();
			console.log(id);
			document.getElementById(id).disabled = 'True';
		}
	}
}
