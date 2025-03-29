(async () => {
    const FNLB = await import('fnlb');

    const fnlb = new FNLB.default();

    async function startFNLB() {
        await fnlb.start({
            apiToken: 'API Token', // Replace with your actual API token
            numberOfShards: 1,
            botsPerShard: 5,
            categories: ['category ID'], // Replace with actual category ID
            logLevel: 'DEBUG'
        });
    }

    async function restartFNLB() {
        console.log('Restarting FNLB...');
        await fnlb.stop();
        await startFNLB();
    }

    await startFNLB();

    setInterval(restartFNLB, 3600000);
})();
