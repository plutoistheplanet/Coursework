let rooms = [
    {
        roomName: "1",
        img: "media/img/backround/darkRoom.jpg",
        scene: [
            {
                scenario: `You spot a man crouched in the corner of the room.<br/><br/>
                He looks...feral.<br/><br/>
                His ears prick up as he senses your presence.<br/><br/>
                What do you do?`,
                interaction: [
                    { 
                        option: "Attack the man", 
                        response: `The man recoils in fear as you raise your fist, throwing
                        an object before scuttling through the door.`,
                        healthEffect: 0,
                        item: "can",
                        minigame: null,
                        significantChoice: "You attacked the helpless man..."
                    },
                    { 
                        option: "Offer a hand?",
                        response: `A guttural shriek pierces the room as you offer your hand.
                        <br /> The man pounces and your flesh is wounded.<br/><br/>
                        You have lost some health.<br/>`,
                        healthEffect: -30,
                        item: null,
                        minigame: "door",
                        significantChoice: null
                    },
                    { 
                        option: "Give him water",
                        response: `The man scurries towards you, snatching the water from your
                        hand and hungrily lapping it up.<br/>
                        He mutters an unknown language and presents you with an item covered in cloth.`,
                        healthEffect: 0,
                        item: "can",
                        minigame: null,
                        significantChoice: null
                    },
                    { 
                        option: "Run", 
                        response: `The man appears...hungry, It's best that you quietly slip away...`,
                        healthEffect: 0,
                        item: null,
                        minigame: null,
                        significantChoice: null
                    }
                ]
            },
            //Paste next scenario here
        ]
    }
];
