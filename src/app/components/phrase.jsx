
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

export default renderPhrase