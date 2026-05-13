/**
 * Anomaly Filter — Layer 2, Stage 1
 * Applies range checks to raw sensor readings.
 * Invalid readings are discarded and logged.
 * Valid readings proceed to thresholdCheck.js
 */

const VALID_RANGES = {
  soilMoisture:  { min: 0,   max: 100  },
  temperature:   { min: -10, max: 60   },
  humidity:      { min: 0,   max: 100  },
  soilPH:        { min: 0,   max: 14   },
  pesticideML:   { min: 0,   max: 500  },
  ndvi:          { min: -1,  max: 1    }
};

const discardLog = [];

function isInRange(value, min, max) {
  return value >= min && value <= max;
}

function filterReading(reading) {
  const errors = [];

  for (const [param, range] of Object.entries(VALID_RANGES)) {
    if (reading[param] !== undefined) {
      if (!isInRange(reading[param], range.min, range.max)) {
        errors.push(`${param}: ${reading[param]} out of range [${range.min}, ${range.max}]`);
      }
    }
  }

  if (errors.length > 0) {
    discardLog.push({
      farmId: reading.farmId,
      timestamp: reading.timestamp,
      errors,
      discardedAt: new Date().toISOString()
    });
    console.log(`[ANOMALY FILTER] Discarded reading from ${reading.farmId}:`, errors);
    return null;   // invalid — discard
  }

  return reading; // valid — proceed
}

function getDiscardLog() {
  return discardLog;
}

module.exports = { filterReading, getDiscardLog };
