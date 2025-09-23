// const success = (position) => {
//   const lat = position.coords.latitude;
//   const lon = position.coords.longitude;

//   return { lat, lon };
// };

// const failure = (err) => {
//   console.log(err);
// };

// export const getAutoGeoLoc = async () => {
//   if (navigator.geolocation) {
//     await navigator.geolocation.getCurrentPosition(success, failure);
//   } else return "error";
// };

// const success = (position, resolve) => {
//   const lat = position.coords.latitude;
//   const lon = position.coords.longitude;
//   resolve({ lat, lon });
// };

// const failure = (err, reject) => {
//   reject(err);
// };

// export const getAutoGeoLoc = () => {
//   return new Promise((resolve, reject) => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (pos) => success(pos, resolve),
//         (err) => failure(err, reject)
//       );
//     } else {
//       reject("Geolocation not supported");
//     }
//   });
// };
