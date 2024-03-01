import { useNavigate } from "react-router-dom";
import apiService from "./apiService";
import Information from "./informationService";
import Cookies from "js-cookie";

class AuthService {
  static setemail(email:string){
    return Cookies.set('email',email,{expires:1})
  }

  static getemail(){
    return Cookies.get('email')
  }
  static removeemail(){
    return Cookies.remove('email')
  }


  static setgymid(gymid:string){
    return Cookies.set('gymid',gymid, { expires: 7 })
 }

 static getgymid(){
  return Cookies.get('gymid')
 }

 static removegymid(){
  return Cookies.remove('gymid')
 }

    static getRole(){
        console.log(Cookies.get('role'))
        return Cookies.get('role')
    }

    static setRole(role:string){
    return Cookies.set('role',role,{ expires: 7 })
    }

    static removeRole(){
      return Cookies.remove('role')
     }

    static getAccessToken() {
      return Cookies.get('accessToken');
    }
  
    static setAccessToken(token:string) {
      Cookies.set('accessToken', token,{ expires: 7 });
    }
  
    static getRefreshToken() {
      return Cookies.get('refreshToken');
    }
  
    static setRefreshToken(token:string) {
      Cookies.set('refreshToken', token,{ expires: 7 });
    }
  
    static clearTokens() {
      Cookies.remove('accessToken');
      Cookies.remove('refreshToken');
      Information.removeGymInfromation();
      Information.removePersonalInfromation();
      this.clearAccessTokenTimestamp();
      this.clearRefreshTokenTimestamp();
      this.removeRole();
      this.removegymid();
      this.removeemail();
      {
    }
    }


    // ------------------    TOKENS TIMESTAMPS   ------------------------------ // 

    // ACCESS TOKEN
    static getAccessTokenTimestamp() {
        return Cookies.get('accessTokenTimestamp');
      }
    
      static setAccessTokenTimestamp() {
        const currentTime = Date.now().toString();
        Cookies.set('accessTokenTimestamp', currentTime);
      }
    
      static clearAccessTokenTimestamp() {
        Cookies.remove('accessTokenTimestamp');
      }

    // REFRESH TOKEN
    static getRefreshTokenTimestamp() {
        return Cookies.get('refreshTokenTimestamp');
      }
    
      static setRefreshTokenTimestamp() {
        const currentTime = Date.now().toString();
        Cookies.set('refreshTokenTimestamp', currentTime);
      }
    
      static clearRefreshTokenTimestamp() {
        Cookies.remove('refreshTokenTimestamp');
      }

    // ------------------------------------------------- //
      static async tokenTimestampCheck() {
        const navigate = useNavigate();
        const lastAccessTokenTimestamp = AuthService.getAccessTokenTimestamp();
        const lastRefreshTokenTimestamp = AuthService.getRefreshTokenTimestamp();

        if (lastAccessTokenTimestamp && lastRefreshTokenTimestamp) {
          const lastAccessActivityTime = parseInt(lastAccessTokenTimestamp, 10);
          const lastRefreshActivityTime = parseInt(lastRefreshTokenTimestamp, 10);
          const currentTime = Date.now();
          const accessExpiration = 55 * 60 * 1000; 
          const refreshExpiration = 110 * 60 * 1000; 

            // FIRST CHECK :  ACCESS TOKEN EXPIRED 
          if (currentTime - lastAccessActivityTime > accessExpiration) {
            // SECON CHECK :  REFRESH TOKEN ALSO EXPIRED =>  CLEAR TOKENS AND NAVIGATE
             if(currentTime - lastRefreshActivityTime > refreshExpiration){
                this.clearTokens();
                navigate("/home/sign-in")
                return false 
             } else {
                const response = await apiService.post('token/refresh/',{
                    "refresh": this.getRefreshToken
                })        
                this.setAccessToken(response.data.access);
                this.setRefreshToken(response.data.refresh);
                this.setAccessTokenTimestamp();
                return true
             }
          } else {return true}
        }
        else {
        return true
        }
      }
  }
  
  export default AuthService;
  