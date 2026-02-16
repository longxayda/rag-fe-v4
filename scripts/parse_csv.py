#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import csv
import json
import sys


def parse_csv_to_json(csv_file_path):
    """
    Parse CSV file and convert to JSON format for heritages data
    """
    heritages = []

    try:
        with open(csv_file_path, "r", encoding="utf-8") as f:
            # Read all lines
            lines = f.readlines()

            # Find the header line (should contain STT,Tên,Địa chỉ...)
            header_idx = -1
            for i, line in enumerate(lines):
                if "STT,Tên,Địa chỉ" in line:
                    header_idx = i
                    break

            if header_idx == -1:
                print("Could not find header line", file=sys.stderr)
                return []

            # Create CSV reader starting from header
            csv_content = "".join(lines[header_idx:])
            reader = csv.DictReader(csv_content.splitlines())

            heritage_id = 1
            for row in reader:
                # Skip empty rows
                stt = row.get("STT", "").strip()
                name = row.get("Tên", "").strip()

                if not stt or not name:
                    continue

                # Extract commune from address if possible
                address = row.get("Địa chỉ", "").strip()
                commune = ""
                if "xã" in address.lower():
                    # Try to extract commune name
                    parts = address.split(",")
                    for part in parts:
                        if "xã" in part.lower():
                            commune = part.strip()
                            break
                elif "phường" in address.lower():
                    parts = address.split(",")
                    for part in parts:
                        if "phường" in part.lower():
                            commune = part.strip()
                            break

                # Parse year ranked
                year_ranked = row.get("Năm xếp hạng", "").strip()
                year_ranked = (
                    int(year_ranked) if year_ranked and year_ranked.isdigit() else None
                )

                # Parse year built
                year_built = row.get("Năm xây dựng", "").strip()
                year_built = (
                    int(year_built) if year_built and year_built.isdigit() else None
                )

                heritage = {
                    "id": heritage_id,
                    "name": name,
                    "address": address,
                    "commune": commune,
                    "yearRanked": year_ranked,
                    "rankingType": row.get("Loại xếp hạng", "").strip(),
                    "yearBuilt": year_built,
                    "information": row.get("Thông tin", "").strip(),
                    "notes": row.get("Ghi chú", "").strip(),
                    "audioFile": row.get("File Audio", "").strip(),
                    "youtubeUrl": row.get("YT", "").strip(),
                    "image": "",  # Can be populated later
                }

                heritages.append(heritage)
                heritage_id += 1

        return heritages

    except Exception as e:
        print(f"Error parsing CSV: {e}", file=sys.stderr)
        import traceback

        traceback.print_exc()
        return []


def main():
    if len(sys.argv) < 2:
        print("Usage: python parse_csv.py <csv_file_path> [output_json_path]")
        sys.exit(1)

    csv_file_path = sys.argv[1]
    output_json_path = sys.argv[2] if len(sys.argv) > 2 else "output.json"

    print(f"Parsing CSV file: {csv_file_path}")
    heritages = parse_csv_to_json(csv_file_path)

    print(f"Found {len(heritages)} heritage items")

    # Write to JSON file
    with open(output_json_path, "w", encoding="utf-8") as f:
        json.dump(heritages, f, ensure_ascii=False, indent=2)

    print(f"Output written to: {output_json_path}")

    # Print first item as sample
    if heritages:
        print("\nSample (first item):")
        print(json.dumps(heritages[0], ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
