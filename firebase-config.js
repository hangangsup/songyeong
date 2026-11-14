// Firebase 설정 (공개돼도 괜찮은 값입니다. 보안은 로그인 + Firestore 규칙이 지킵니다.)
window.FIREBASE_CONFIG = {
  apiKey: "AIzaSyAy4aWXxyXD6tHEF0kt29sV_yCL8eZIoAY",
  authDomain: "hangang-songyeong.firebaseapp.com",
  projectId: "hangang-songyeong",
  storageBucket: "hangang-songyeong.firebasestorage.app",
  messagingSenderId: "459693506148",
  appId: "1:459693506148:web:11d683ebac693e5c372971"
};
// Firebase에 사용자를 "supdc0301@hangangsup.app"으로 만들면 화면에서는 "supdc0301"만 입력하면 됩니다.
window.LOGIN_EMAIL_DOMAIN = "hangangsup.app";
// 지점별 아이디. prefix가 비어 있으면 기존(한강숲) 데이터, 아니면 그 지점 전용 저장공간을 씁니다.
// 처음 로그인할 때 입력한 비밀번호가 그 아이디의 비밀번호가 됩니다.
window.CENTERS = {
  supdc0301: { name: "한강숲데이케어센터", short: "한강숲", prefix: "" },
  supdc0801: { name: "더숲데이케어센터",   short: "더숲",   prefix: "centers/thesup/" },
  supdc0420: { name: "숲데이케어센터",     short: "숲",     prefix: "centers/sup/" }
};
window.ALLOWED_LOGINS = Object.keys(window.CENTERS);
