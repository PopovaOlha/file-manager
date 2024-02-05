const getInformationFromUser =  (inform) => {
  let informInArray = "";
  if (inform.includes(`"`)) {
    if (inform[0] === `"`) {
      informInArray = inform.split(`" `);
    } else {
      informInArray = inform.split(` "`);
    }
  } else {
    informInArray = inform.split(" ");
  }
  return informInArray;
};
export default getInformationFromUser;
