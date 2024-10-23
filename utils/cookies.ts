// export function setCookie(name, value, days) {
//     if (typeof document !== 'undefined') {

//     const expires = new Date();
//     expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
//     document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;`
//     }
// }

// export function getCookie(name) {
//     if (typeof document !== 'undefined') {

//     const cookieName = `${name}=`;
//     const cookies = document.cookie.split(';');

//     for (let i = 0; i < cookies.length; i++) {
//         let cookie = cookies[i].trim();
//         if (cookie.indexOf(cookieName) === 0) {
//             return cookie.substring(cookieName.length, cookie.length);
//         }
//     }

//     return null;
// }
// }
// export function removeCookie  (name) {
//     if (typeof document !== 'undefined') {

//     document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
//     }
// };