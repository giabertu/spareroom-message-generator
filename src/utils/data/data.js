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
  diet: '',
  smoker: false,
  pets: false,
  age: 20,
  rangePicked: '',
  occupation: '',
  hobbies: '' //this will be an array of strings when the user selects tags
}


export {listItems, occOptions, hobbyOptions, defaultProfileInfo};