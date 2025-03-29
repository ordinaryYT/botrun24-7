addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  // Importing FNLB from a CDN (you can use Skypack or another CDN)
  const FNLB = await import('https://cdn.skypack.dev/fnlb');

  const fnlb = new FNLB.default();

  // Start FNLB function
  async function startFNLB() {
    try {
      await fnlb.start({
        apiToken: 'DGfCBefvjOU-UORpSFBh8gbArVEGkKK5xb-BB7kZk8NfEFj6hiCf8v2Nefu6',
        numberOfShards: 1,
        botsPerShard: 5,
        categories: ['67c2fd571906bd75e5239684'],
        logLevel: 'DEBUG',
      });
    } catch (err) {
      return new Response('Error starting FNLB: ' + err.message, { status: 500 });
    }
    return new Response('FNLB started successfully!', { status: 200 });
  }

  // Restart FNLB function
  async function restartFNLB() {
    console.log('Restarting FNLB...');
    try {
      await fnlb.stop();
      await startFNLB();
    } catch (err) {
      return new Response('Error restarting FNLB: ' + err.message, { status: 500 });
    }
  }

  // If the request is a GET, start FNLB
  if (request.method === 'GET') {
    return await startFNLB();
  }

  return new Response('Invalid request method', { status: 405 });
}
