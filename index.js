let game = 1,
    player = ['O', 'X'],
    winnerO = false,
    winnerX = false;



function NextTurn(clicked_id) {
    let btnText = document.getElementById(clicked_id).textContent;


    if (btnText == "") {                    // Checkt ob das Feld leer ist
        if (game <= 10) {                   // Checkt ob es noch mögliche Züge gibt
            if (game % 2 == 1) {        	    
                if (winnerX == false && winnerO == false) {
                    document.getElementById(clicked_id).textContent = player[0]     //Manueller Zug
                    game++
                    checkWinner()
                }    
                if (game < 9) {
                    aiMove()                // Zug des Algorithmus
                } else {
                    document.getElementById("winnerline").innerText = "Unentschieden!"
                }
            }
        }
    } 
    checkWinner()
}    

function checkWinner() {
    let btn0 = document.getElementById('btn0').textContent,
        btn1 = document.getElementById('btn1').textContent,
        btn2 = document.getElementById('btn2').textContent,
        btn3 = document.getElementById('btn3').textContent,
        btn4 = document.getElementById('btn4').textContent,
        btn5 = document.getElementById('btn5').textContent,
        btn6 = document.getElementById('btn6').textContent,
        btn7 = document.getElementById('btn7').textContent,
        btn8 = document.getElementById('btn8').textContent,
        row0O = ((btn0 == "O") && (btn1 == "O") && (btn2 == "O")),
        row0X = ((btn0 == "X") && (btn1 == "X") && (btn2 == "X")),
        row1O = ((btn3 == "O") && (btn4 == "O") && (btn5 == "O")),
        row1X = ((btn3 == "X") && (btn4 == "X") && (btn5 == "X")),
        row2O = ((btn6 == "O") && (btn7 == "O") && (btn8 == "O")),
        row2X = ((btn6 == "X") && (btn7 == "X") && (btn8 == "X")),
        col0O = ((btn0 == "O") && (btn3 == "O") && (btn6 == "O")),
        col0X = ((btn0 == "X") && (btn3 == "X") && (btn6 == "X")),
        col1O = ((btn1 == "O") && (btn4 == "O") && (btn7 == "O")),
        col1X = ((btn1 == "X") && (btn4 == "X") && (btn7 == "X")),
        col2O = ((btn2 == "O") && (btn5 == "O") && (btn8 == "O")),
        col2X = ((btn2 == "X") && (btn5 == "X") && (btn8 == "X")),
        dia0O = ((btn0 == "O") && (btn4 == "O") && (btn8 == "O")),
        dia0X = ((btn0 == "X") && (btn4 == "X") && (btn8 == "X")),
        dia1O = ((btn6 == "O") && (btn4 == "O") && (btn2 == "O")),
        dia1X = ((btn6 == "X") && (btn4 == "X") && (btn2 == "X"));

    if (row0O || row1O || row2O || col0O || col1O || col2O || dia0O || dia1O){
        console.log("Player O hat gewonnen")
        document.getElementById('winnerline').innerText = "Spieler O hat gewonnen!"
        winnerO = true
    } else if (row0X || row1X || row2X || col0X || col1X || col2X || dia0X || dia1X){
        console.log("Spieler X hat gewonnnen")
        document.getElementById('winnerline').innerText = "Spieler X hat gewonnen!"
        winnerX = true;
    }
}

function clearWinner() {
    document.getElementById("winnerline").innerText = null
    winnerO = false
    winnerX = false
}

function aiMove() {
    let rdm_num = "btn" + Math.floor(Math.random() * 9),
        rdm_field = document.getElementById(rdm_num).textContent;       //ermittelt ein zufälliges Feld
 
    game++

    if (winnerO == false && winnerX == false){                                      // Wenn das Spiel noch nicht vorbei ist
    while (rdm_field != "") {                                                       // Guckt ob das zufällige Feld schon belegt ist 
            rdm_num = "btn" + Math.floor(Math.random() * 9)
            rdm_field = document.getElementById(rdm_num).textContent
        }
        document.getElementById(rdm_num).textContent = player[1]
        checkWinner()
        if (game > 3) {
            if (winnerX) {                                                          // Wenn das Zufällige Feld zum Sieg führt breche hier ab
            } else {
                document.getElementById(rdm_num).textContent = ""
                for (var i = 0; i <= 8; i++) {                                      // Probiere ob eines der anderen Felder gewinnen könnten ...
                    if (document.getElementById("btn" + i).textContent == "") {
                        document.getElementById("btn" + i).textContent = player[1]
                        checkWinner()
                        if (winnerX) {                                              // ... wenn ja Breche hier ab ...
                            document.getElementById(rdm_num).textContent = ""
                            clearWinner()
                            break
                        } 
                        document.getElementById("btn" + i).textContent = player[0]  // ... wenn nein Probiere ob ein der Gegner im Nächsten Zug gewinnen könnte.
                        checkWinner()
                        if (winnerO) {                                              // Wenn der Gegner gewinnen könnte blocke sein nächsten Zug
                            document.getElementById(rdm_num).textContent = ""
                            clearWinner()
                            document.getElementById("btn" + i).textContent = player[1]
                            break
                        } else {
                            document.getElementById("btn" + i).textContent = ""
                            document.getElementById(rdm_num).textContent = player[1]
                        }
                    }
                }
            }
        }
    }    
}    

function newGame(){
    location.reload()
}