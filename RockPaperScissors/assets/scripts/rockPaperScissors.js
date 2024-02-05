function playRound(playerChoice, computerChoice)
{
    if (playerChoice == null || playerChoice == undefined)
    {
        console.error("Error null entry");
        return;
    }

    var normalizedPlayerChoice = playerChoice.toLowerCase();

    if (computerChoice == normalizedPlayerChoice)
    {
        console.log("DRAW");
        return;
    }

    var didWin = false;

    switch(normalizedPlayerChoice) 
    {
        case "rock":
            if (computerChoice == "scissors")
            {
                didWin = true;  
            }
            break;
        case "paper":
            if (computerChoice == "rock")
            {
                didWin = true;  
            }
            break;
        case "scissors":
            if (computerChoice == "paper")
            {
                didWin = true;  
            }
            break;
        default:
            break;
    }

    if (didWin)
    {
        console.log("You Win! " +normalizedPlayerChoice +" beats " +computerChoice);
        return;
    }

    console.log("You Lose! " +computerChoice +" beats " +normalizedPlayerChoice);
}

function getComputerChoice()
{
    var randomChoice = Math.floor(Math.random() * 100);

    if(randomChoice < 33)
    {
        return "paper";
    }
    else if(randomChoice < 66)
    {
        return "scissors";
    }
    return "rock";
}