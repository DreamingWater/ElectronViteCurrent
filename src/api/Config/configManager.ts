const fs = require('fs');
const path = require('path');
const os = require('os');

export class ConfigManager {
    private userDir: string;
    private newDirPath: string;
    private configFilePath: string;

    constructor() {
        this.userDir = os.homedir();
        this.newDirPath = path.join(this.userDir, 'FiberLaser');
        this.configFilePath = path.join(this.newDirPath, 'config.json');
        this.createDirIfNotExists();
    }

    public readConfigFile() {
        try {
            const data = fs.readFileSync(this.configFilePath , 'utf8');
            const config = JSON.parse(data);
            return config;
        } catch (err) {
            console.error(`Error reading file from disk: ${err}`);
        }
    }

    private writeConfigFile(filePath: string, config: any) {
        try {
            const data = JSON.stringify(config, null, 2);
            fs.writeFileSync(filePath, data, 'utf8');
        } catch (err) {
            console.error(`Error writing file on disk: ${err}`);
        }
    }

    private createDirIfNotExists() {
        if (!fs.existsSync(this.newDirPath)) {
            fs.mkdirSync(this.newDirPath);
            const defaultConfig = {};  // You can define the default configuration here
            this.writeConfigFile(this.configFilePath, defaultConfig);
        }
    }

    public getConfigFilePath() {
        return this.configFilePath;
    }
    public updateConfigs(newConfigs: { [key: string]: any }) {
        const config = this.readConfigFile(this.configFilePath);
        for (const key in newConfigs) {
            config[key] = newConfigs[key];
        }
        this.writeConfigFile(this.configFilePath, config);
        return true;
    }
}




// // 使用示例
// const config = readConfigFile('./config.json');
// console.log(config);
//
// config.newKey = 'newValue';
// writeConfigFile('./config.json', config);


