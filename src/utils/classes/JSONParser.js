import occupations from '../data/occupations.json'
import hobbies from '../data/hobbies.json'

class JSONParser{

  constructor(){
    this.occupations = null;
    this.hobbies = null;
  }
  
  getOccupations(){
    if (this.occupations == null) {
      this.occupations = occupations.occupations.map(occupation => {return {value: occupation}})
    }
    return this.occupations
  }

  getHobbies(){
    if (this.hobbies == null){
      this.hobbies = hobbies.map(hobbyObj => {return {value: hobbyObj.hobby}})
    }
    return this.hobbies;
  }

}

export { JSONParser };