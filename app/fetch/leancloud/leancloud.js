import AV from 'leancloud-storage';

const APP_ID = '6e9T6G7MyDHxYTJEbqINSgMp-gzGzoHsz';
const APP_KEY = '5Usk1eIXt8qx0kGcp6qeJWK4';

AV.init({
    appId: APP_ID,
    appKey: APP_KEY
});

export default AV;
