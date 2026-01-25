#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import json
import re
import sys


def format_text_with_markdown(text):
    """
    Format text with markdown for better readability
    Add bold to titles and important sections
    """
    if not text or not text.strip():
        return text

    # Replace common separators with proper line breaks
    text = text.replace("​", "\n")  # Zero-width space to newline
    text = text.replace("  ", " ")  # Double space to single

    # Split into paragraphs
    paragraphs = []
    current = []

    for line in text.split("\n"):
        line = line.strip()
        if not line:
            if current:
                paragraphs.append(" ".join(current))
                current = []
        else:
            current.append(line)

    if current:
        paragraphs.append(" ".join(current))

    # Format each paragraph
    formatted = []

    for para in paragraphs:
        # Skip empty
        if not para.strip():
            continue

        # All caps titles (main sections)
        if re.match(
            r"^[A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ\s:,\-–]{15,}$",
            para,
        ):
            formatted.append(f"\n## **{para}**\n")

        # Title with colon (section headers)
        elif (
            re.match(
                r"^[A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ][a-zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ\s]+:(?:\s|$)",
                para,
            )
            and len(para) < 100
        ):
            formatted.append(f"\n### **{para}**\n")

        # Year ranges in parentheses (like Thời kỳ kháng chiến chống Pháp (1945-1954))
        elif re.search(r"\(\d{4}\s*[-–]\s*\d{4}\)", para) and len(para) < 100:
            formatted.append(f"\n### **{para}**\n")

        # Short paragraphs that look like titles (< 80 chars, starts with capital)
        elif (
            len(para) < 80
            and re.match(
                r"^[A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ]",
                para,
            )
            and not para.endswith(".")
        ):
            formatted.append(f"\n### **{para}**\n")

        # Normal paragraph - add inline formatting
        else:
            # Bold important terms
            para = re.sub(
                r"\b(Tổng quan|Lịch sử|Kiến trúc|Giá trị|Ý nghĩa|Kết luận|Hoạt động)\b",
                r"**\1**",
                para,
            )
            para = re.sub(r"\b(Quốc gia đặc biệt|Quốc gia|Cấp tỉnh)\b", r"**\1**", para)
            para = re.sub(r"\bNăm (\d{4})\b", r"**Năm \1**", para)
            para = re.sub(r"\b(Di tích|Lễ hội|Chùa|Đền|Miếu|Đình)\b", r"**\1**", para)

            formatted.append(para)

    # Join with proper spacing
    result = "\n\n".join(formatted)

    # Clean up multiple newlines
    result = re.sub(r"\n{3,}", "\n\n", result)

    return result.strip()


def format_heritage_data(input_file, output_file):
    """
    Read heritage JSON, format with markdown, and save
    """
    try:
        # Read input
        with open(input_file, "r", encoding="utf-8") as f:
            heritages = json.load(f)

        print(f"📖 Đọc {len(heritages)} di sản từ {input_file}")

        # Format each heritage
        formatted_count = 0
        for i, heritage in enumerate(heritages, 1):
            if heritage.get("information"):
                original = heritage["information"]
                formatted = format_text_with_markdown(original)

                if formatted != original:
                    heritage["information"] = formatted
                    formatted_count += 1

                if i <= 3:  # Show first 3 as examples
                    print(f"\n📝 Mẫu {i}: {heritage['name']}")
                    print(f"   Trước: {len(original)} ký tự")
                    print(f"   Sau: {len(formatted)} ký tự")
                    print(f"   Mẫu: {formatted[:100]}...")

        # Write output
        with open(output_file, "w", encoding="utf-8") as f:
            json.dump(heritages, f, ensure_ascii=False, indent=2)

        print(f"\n✅ Đã format {formatted_count}/{len(heritages)} di sản")
        print(f"💾 Lưu vào: {output_file}")

        return True

    except Exception as e:
        print(f"❌ Lỗi: {e}")
        import traceback

        traceback.print_exc()
        return False


def main():
    """
    Main function
    """
    if len(sys.argv) < 2:
        print("Sử dụng: python format_markdown.py <input_file> [output_file]")
        print("\nVí dụ:")
        print("  python format_markdown.py src/data/heritages.json")
        print(
            "  python format_markdown.py src/data/heritages.json src/data/heritages_formatted.json"
        )
        sys.exit(1)

    input_file = sys.argv[1]
    output_file = sys.argv[2] if len(sys.argv) > 2 else input_file

    print("╔══════════════════════════════════════════════════════════════╗")
    print("║          FORMAT MARKDOWN CHO DI SẢN VĂN HÓA                  ║")
    print("╚══════════════════════════════════════════════════════════════╝")
    print()

    success = format_heritage_data(input_file, output_file)

    if success:
        print("\n✨ Hoàn thành!")
        print("\nĐã thêm markdown format:")
        print("  • ## **Tiêu đề chính**")
        print("  • ### **Tiêu đề phụ**")
        print("  • **Từ khóa quan trọng**")
        print("  • Ngắt đoạn rõ ràng")
        print("\n📝 Người dùng có thể chỉnh sửa markdown sau này!")
        print("\n🚀 Deploy để áp dụng thay đổi!")
    else:
        print("\n❌ Thất bại!")
        sys.exit(1)


if __name__ == "__main__":
    main()
