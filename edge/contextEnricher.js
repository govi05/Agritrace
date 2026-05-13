/**
 * Context Enricher — Layer 2, Stage 3
 * Adds what / when / where / why metadata to every
 * valid reading before it is submitted to the blockchain.
 */

function enrichPayload(reading, complianceResult) {
  return {
    // Original sensor data
    ...reading,

    // WHAT — what type of reading this is
    what: classifyActivity(reading),

    // WHEN — precise UTC timestamp
    when: reading.timestamp || new Date().toISOString(),

    // WHERE — GPS coordinates from the reading
    where: {
      latitude:  reading.latitude,
      longitude: reading.longitude,
      farmId:    reading.farmId
    },

    // WHY — what triggered this reading and compliance outcome
    why: {
      trigger:      reading.trigger || 'SCHEDULED_POLL',
      compliant:    complianceResult.compliant,
      violations:   complianceResult.violations,
      severity:     complianceResult.severityLevel
    },

    // Metadata
    enrichedAt:   new Date().toISOString(),
    layerVersion: 'AgriTrace-Edge-v1.0'
  };
}

function classifyActivity(reading) {
  if (reading.pesticideML > 0)      return 'CHEMICAL_APPLICATION';
  if (reading.soilMoisture < 25)    return 'IRRIGATION_NEEDED';
  if (reading.ndvi < 0.4)           return 'CROP_STRESS_DETECTED';
  return 'ROUTINE_MONITORING';
}

module.exports = { enrichPayload };
