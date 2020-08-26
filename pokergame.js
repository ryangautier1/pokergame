const cards = [
  {
    number: 2,
    suit: 0
  },
  {
    number: 3,
    suit: 0
  },
  {
    number: 4,
    suit: 0
  },
  {
    number: 5,
    suit: 0
  },
  {
    number: 6,
    suit: 0
  },
  {
    number: 7,
    suit: 0
  },
  {
    number: 8,
    suit: 0
  },
  {
    number: 9,
    suit: 0
  },
  {
    number: 10,
    suit: 0
  },
  {
    number: 11,
    suit: 0
  },
  {
    number: 12,
    suit: 0
  },
  {
    number: 13,
    suit: 0
  },
  {
    number: 14,
    suit: 0
  },
  {
    number: 2,
    suit: 1
  },
  {
    number: 3,
    suit: 1
  },
  {
    number: 4,
    suit: 1
  },
  {
    number: 5,
    suit: 1
  },
  {
    number: 6,
    suit: 1
  },
  {
    number: 7,
    suit: 1
  },
  {
    number: 8,
    suit: 1
  },
  {
    number: 9,
    suit: 1
  },
  {
    number: 10,
    suit: 1
  },
  {
    number: 11,
    suit: 1
  },
  {
    number: 12,
    suit: 1
  },
  {
    number: 13,
    suit: 1
  },
  {
    number: 14,
    suit: 1
  },
  {
    number: 2,
    suit: 2
  },
  {
    number: 3,
    suit: 2
  },
  {
    number: 4,
    suit: 2
  },
  {
    number: 5,
    suit: 2
  },
  {
    number: 6,
    suit: 2
  },
  {
    number: 7,
    suit: 2
  },
  {
    number: 8,
    suit: 2
  },
  {
    number: 9,
    suit: 2
  },
  {
    number: 10,
    suit: 2
  },
  {
    number: 11,
    suit: 2
  },
  {
    number: 12,
    suit: 2
  },
  {
    number: 13,
    suit: 2
  },
  {
    number: 14,
    suit: 2
  },
  {
    number: 2,
    suit: 3
  },
  {
    number: 3,
    suit: 3
  },
  {
    number: 4,
    suit: 3
  },
  {
    number: 5,
    suit: 3
  },
  {
    number: 6,
    suit: 3
  },
  {
    number: 7,
    suit: 3
  },
  {
    number: 8,
    suit: 3
  },
  {
    number: 9,
    suit: 3
  },
  {
    number: 10,
    suit: 3
  },
  {
    number: 11,
    suit: 3
  },
  {
    number: 12,
    suit: 3
  },
  {
    number: 13,
    suit: 3
  },
  {
    number: 14,
    suit: 3
  }
]

let availableCards = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
  41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51
];
const makeHands = (nPlayers, availableCards) => {

  let hands = [];
  for (let i = 0; i < nPlayers; i++) {
    // set player # = i
    // initialize hand as empty array

    // loop twice so 2 cards are generated
    let currentHand = [];
    for (let j = 0; j < 2; j++) {
      // get random number from availableCards array
      let currentCardIndex = Math.floor(Math.random() * availableCards.length);
      currentHand.push(cards[availableCards[currentCardIndex]]);
      availableCards.splice(currentCardIndex, 1)[0];
    }
    hands.push({ player: i, hand: currentHand });
  }

  return hands;
}

const getBoard = (availableCards) => {
  let board = [];
  for (let j = 0; j < 5; j++) {
    // get random number from availableCards array
    let currentCardIndex = Math.floor(Math.random() * availableCards.length);
    board.push(cards[currentCardIndex]);
    availableCards.splice(currentCardIndex, 1)[0];
  }
  return board;
}

const checkHand = (hand, board) => {
  let cardSet = hand.concat(board);
  // check suits
  if (cardSet.filter(card => card.suit === 0).length >= 5
  || cardSet.filter(card => card.suit === 1).length >= 5
  || cardSet.filter(card => card.suit === 2).length >= 5
  || cardSet.filter(card => card.suit === 3).length >= 5) {
    let flush = true;
  }
  else {
    let flush = false;
  }

  // check for straight
  cardSet.sort((a,b) => {return a.number-b.number});
  // cardSet[4].number, cardSet[3].number, and cardSet[2].number must be consecutive in the 
  // sorted cardSet for a straight to exist, besides edge case of A-4 straight
  if (cardSet[4].number - cardSet[3].number === 1 && cardSet[3].number - cardSet[2].number === 1) {
    if (cardSet[5].number - cardSet[4].number === 1 && cardSet[6].number - cardSet[5].number === 1) {
      let straight = true;
    }
    else if (cardSet[2].number - cardSet[1].number === 1 && cardSet[1].number - cardSet[0].number === 1) {
      let straight = true;
    }
    else {
      let straight = false;
    }
  }
  // edge case of A-4 straight
  else if (cardSet[1].number - cardSet[0].number === 1
     && cardSet[2].number - cardSet[1].number === 1
     && cardSet[3].number - cardSet[2].number === 1
     && cardSet[6].number === 14) {
      let straight = true;
  }
  else {
    let straight = false;
  }

  // check for straight-flush
  if (straight && flush) {
    return "straight-flush";
  }
  
  // check for three of a kind
  

}

let hands = makeHands(12, availableCards);
console.log(hands);
let board = getBoard(availableCards);
console.log(board);
for (let i=0; i< hands.length; i++) {
  console.log(checkHand(hands[i].hand, board));
}
