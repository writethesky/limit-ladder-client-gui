const path = require('path')
const fs = require('fs')
const { spawn } = require('child_process');

window.start = (phone, password, localPort, proxy, callback) => {

    const start = spawn(path.join(__dirname, '../cli/limit-ladder-client'), ['-S', 'start', '-x', proxy, '-P', localPort, '-u', phone, '-p', password, '-r', path.join(__dirname, '../cli/rules.url')]);

    start.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`);
      callback(data)
    });

    start.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
      callback(data)
    });

    start.on('close', (code) => {
      console.log(`子进程退出，退出码 ${code}`);
      callback("代理服务已经关闭")
    });

}

window.stop = () => {

    const start = spawn(path.join(__dirname, '../cli/limit-ladder-client'), ['-S', 'stop']);

    start.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`);
    });

    start.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
    });

    start.on('close', (code) => {
      console.log(`子进程退出，退出码 ${code}`);
    });

}

window.getRules = (callback) => {
    let filePath = path.join(__dirname, '../cli/rules.url')
    fs.readFile(filePath, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            callback(data.toString());
        }
    })
}

window.setRules = (rulesString) => {
    let filePath = path.join(__dirname, '../cli/rules.url')
    fs.writeFile(filePath, rulesString, (err) => {
        if(err){
            console.log(err);
        }
    })
}