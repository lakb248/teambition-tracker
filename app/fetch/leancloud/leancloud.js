import AV from 'leancloud-storage';

const APP_ID = 'NhOhAWxsk1rJJMwoDP1H3pnf-gzGzoHsz';
const APP_KEY = 'ey97bzH1uxID8dChEErlhdT2';

AV.init({
    appId: APP_ID,
    appKey: APP_KEY
});

export default AV;
