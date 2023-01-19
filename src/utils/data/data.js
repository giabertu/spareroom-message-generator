import { JSONParser } from "../classes/JSONParser";

const listItems = [
  '1. Fill in the data you want to be used in the \'Profile Information\' section',
  '2. Navigate to https://www.spareroom.co.uk and click on any advert that you are interested in',
  '3. Once on the advert page, click the \'Generate Message\' button',
  '4. Done! Your custom AI generated message is saved to your clipboard'
];


const parser = new JSONParser();
const occOptions = parser.getOccupations();
const hobbyOptions = parser.getHobbies();

const defaultProfileInfo = {
  name: '',
  diet: '',
  smoker: false,
  pets: false,
  age: 20,
  rangePicked: '',
  occupation: '',
  hobbies: '' //this will be an array of strings when the user selects tags
}


function getParsedProfile(profileInfo){
  let profileString = ''
  for (let [key, value] of Object.entries(profileInfo)){
    if (value && key !== 'rangePicked'){
      value = value == true ? 'Yes' : value;
      profileString += `, ${key}: ${value}`
    } else if (value && key == 'rangePicked'){
      profileString += `, Renting from: ${value.slice(0, 7)}, to ${value.slice(7)}` 
    } else if (key == 'smoker'){
      value = value == true ? 'Yes' : 'No';
      profileString += `, ${key}: ${value}` 
    }
  }
  return profileString.replace(',', '').trim();
}


export {listItems, occOptions, hobbyOptions, defaultProfileInfo, getParsedProfile};