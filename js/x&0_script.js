
newGame();

function newGame() {
	
	var winMessageHeader = document.getElementById('winMessageHeader');
	if (winMessageHeader) {
		var parentHeader = winMessageHeader.parentElement;
		parentHeader.removeChild(winMessageHeader);
	}

	var board = document.getElementById('board');
	if (board) {
		var parentBoard = board.parentElement;
		parentBoard.removeChild(board);
	}
	no_filled_cells = [0];
	clear_cell = new Array(9);

	x_symbols = new Array(8);
	o_symbols = new Array(8);

	for (var i = 0; i < 8; i++) {
		x_symbols[i] = 0;
		o_symbols[i] = 0;
	}

	for (var i = 0; i < 9; i++) {
		clear_cell[i] = true;
	}

	createBoard(no_filled_cells, clear_cell, x_symbols, o_symbols);
}

function createBoard(no_filled_cells, clear_cell, x_symbols, o_symbols) {
	var board_container = document.getElementById("board_container");
	var board = document.createElement('div');
	board.id = "board";
	board.className = "grid-container";
	board_container.appendChild(board);
	for (var item_no = 0; item_no < 9; item_no++) {
		var new_cell = document.createElement('div');
		new_cell.id = "item" + item_no.toString();
		new_cell.className = "item" + item_no.toString();
		new_cell.onclick = function() {playerMove(this, no_filled_cells, clear_cell, x_symbols, o_symbols);};
		board.appendChild(new_cell);
	}
}

function getId(box) { 
	return parseInt(box.className.charAt(box.className.length - 1));
}

function playerMove(box, no_filled_cells, clear_cell, x_symbols, o_symbols) {
	var item_no = getId(box);
	if (clear_cell[item_no] == false) {
		alert("Please choose another square!");
	} else {
		fillCell(box.id, "X", item_no, no_filled_cells, clear_cell);
		var win = checkWin(Math.floor(item_no / 3), item_no % 3, x_symbols);
		if (handleWin(win, "X", no_filled_cells) == false) {
			pcMove(no_filled_cells, clear_cell, o_symbols);
		}
	}
}

function pcMove(no_filled_cells, clear_cell, o_symbols) {
	if (no_filled_cells < 9) {
		var chosen_cell = Math.floor(Math.random() * 9);
		while (clear_cell[parseInt(chosen_cell)] == false) {
			chosen_cell = Math.floor(Math.random() * 9);
		}
		fillCell("item" + chosen_cell.toString(), "O", chosen_cell, no_filled_cells, clear_cell);
		var win = checkWin(Math.floor(chosen_cell / 3), chosen_cell % 3, o_symbols);
		handleWin(win, "O", no_filled_cells);
	}
}

function handleWin(win, player, no_filled_cells) {
	if (win == true) {
		displayResult("Player " + player + " won this game!");
		disableCells();
		return true;
	} else if (no_filled_cells == 9) {
		displayResult("It's a draw!");
		disableCells();
		return true;
	}
	return false;
}

function fillCell(id, symbol, cell_no, no_filled_cells, clear_cell) {
	clear_cell[cell_no] = false;
	document.getElementById(id).innerHTML = symbol;
	no_filled_cells[0]++;
}

function checkWin(row, col, symbols_array) {
	symbols_array[row]++;
	if (symbols_array[row] == 3) {
		return true;
	}
	symbols_array[3 + col]++;
	if (symbols_array[3 + col] == 3) {
		return true;
	}
	if (row == col) {
		symbols_array[6]++;
		if (symbols_array[6] == 3) {
			return true;
		}
	}
	if (row + col == 2) {
		symbols_array[7]++;
		if (symbols_array[7] == 3) {
			return true;
		}
	}
	return false;
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
			id = "item" + (i * 3 + j).toString();
			document.getElementById(id).onclick = null;
		}
	}
}
