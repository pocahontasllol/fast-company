
const renderPhrase = (number) => {
  const phrase = [
    " человек тусанет",
    " человека тусанут",
    " человек тусанет",
  ];
  let cases = [2, 0, 1, 1, 1, 2];
  return number
    ? number +
        phrase [
          number % 100 > 4 && number % 100 < 20
            ? 2
            : cases[number % 10 < 5 ? number % 10 : 5]
        ] +
        " с тобой сегодня"
    : " Никто  не тусанет с тобой сегодня";
};

// const lastOne = Number(number.toString().slice(-1))
//       if (number >4 && number < 15) return "человек тусанет"
//       if ([2,3,4].indexOf(lastOne) >= 0) return "человека тусанут"
//       if (lastOne === 1) return "человек тусанет"
//       return 'человек тусанет'
// }
export default renderPhrase