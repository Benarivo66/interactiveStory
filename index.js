const readline = require("readline");
const boxen = require("boxen");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let DEPTH = 0;

/* 
The story object contains nested objects similar to a linkedlist that provides room
for a user to interact with the program recursively
**/

const story = {
  id: "start",
  text: "You have a choice to study in Nigeria or Europe",
  choices: [
    {
      option: "Study in Nigeria",
      next: {
        id: "1",
        text: "You are given a scholarship to study in Nigeria?",
        choices: [
          {
            option: "You choose a federal university",
            next: {
              id: "1a",
              text: "You are cajoled to join some illegal organizations on campus",
              choices: [
                {
                  option:
                    "To avoid oppression on campus (or so you thought) you succumb to pressure and participated in occultic activities",
                  next: {
                    id: "1aa",
                    text: "You descend into darkness and it is difficult to find your way out or even purpose in life",
                    choices: [
                      {
                        option:
                          "You become a casualty in a cult war and the sad tale is on media for others to learn from.",
                        next: {
                          id: "1aaa",
                          text: "You descend into darkness...",
                          choices: [],
                        },
                      },
                      {
                        option:
                          "You are expelled from the institution, jailed and found the strength to repent after serious therapy",
                        next: {
                          id: "1aab",
                          text: "You descend into darkness...",
                          choices: [],
                        },
                      },
                    ],
                  },
                },
                {
                  option: "You stand your ground and say no to cultism",
                  next: {
                    id: "1ab",
                    text: "What then are the alternatives?",
                    choices: [
                      {
                        option:
                          "Instead you participate in science clubs and gained project experience and helped you get international funding for Masters program",
                        next: {
                          id: "1aba",
                          text: "Life is good",
                          choices: [],
                        },
                      },
                      {
                        option:
                          "You learn to become a politician by seeking election for president of the student union government",
                        next: {
                          id: "1abb",
                          text: "Life is good",
                          choices: [],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            option: "You register in a private university",
            next: {
              id: "1b",
              text: "You are qualified to study from any field",
              choices: [
                {
                  option: "You registered in the STEM field",
                  next: {
                    id: "1ba",
                    text: "What does STEM hold for you?",
                    choices: [
                      {
                        option: "You graduated with distinction",
                        next: {
                          id: "1baa",
                          text: "You descend into darkness...",
                          choices: [],
                        },
                      },
                      {
                        option:
                          "You dropped out to complete an internationally funded bootcamp to transition into the tech industry",
                        next: {
                          id: "1bab",
                          text: "You descend into darkness...",
                          choices: [],
                        },
                      },
                    ],
                  },
                },
                {
                  option: "You studied in the art department",
                  next: {
                    id: "1bb",
                    text: "Where does your journey lead from there?",
                    choices: [
                      {
                        option: "You found love while participating in a play",
                        next: {
                          id: "1bba",
                          text: "Life is good.",
                          choices: [],
                        },
                      },
                      {
                        option:
                          "You managed to escape all extra-curricular activities and become a stern critic of everything that exists",
                        next: {
                          id: "1bbb",
                          text: "You descend into darkness...",
                          choices: [],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      option: "You study in Europe",
      next: {
        id: "2",
        text: "You go to the UK and date both a white woman and a black woman.",
        choices: [
          {
            option: "Marry a white woman",
            next: {
              id: "2a",
              text: "You marry a white woman and bring you family to the UK since you decided not to return home.",
              choices: [],
            },
          },
          {
            option: "Marry a black woman",
            next: {
              id: "2b",
              text: "You marry a black woman and return home after studies to help your community with your knowledge",
              choices: [],
            },
          },
        ],
      },
    },
  ],
};


/**
     * outputs the result of a user's interaction with the program
     * @param obj - The nested object similar to a linkedlist that holds
     * the full story path
     */

const tellAStory = (obj) => {
  try {
    if (!obj || !obj.text || !Array.isArray(obj.choices)) {
      throw new Error("Invalid story structure.");
    }

    obj.text;
    obj.choices.forEach((choice, index) => {
      console.log(
        boxen(`${index + 1}. ${choice.option}`, {
          padding: 1,
          margin: 1,
          borderStyle: "double",
          borderColor: "cyan",
        })
      );
    });

    if (obj.choices.length === 0) {
      console.log("The end.");
      console.log(`The story had a depth of ${DEPTH}`);
      rl.close();
      return;
    }

    rl.question(
      "Enter the number that corresponds with your choice to continue. Number only.\n>>>>>>> ",
      (answer) => {
        const numChoice = parseInt(answer);
        if (
          isNaN(numChoice) ||
          numChoice < 1 ||
          numChoice > obj.choices.length
        ) {
          console.log(
            "❌ Invalid choice. Please enter a valid number from the options.\n"
          );
          tellAStory(obj);
          return;
        }

        const next = obj.choices[numChoice - 1].next;
        DEPTH += 1;
        tellAStory(next);
      }
    );
  } catch (error) {
    console.log(error.message ? error.message : error);
  }
};

tellAStory(story);
