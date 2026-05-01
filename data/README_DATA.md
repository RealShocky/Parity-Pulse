# Parity Pulse Team USA Public Aggregate Dataset

Generated: 2026-04-30

This bundle is designed for the Team USA x Google Cloud Hackathon project **Parity Pulse**. It uses public aggregate Team USA data and public NOAA climate-region context. It intentionally excludes athlete names, athlete images, athlete profile links, finish times, specific scores, and IOC branding.

## Included files
- teamusa_2024_medals_by_sport_aggregate.csv
- teamusa_2024_program_medal_totals.csv
- teamusa_2024_program_summary_aggregate.csv
- teamusa_2024_hometown_highlights_aggregate.csv
- noaa_state_climate_regions_public.csv
- teamusa_source_provenance.json
- compliance_checklist.csv
- data_dictionary.csv
- optional_teamusa_browser_aggregate_extractor.js

## Compliance posture
No athlete names, no athlete images or likenesses, no profile URLs or bios, no finish times, no specific scores or points, no IOC marks or branding, Team USA scope only, aggregate rows only.

## Recommended app import order
1. teamusa_2024_medals_by_sport_aggregate.csv
2. teamusa_2024_program_summary_aggregate.csv
3. teamusa_2024_hometown_highlights_aggregate.csv
4. noaa_state_climate_regions_public.csv
5. teamusa_source_provenance.json

## Important caveat
Official/public roster counts can vary by publication snapshot because rosters changed before and during the Games. The summary file preserves source-specific snapshot names instead of silently reconciling them.
