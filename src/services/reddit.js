import snoowrap from 'snoowrap';
import redditConf from '../../reddit.conf.json';

const r = new snoowrap(redditConf);

export default r;