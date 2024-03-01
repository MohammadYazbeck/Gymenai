import Cookies from "js-cookie";

class Information {

  static setPersonalInformation(personalInfo:string) {
     Cookies.set('personalInfo',personalInfo,{ expires: 7 });
  }

  static getPersonalInformation() {
    return Cookies.get('personalInfo');
  }

  static removePersonalInfromation() {
      return Cookies.remove('personalInfo');
    }
  

    static setGymInformation(gymInfo:string) {
      Cookies.set('gymInfo',gymInfo,{ expires: 7 });
   }
 
   static getGymInformation() {
     return Cookies.get('gymInfo');
   }

   static removeGymInfromation() {
       return Cookies.remove('gymInfo');
     }
   
 



}

export default Information;
