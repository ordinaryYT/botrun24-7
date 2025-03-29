// api/fnlb.js

import { FNLB } from 'fnlb';

const fnlb = new FNLB.default();

async function startFNLB() {
    await fnlb.start({
        apiToken: 'DGfCBefvjOU-UORpSFBh8gbArVEGkKK5xb-BB7kZk8NfEFj6hiCf8v2Nefu6',
        numberOfShards: 1,
        botsPerShard: 5,
        categories: ['67c2fd571906bd75e5239684'],
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
