const textElement = document.getElementById("text");
const optionButtonsElement = document.getElementById("option-buttons");

let state = {}

function startGame() {
    state = {}
    showTextNode(1)
}

function showTextNode(textNodeIndex) {
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
    textElement.innerText = textNode.text
    while (optionButtonsElement.firstChild) {
        optionButtonsElement.removeChild(optionButtonsElement.firstChild)
    }
    textNode.options.forEach(option => {
        if (showOption(option)) {
            const button = document.createElement("button")
            button.innerText = option.text
            button.classList.add("btn")
            button.addEventListener("click", () => selectOption(option))
            optionButtonsElement.appendChild(button)
        }
    })
}
function showOption(option) {
    return option.requireState == null || option.requireState(state)
}

function selectOption(option) {
    const nextTextNodeId = option.nextText
    if(nextTextNodeId <= 0){
    return startGame();
    }
    state = Object.assign(state, option.setState)
    showTextNode(nextTextNodeId)
}
const textNodes = [
    {
        id: 1,
        text: "Welcome to the Legend of Geo, a story based game where you are the main character. Click the option button below to start the game.",
        options:[
            {
                text: "Start",
                nextText: 2
            }
        ]
    },
    {
        id: 2,
        text: "Choose a character class. Some options and paths will only be allowed to certain classes.",
        options:[
            {
                text: "Knight",
                setState: {knight:true},
                nextText: 3,
            },
            {
                text: "Rogue",
                setState: {rogue: true},
                nextText: 3
            },
            {
                text: "Archer",
                setState: {archer: true},
                nextText: 3
            },
            {
                text: "Mage",
                setState: {mage:true},
                nextText: 3
            }
        ]
    },
    {
        id: 3,
        text: "You awaken from you mid-morning nap at the sound of nearby screaming. 'Monsters!' the screams shout. 'Monsters are attacking the capital!' ",
        options:[
            {
                text: "Grab your wooden sword and shield as an aspiring Knight, even though you are just a squire",
                requireState: (currentState) => currentState.knight,
                nextText: 4
            },
            {
                text: "Ready your homemade bow and arrows, and hope that it doesn't break",
                requireState: (currentState) => currentState.archer,
                nextText: 4
            },
            {
                text: "Even though you much rather go back to sleep, you know that you need to practice your dagger handling skills more and and slaying a live monster is practical, and profitable",
                requireState: (currentState) => currentState.rogue,
                nextText: 4
            },
            {
                text: "Grab your staff and spellbook and user a teleport spell to the fight",
                requireState: (currentState) => currentState.mage,
                nextText: 4
            },
            {
                text: "Look around for someone to help",
                nextText: 4
            },
            {
                text: "Go into town and see if the rumors are true. You've never seen monsters in real life before",
                nextText: 4
            },
            {
                text: "Run away from the sounds of screams. You know you are know match for real, live monsters",
                nextText: 5
            }
        ]
    },
    {
        id: 4,
        text: "You arrive at the town square and people are running amok everywhere. Sounds of screams and howls bounce off the wall. You don't recognize some of the bodiies on the ground but you know that deep down more will follow unless you do something.",
        options: [
            {
                text: "Readying yourself and your wooden sword, you charge head first into the center of town",
                requireState: (currentState) => currentState.knight,
                nextText: 6
            },
            {
                text: "You climb on top of one of the nearby townhouse via some vine and a pit of luck. With the high ground in your favor, you ready your bow for a fight.",
                requireState: (currentState) => currentState.archer,
                nextText: 6,
                requireState: (currentState) => currentState.archer,
                nextText: 4  },

        ]
    },
    {
        id: 5
    }
]

startGame();