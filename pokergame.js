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

function checkForStraight(arr) {
  // there can only be a straight if there are at least 5 unique cards
  if (arr.length >= 5) {
    // edge case of A-5 straight
    if (arr.includes(14) && 
    arr.includes(2) &&
    arr.includes(3) &&
    arr.includes(4) &&
    arr.includes(5)) {
      return [5,4,3,2,1];
    }

    let consequtiveCount = 1;
    let straight = false;
    for (let i=1; i<arr.length; i++) {
      if (arr[i] - arr[i-1] === 1) {
        consequtiveCount++;
        if (consequtiveCount >= 5) {
          straight = [arr[i], arr[i-1], arr[i-2], arr[i-3], arr[i-4]];
        }
      }
      else {
        consequtiveCount = 0;
      }
    } 
    return straight;
  }
}

// returns object with hand value 0-9, and array of hand that is worth that value
const checkHand = (hand, board) => {
  let cardSet = hand.concat(board);
  cardSet.sort((a, b) => { return a.number - b.number });

  let straightFlush = false;
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
    for (let i = suitZeroFlush.length - 1; i >= 0; i--) {
      flushArr.push(suitZeroFlush[i].number);
    }
    flush = flushArr;
  }
  else if (suitOneFlush.length >= 5) {
    let flushArr = [];
    for (let i = suitOneFlush.length - 1; i >= 0; i--) {
      flushArr.push(suitOneFlush[i].number);
    }
    flush = flushArr;
  }
  else if (suitTwoFlush.length >= 5) {
    let flushArr = [];
    for (let i = suitTwoFlush.length - 1; i >= 0; i--) {
      flushArr.push(suitTwoFlush[i].number);
    }
    flush = flushArr;
  }
  else if (suitThreeFlush.length >= 5) {
    let flushArr = [];
    for (let i = suitThreeFlush.length - 1; i >= 0; i--) {
      flushArr.push(suitThreeFlush[i].number);
    }
    flush = flushArr;
  }

  // check for straight-flush
  if (flush) {
    straightFlush = checkForStraight(flush); 
    if (straightFlush) {
      return { 8: straightFlush };
    }
  }

  // check for straight
  let removedDuplicates = [];
  for (let i=0; i<cardSet.length; i++) {
    if (!removedDuplicates.includes(cardSet[i].number)) {
      removedDuplicates.push(cardSet[i].number);
    }
  }

  straight = checkForStraight(removedDuplicates);

  if (flush) {
    if (flush.length>5) {
      flush.pop();
    }
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

    if (cardCounts.includes(4)) {
      let cardWithFour = +Object.keys(checkedValues).find(key => checkedValues[key] === 4);
      let kickerCards = cardSet.filter(card => card.number !== cardWithFour);
      let kickers = [];
      for (let i=0; i<kickerCards.length; i++) {
        kickers.push(kickerCards[i].number);
      }
      kickers.sort((a,b) => (b-a));
      return { 7: [cardWithFour, cardWithFour, cardWithFour, cardWithFour, kickers[0]]};
    }

  }






}

let hands = makeHands(12, availableCards);
console.log(hands);
// let board = getBoard(availableCards);
let board = [{number: 2, suit: 0}, {number: 3, suit: 0}, {number: 3, suit: 1},
{number: 3, suit: 2}, {number:9, suit: 1}];
console.log(board);

for (let i = 0; i < hands.length; i++) {
  (console.log(checkHand([{number: 3, suit: 3}, {number: 10, suit: 1}], board), hands[i].hand));
}
