addEventListener("fetch", event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  const FNLB = await import('fnlb');

  const fnlb = new FNLB.default();

  async function startFNLB() {
    await fnlb.start({
      apiToken: 'DGfCBefvjOU-UORpSFBh8gbArVEGkKK5xb-BB7kZk8NfEFj6hiCf8v2Nefu6',  // Replace with your API Token
      numberOfShards: 1,
      botsPerShard: 5,
      categories: ['67c2fd571906bd75e5239684'],  // Replace with your category ID
      logLevel: 'DEBUG',
    });
  }

  async function restartFNLB() {
    console.log('Restarting FNLB...');
    await fnlb.stop();
    await startFNLB();
  }

  await startFNLB();

  setInterval(restartFNLB, 3600000); // Restart every hour

  return new Response('FNLB is running', { status: 200 });
}

   

