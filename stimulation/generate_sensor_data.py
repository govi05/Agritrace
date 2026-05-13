"""
IoT Sensor Data Generator
Generates synthetic datasets for FARM-AP-001 (Andhra Pradesh)
and FARM-TG-001 (Telangana) — matching Appendix A of the report.
Produces 96 readings/day over a 90-day period.
"""

import csv
import random
from datetime import datetime, timedelta

FARMS = [
    {"id": "FARM-AP-001", "lat": 16.50, "lon": 80.65, "region": "Andhra Pradesh"},
    {"id": "FARM-TG-001", "lat": 17.38, "lon": 78.48, "region": "Telangana"}
]

# 90 days, 96 readings/day = 1 every 15 minutes
DAYS           = 90
READINGS_PER_DAY = 96
VIOLATION_RATE = 0.15   # 15% of readings are non-compliant

def generate_reading(farm, timestamp, force_violation=False):
    if force_violation:
        return {
            "farm_id":       farm["id"],
            "timestamp":     timestamp.strftime("%Y-%m-%d %H:%M"),
            "soil_moisture": round(random.uniform(10, 19), 1),   # below min
            "temperature":   round(random.uniform(34, 40), 1),
            "humidity":      round(random.uniform(30, 45), 1),
            "soil_ph":       round(random.uniform(4.5, 5.4), 1), # below min
            "pesticide_ml":  round(random.uniform(10, 30), 1),   # violation
            "ndvi":          round(random.uniform(0.2, 0.5), 2),
            "latitude":      farm["lat"],
            "longitude":     farm["lon"],
            "status":        "VIOLATION"
        }
    else:
        return {
            "farm_id":       farm["id"],
            "timestamp":     timestamp.strftime("%Y-%m-%d %H:%M"),
            "soil_moisture": round(random.uniform(30, 70), 1),
            "temperature":   round(random.uniform(22, 32), 1),
            "humidity":      round(random.uniform(55, 80), 1),
            "soil_ph":       round(random.uniform(5.8, 7.5), 1),
            "pesticide_ml":  0,
            "ndvi":          round(random.uniform(0.6, 0.9), 2),
            "latitude":      farm["lat"],
            "longitude":     farm["lon"],
            "status":        "COMPLIANT"
        }

def generate_dataset():
    all_rows = []
    start = datetime(2026, 5, 1, 0, 0)
    interval = timedelta(minutes=15)

    for farm in FARMS:
        current = start
        for day in range(DAYS):
            for reading in range(READINGS_PER_DAY):
                force_v = random.random() < VIOLATION_RATE
                row = generate_reading(farm, current, force_v)
                all_rows.append(row)
                current += interval

    # Write to CSV
    filename = "agritrace_simulation_data.csv"
    fieldnames = ["farm_id","timestamp","soil_moisture","temperature",
                  "humidity","soil_ph","pesticide_ml","ndvi",
                  "latitude","longitude","status"]

    with open(filename, "w", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(all_rows)

    print(f"Generated {len(all_rows)} records → {filename}")
    print(f"Farms: {[f['id'] for f in FARMS]}")
    print(f"Period: {DAYS} days | {READINGS_PER_DAY} readings/day | {VIOLATION_RATE*100}% violation rate")

if __name__ == "__main__":
    generate_dataset()
