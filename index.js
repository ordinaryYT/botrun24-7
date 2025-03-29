// api/fnlb.js

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  // Importing FNLB from a CDN (you can use Skypack or another CDN)
  const FNLB = await import('https://cdn.skypack.dev/fnlb');

  const fnlb = new FNLB.default();

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

  async function restartFNLB() {
    console.log('Restarting FNLB...');
    try {
      await fnlb.stop();
      await startFNLB();
    } catch (err) {
      return new Response('Error restarting FNLB: ' + err.message, { status: 500 });
    }
  }

  // Start FNLB when the request is received
  return await startFNLB();
}
