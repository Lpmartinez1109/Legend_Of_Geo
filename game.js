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
        text: "You wake up in a strange place and you see a jar of blue goo near you.",
        options: [
            {
                text: "Take goo",
                setState: { blueGoo: true },
                nextText: 2
            },
            {
                text: "Leave the goo",
                nextText: 2
            }

        ]
    },
    {
        id: 2,
        text: "You venture forth in search of answer to where you are when you come across a merchant.",
        options: [
            {
                text: "Trade the goo for a sword",
                requireState: (currentState) => currentState.blueGoo,
                setState: { blueGoo: false, sword: true },
                nextText: 3
            },
            {
                text: "Trade the good for a shield",
                requireState: (currentState) => currentState.blueGoo,
                setState: { blueGoo: false, shield: true },
                nextText: 3
            },
            {
                text: "Ignore the merchant",
                nextText: 3
            }
        ]
    },
    {
        id: 3,
        text: "After leaving the merchant, you start to feel tired and stumble upon a small town next to a dangerous looking castle.",
        options: [
            {
                text: "Explore the castle",
                nextText: 4,
            },
            {
                text: "Find a room to sleep at in the town",
                nextText: 5,
            },
            {
                text: "Find some hay in a stable to sleep in.",
                nextText: 6
            },
        ]
    },
    {
        id: 4,
        text: "You walk in to the castle and in the middle of the hall is a lone throne. You get a deep, foreboding feeling the pit of your stomach as if something is watching you from the shadows. You can still walk and try and find somewhere else to sleep.",
        options:[
            {
                text: "Walk back towards the town",
                nextText:7
            },
            {
                text: "Explore the castle a bit",
                nextText:8
            },
            {
                text: "Ready your sword",
                requireState: (currentState) => currentState.sword,
                setState: {sword: true,},
                nextText: 9
            },
            {
                text: "Ready your shield",
                requireState: (currentState) => currentState.shield,
                setState:{shield: true,},
                nextText: 10
            }
        ]
    },
    {
        id: 5,
        text: "You travel down to the town square and decide to try and find a room to rent. The town is mostly quiet and surprisly empty with only the innkeeper and a few other townspeople huddle around a table.",
        options:[
            {
                text:"Walk over to the table",
                nextText: 11,
            },
            {
                text: 
            }

        ]
    }
]

startGame();