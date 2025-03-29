// api/fnlb.js

import { FNLB } from 'fnlb';

const fnlb = new FNLB.default();

async function startFNLB() {
    await fnlb.start({
        apiToken: 'API Token',
        numberOfShards: 1,
        botsPerShard: 5,
        categories: ['category ID'],
        logLevel: 'DEBUG'
    });
}

async function restartFNLB() {
    console.log('Restarting FNLB...');
    await fnlb.stop();
    await startFNLB();
}

export default async function handler(req, res) {
    await startFNLB();
    res.status(200).json({ message: 'FNLB started successfully!' });
}
