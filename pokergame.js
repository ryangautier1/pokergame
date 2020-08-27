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
    board.push(cards[availableCards[currentCardIndex]]);
    availableCards.splice(currentCardIndex, 1)[0];
  }
  return board;
}


// returns object with hand value 0-9, and array of hand that is worth that value
const checkHand = (hand, board) => {
  let cardSet = hand.concat(board);
  cardSet.sort((a, b) => { return a.number - b.number });

  let straightflush = false;
  let fourOfAKind = false;
  let fullHouse = false;
  let flush = false;
  let straight = false;
  let threeOfAKind = false;
  let pair = false;
  let highCard = false

  let cardCounts;

  // check suits for flush
  let suitZeroFlush = cardSet.filter(card => card.suit === 0);
  let suitOneFlush = cardSet.filter(card => card.suit === 1);
  let suitTwoFlush = cardSet.filter(card => card.suit === 2);
  let suitThreeFlush = cardSet.filter(card => card.suit === 3);

  // if flush, get the 5 largest cards of that suit and store in array
  if (suitZeroFlush.length >= 5) {
    let flushArr = [];
    for (let i = suitZeroFlush.length - 1; i > suitZeroFlush.length - 6; i--) {
      flushArr.push(suitZeroFlush[i].number);
    }
    flush = flushArr;
  }
  else if (suitOneFlush.length >= 5) {
    let flushArr = [];
    for (let i = suitOneFlush.length - 1; i > suitOneFlush.length - 6; i--) {
      flushArr.push(suitOneFlush[i].number);
    }
    flush = flushArr;
  }
  else if (suitTwoFlush.length >= 5) {
    let flushArr = [];
    for (let i = suitTwoFlush.length - 1; i > suitTwoFlush.length - 6; i--) {
      flushArr.push(suitTwoFlush[i].number);
    }
    flush = flushArr;
  }
  else if (suitThreeFlush.length >= 5) {
    let flushArr = [];
    for (let i = suitThreeFlush.length - 1; i > suitThreeFlush.length - 6; i--) {
      flushArr.push(suitThreeFlush[i].number);
    }
    flush = flushArr;
  }

  // check for straight-flush
  if (flush) {

    if (flush[0] - flush[1] === 1 &&
      flush[1] - flush[2] === 1 &&
      flush[2] - flush[3] === 1 &&
      flush[3] - flush[4] === 1) {
      return { 8: straight };
    }
  }

  // check for straight
  // cardSet[4].number, cardSet[3].number, and cardSet[2].number must be consecutive in the 
  // sorted cardSet for a straight to exist, besides edge case of A-4 straight
  if (cardSet[4].number - cardSet[3].number === 1 && cardSet[3].number - cardSet[2].number === 1) {
    if (cardSet[5].number - cardSet[4].number === 1 && cardSet[6].number - cardSet[5].number === 1) {
      straight = cardSet[6].number;
    }
    else if (cardSet[2].number - cardSet[1].number === 1 && cardSet[1].number - cardSet[0].number === 1) {
      straight = cardSet[4].number;
    }
  }
  // edge case of A-4 straight
  else if (cardSet[1].number - cardSet[0].number === 1
    && cardSet[2].number - cardSet[1].number === 1
    && cardSet[3].number - cardSet[2].number === 1
    && cardSet[6].number === 14) {
    straight = cardSet[3].number;
  }

  if (flush) {
    return { 5: flush };
  }
  if (straight) {
    return { 4: straight };
  }

  // check for four of a kind, full house, 3 of a kind, and pair
  // cardSet is sorted at this point
  // will not need to check this if there is a flush or straight
  if (!straight && !flush) {
    let checkedValues = {};
    for (let i = 0; i < cardSet.length; i++) {
      // if I have not checked this value yet
      if (!checkedValues.hasOwnProperty(cardSet[i].number)) {
        checkedValues[cardSet[i].number] = 1;
      }
      // if I have checked this value, increment it
      else {
        checkedValues[cardSet[i].number]++;
      }
    }
    cardCounts = Object.values(checkedValues);
  }






}

let hands = makeHands(12, availableCards);
console.log(hands);
let board = getBoard(availableCards);
console.log(board);
for (let i = 0; i < hands.length; i++) {
  (console.log(checkHand(hands[i].hand, board), hands[i].hand));
}
