const mongoose = require('mongoose');

class db {
    // 控制器 类 初始化
    constructor() {
        this.dbClient = undefined
        this.connect()
    }

    connect() {
        return new Promise((resolve, reject) => {
            if (this.dbClient) {
                const chalk = require('chalk');
                const success = chalk.bold.green;
                const error = chalk.bold.red;

                db.once('open', (callback) => {
                    console.log(success('数据库连接成功'));
                    this.dbClient = db
                    resolve('数据库连接成功')
                });

                db.on('error', (callback) => {
                    console.log(error('数据库连接失败'));
                    reject('数据库连接失败')
                })
            } else {
                reject()
            }
        })
    }

    find() {
        db.model('comments', commonentSchema, 'comments');
    }

    insert() {

    }

    updata() {

    }

    delete() {

    }
}
