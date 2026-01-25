#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script để thêm tọa độ GPS cho file heritages.json
"""

import json
import random

# Tọa độ trung tâm và các tọa độ tham khảo
CA_MAU_CENTER = {"lat": 9.1766, "lng": 105.1500}
BAC_LIEU_CENTER = {"lat": 9.2940, "lng": 105.7300}

# Tọa độ tham khảo đã biết
KNOWN_COORDINATES = {
    "Chùa Kos Thum": {"lat": 9.4889, "lng": 105.4178},
    "Di tích chùa KosThum": {"lat": 9.4889, "lng": 105.4178},
    "Đền thờ Trần Quang Diệu": {"lat": 9.3892, "lng": 105.4756},
    "Hòn Đá Bạc": {"lat": 9.0433, "lng": 104.7694},
    "Chùa Xiêm Cán": {"lat": 9.2781, "lng": 105.7411},
    "Nhà Công tử Bạc Liêu": {"lat": 9.2895, "lng": 105.7247},
}

# Mapping xã/phường với tọa độ ước tính
COMMUNE_COORDINATES = {
    # Bạc Liêu
    "xã Ninh Thạnh Lợi": {"lat": 9.4889, "lng": 105.4178},  # Khu vực Chùa Kos Thum
    "Xã Ninh Thanh Lợi": {"lat": 9.4889, "lng": 105.4178},
    "xã Phong Thạnh": {"lat": 9.3892, "lng": 105.4756},
    "xã Phong Hiệp": {"lat": 9.3892, "lng": 105.4756},
    "xã Phước Long": {"lat": 9.3200, "lng": 105.5800},
    "xã Vĩnh Phú Đông": {"lat": 9.3200, "lng": 105.5800},
    "xã Vĩnh Phước": {"lat": 9.3150, "lng": 105.5900},
    "xã Vĩnh Phú Tây": {"lat": 9.3100, "lng": 105.5850},
    "xã Long Điền Đông": {"lat": 9.3500, "lng": 105.6200},
    "xã Long Điền Tây": {"lat": 9.3450, "lng": 105.6100},
    "xã Long Điền": {"lat": 9.3480, "lng": 105.6150},
    "xã Hưng Phú": {"lat": 9.3300, "lng": 105.5700},
    "Phường 3": {"lat": 9.2900, "lng": 105.7250},  # Trung tâm TP Bạc Liêu
    "Phường 7": {"lat": 9.2920, "lng": 105.7280},
    "Phường 1": {"lat": 9.2940, "lng": 105.7300},
    "Phường 2": {"lat": 9.2950, "lng": 105.7320},
    "Phường 5": {"lat": 9.2960, "lng": 105.7340},
    "TP Bạc Liêu": {"lat": 9.2940, "lng": 105.7300},
    "thành phố Bạc Liêu": {"lat": 9.2940, "lng": 105.7300},
    
    # Cà Mau
    "TP Cà Mau": {"lat": 9.1766, "lng": 105.1500},
    "thành phố Cà Mau": {"lat": 9.1766, "lng": 105.1500},
    "xã Trần Văn Thời": {"lat": 9.0433, "lng": 104.7694},  # Khu vực Hòn Đá Bạc
    "huyện Trần Văn Thời": {"lat": 9.0433, "lng": 104.7694},
    "xã Đất Mũi": {"lat": 8.6050, "lng": 104.7231},
    "Mũi Cà Mau": {"lat": 8.6050, "lng": 104.7231},
    "xã Năm Căn": {"lat": 8.7500, "lng": 104.9800},
    "xã U Minh": {"lat": 9.3500, "lng": 105.0500},
    "xã Phú Tân": {"lat": 9.1500, "lng": 105.1800},
    "xã Tân Thành": {"lat": 9.1600, "lng": 105.1600},
}

def get_coordinate_for_heritage(heritage):
    """Tính toán tọa độ cho một di sản"""
    name = heritage.get("name", "")
    commune = heritage.get("commune", "")
    address = heritage.get("address", "")
    
    # Kiểm tra tọa độ đã biết theo tên
    for known_name, coords in KNOWN_COORDINATES.items():
        if known_name.lower() in name.lower():
            return coords
    
    # Kiểm tra theo commune
    for commune_name, coords in COMMUNE_COORDINATES.items():
        if commune_name in commune or commune_name in address:
            # Thêm một chút biến động ngẫu nhiên (±0.01 độ ~ 1km)
            return {
                "lat": round(coords["lat"] + random.uniform(-0.01, 0.01), 4),
                "lng": round(coords["lng"] + random.uniform(-0.01, 0.01), 4)
            }
    
    # Nếu không tìm thấy, sử dụng tọa độ trung tâm dựa vào tỉnh trong address
    if "Bạc Liêu" in address or "Bạc Liêu" in commune:
        base = BAC_LIEU_CENTER
    elif "Cà Mau" in address or "Cà Mau" in commune:
        base = CA_MAU_CENTER
    else:
        # Mặc định dùng Bạc Liêu
        base = BAC_LIEU_CENTER
    
    # Thêm biến động ngẫu nhiên
    return {
        "lat": round(base["lat"] + random.uniform(-0.05, 0.05), 4),
        "lng": round(base["lng"] + random.uniform(-0.05, 0.05), 4)
    }

def main():
    input_file = "/Users/nguyennt/Documents/rag-fe/src/data/heritages.json"
    output_file = "/Users/nguyennt/Documents/rag-fe/src/data/heritages_with_coords.json"
    
    # Đọc file JSON
    with open(input_file, 'r', encoding='utf-8') as f:
        heritages = json.load(f)
    
    # Thêm tọa độ cho mỗi di sản
    for heritage in heritages:
        coords = get_coordinate_for_heritage(heritage)
        heritage["lat"] = coords["lat"]
        heritage["lng"] = coords["lng"]
    
    # Ghi file mới
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(heritages, f, ensure_ascii=False, indent=2)
    
    print(f"✅ Đã thêm tọa độ GPS cho {len(heritages)} di sản")
    print(f"✅ File mới: {output_file}")
    
    # Hiển thị một vài ví dụ
    print("\n📍 Ví dụ một số di sản:")
    for i in range(min(5, len(heritages))):
        h = heritages[i]
        print(f"  {h['id']}. {h['name']}")
        print(f"     📌 {h.get('commune', 'N/A')}")
        print(f"     🌍 Lat: {h['lat']}, Lng: {h['lng']}")

if __name__ == "__main__":
    main()

