import AV from 'leancloud-storage';

const APP_ID = 'Vc4qaTQxIFfwEMmRkFmkqjG3-gzGzoHsz';
const APP_KEY = 'oqxkCVO8dPmh3x5TxWc6ErGF';

AV.init({
    appId: APP_ID,
    appKey: APP_KEY
});

export default AV;
