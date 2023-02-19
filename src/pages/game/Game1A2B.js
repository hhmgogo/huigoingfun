import React, { useState } from "react";

function Game1A2B() {
  return "1A2B";
  // const [secretNumber, setSecretNumber] = useState(generateSecretNumber());
  // const [guess, setGuess] = useState("");

  // function generateSecretNumber() {
  //   const digits = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  //   const secretDigits = [];

  //   for (let i = 0; i < 4; i++) {
  //     const randomIndex = Math.floor(Math.random() * digits.length);
  //     const digit = digits[randomIndex];
  //     digits.splice(randomIndex, 1);
  //     secretDigits.push(digit);
  //   }

  //   return secretDigits.join("");
  // }

  // function handleGuessChange(event) {
  //   setGuess(event.target.value);
  // }

  // function handleGuessSubmit(event) {
  //   event.preventDefault();

  //   let a = 0;
  //   let b = 0;

  //   for (let i = 0; i < 4; i++) {
  //     const digit = guess[i];
  //     if (digit === secretNumber[i]) {
  //       a++;
  //     } else if (secretNumber.includes(digit)) {
  //       b++;
  //     }
  //   }

  //   if (a === 4) {
  //     alert("恭喜你猜對了！");
  //     setSecretNumber(generateSecretNumber());
  //     setGuess("");
  //   } else {
  //     alert(`${a}A${b}B`);
  //   }
  // }

  // return (
  //   <div>
  //     <h1>1A2B</h1>
  //     <form onSubmit={handleGuessSubmit}>
  //       <input type="text" value={guess} onChange={handleGuessChange} />
  //       <button type="submit">猜！</button>
  //     </form>
  //   </div>
  // );
}

export default Game1A2B;
