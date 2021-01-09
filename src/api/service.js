// import axios from "axios";
// import authHeader from "../header/AuthHeader";

// const API_URL = "https://caro-game-api.herokuapp.com/api/v1";



// class Auth {
//   login(username, password) {
//     return axios
//       .post(API_URL + "/auth/login", {
//         username,
//         password,
//       })
//       .then((response) => {
//         if (response.data) {
//           localStorage.setItem("user", JSON.stringify(response.data));
//           console.log(response.data)
//         }
//         return response.data;
//       });
//   }
//   loginGoogle(googleToken){
//     return axios
//       .post(API_URL + "/auth/logingoogle", {
//         googleToken,
//       })
//       .then((response) => {
//         if (response.data) {
//           localStorage.setItem("user", JSON.stringify(response.data));
//           console.log(response.data)
//         }
//         return response.data;
//       });

//   }

//   loginFacebook(accesstoken){
//     return axios
//       .post(API_URL + "/auth/loginfacebook", {
//         accesstoken,
//       })
//       .then((response) => {
//         if (response.data) {
//           localStorage.setItem("user", JSON.stringify(response.data));
//           console.log(response.data)
//         }
//         return response.data;
//       });

//   }

//   logout(){
//       localStorage.removeItem("user");
//   }

//   register(name, username, password, confirmpassword) {
//     return axios.post(API_URL + "/auth/register", {
//       name,
//       username,
//       password,
//       confirmpassword,
//     });
//   }
//   updateUser(name){
//     console.log(authHeader());
//     return axios.put(API_URLHOME+"update/update/",{
//       name,
//     },
//     {
//       headers:authHeader(),
//     }).then((response) =>{
//       console.log("then" + response.data.name);
//       localStorage.setItem("user", JSON.stringify(response.data));
//       return response.data;

//     }).catch((err) => {
//       return err;
//     })
//   }

//   getCurrentUser() {
//     return JSON.parse(localStorage.getItem('user'));
//   }
// }

// export default new Auth();