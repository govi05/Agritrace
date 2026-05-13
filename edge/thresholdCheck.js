/**
 * Threshold Check — Layer 2, Stage 2
 * Evaluates readings against NPOP compliance thresholds.
 * Flags violations but does NOT discard — violations are
 * committed to the blockchain for audit purposes.
 */

// NPOP compliance thresholds
const NPOP_THRESHOLDS = {
  maxPesticideML:   0,
  maxSoilPH:        8.0,
  minSoilPH:        5.5,
  maxTemperature:   45,
  minSoilMoisture:  20
};

function checkThresholds(reading) {
  const violations = [];

  if (reading.pesticideML > NPOP_THRESHOLDS.maxPesticideML) {
    violations.push({
      type: 'MAJOR',
      param: 'pesticideML',
      value: reading.pesticideML,
      limit: NPOP_THRESHOLDS.maxPesticideML,
      message: 'Pesticide usage detected — NPOP violation'
    });
  }

  if (reading.soilPH > NPOP_THRESHOLDS.maxSoilPH || reading.soilPH < NPOP_THRESHOLDS.minSoilPH) {
    const pctOver = Math.abs(reading.soilPH - NPOP_THRESHOLDS.maxSoilPH) / NPOP_THRESHOLDS.maxSoilPH;
    violations.push({
      type: pctOver > 0.10 ? 'MAJOR' : 'MINOR',
      param: 'soilPH',
      value: reading.soilPH,
      message: 'Soil pH outside acceptable range'
    });
  }

  if (reading.soilMoisture < NPOP_THRESHOLDS.minSoilMoisture) {
    violations.push({
      type: 'MINOR',
      param: 'soilMoisture',
      value: reading.soilMoisture,
      message: 'Soil moisture below minimum threshold'
    });
  }

  return {
    compliant: violations.length === 0,
    violations,
    severityLevel: violations.some(v => v.type === 'MAJOR') ? 'MAJOR' : 
                   violations.length > 0 ? 'MINOR' : 'NONE'
  };
}

module.exports = { checkThresholds, NPOP_THRESHOLDS };
