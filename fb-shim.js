// GitHub Pages + Firebase 연결: 페이지의 저장소(db)를 Firestore 실시간 DB로, 로그인을 Firebase 로그인으로 연결
(function () {
  window.SDC_SERVER = true;   // 브라우저 다운로드 사용 + 서버(Firebase) 로그인 사용
  const cfg = window.FIREBASE_CONFIG || {};
  if (!cfg.apiKey || /여기에/.test(cfg.apiKey)) {
    document.addEventListener('DOMContentLoaded', () => {
      const e = document.getElementById('loginErr');
      if (e) e.textContent = 'firebase-config.js에 Firebase 설정값을 먼저 넣어 주세요.';
    });
  }
  firebase.initializeApp(cfg);
  const auth = firebase.auth();
  const fs = firebase.firestore();
  auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);

  let readyRes; const ready = new Promise(r => (readyRes = r));
  let firstRes; const first = new Promise(r => (firstRes = r));
  auth.onAuthStateChanged(u => { firstRes(!!u); if (u) readyRes(); });

  const toEmail = id => (id.includes('@') ? id : id + '@' + (window.LOGIN_EMAIL_DOMAIN || 'hangangsup.app'));
  window.SDC = {
    async login(id, pw) {
      const email = toEmail(id);
      try { await auth.signInWithEmailAndPassword(email, pw); return true; }
      catch (e) {
        // 처음 한 번: 허용된 아이디의 계정이 아직 없으면, 지금 입력한 비밀번호로 계정을 만듦
        const allowed = (window.ALLOWED_LOGINS || []).map(toEmail);
        if (allowed.includes(email) && /user-not-found|invalid-credential|invalid-login-credentials/.test(e.code || '')) {
          try { await auth.createUserWithEmailAndPassword(email, pw); return true; } catch (e2) { console.warn(e2.code); }
        }
        return false;
      }
    },
    async logout() { await auth.signOut(); },
    me: () => first,
  };

  const dbApi = { doc: p => fs.doc(p), collection: p => fs.collection(p) };
  window.claude = {
    async use(name) {
      if (name === 'db') { await ready; return dbApi; }      // 로그인한 뒤에 연결
      if (name === 'user') return { can: async () => true, id: async () => (auth.currentUser || {}).uid || null };
      return null;
    },
  };
})();
