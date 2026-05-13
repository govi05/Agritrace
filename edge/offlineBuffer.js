/**
 * Offline Buffer — Layer 2, Stage 4
 * Queues enriched payloads when blockchain is unreachable.
 * Flushes in chronological order when connection restores.
 */

const queue = [];
let isOnline = true;

function setOnlineStatus(status) {
  isOnline = status;
  if (status) {
    console.log('[BUFFER] Connection restored — flushing queue...');
    flushQueue();
  }
}

function addToBuffer(payload) {
  queue.push({
    ...payload,
    bufferedAt: new Date().toISOString()
  });
  console.log(`[BUFFER] Queued payload from ${payload.farmId}. Queue size: ${queue.length}`);
}

async function flushQueue(submitFn) {
  if (!submitFn) return;

  // Sort by timestamp to preserve chronological order
  queue.sort((a, b) => new Date(a.when) - new Date(b.when));

  while (queue.length > 0) {
    const payload = queue.shift();
    try {
      await submitFn(payload);
      console.log(`[BUFFER] Flushed payload from ${payload.farmId}`);
    } catch (err) {
      // Put it back if still failing
      queue.unshift(payload);
      console.error('[BUFFER] Flush failed, re-queuing:', err.message);
      break;
    }
  }
}

function getQueueSize() { return queue.length; }
function getQueue()     { return [...queue]; }

module.exports = { addToBuffer, flushQueue, setOnlineStatus, getQueueSize, getQueue };
