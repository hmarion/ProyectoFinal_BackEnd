import {fileURLToPath} from 'url';
import {dirname} from 'path';

const filename= fileURLToPath(import.meta.url);

class Utils{

    static dateNow = `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`;
 
    static __dirname = dirname(filename);
}

export default Utils;