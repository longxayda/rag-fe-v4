#!/usr/bin/env python3
import json
import re

def fix_markdown(text):
    """Fix markdown formatting issues in the text"""
    if not text:
        return text
    
    # Step 1: Fix wrong bold syntax: ****text**** or ******text**** -> **text**
    text = re.sub(r'\*{4,}([^\*]+)\*{4,}', r'**\1**', text)
    
    # Step 2: Fix headings - ### ******Di tích**** -> ## Di tích
    text = re.sub(r'###\s+\*+([^\*]+)\*+', r'## \1', text)
    
    # Step 3: Add proper paragraph breaks and section formatting
    # Add breaks before major sections when they follow text without proper spacing
    section_titles = [
        ('Tổng quan', 'Tổng quan'),
        ('Kiến trúc và công trình', 'Kiến trúc và công trình'),
        ('Lịch sử hình thành', 'Lịch sử hình thành'),
        ('Lịch sử và các vị trụ trì', 'Lịch sử và các vị trụ trì'),
        ('Vai trò trong lịch sử cách mạng', 'Vai trò trong lịch sử cách mạng'),
        ('Thời kỳ kháng chiến chống Pháp', 'Thời kỳ kháng chiến chống Pháp'),
        ('Thời kỳ kháng chiến chống Mỹ', 'Thời kỳ kháng chiến chống Mỹ'),
        ('Công nhận di tích', 'Công nhận di tích'),
        ('Hoạt động văn hóa và tôn giáo', 'Hoạt động văn hóa và tôn giáo'),
        ('Lễ hội truyền thống', 'Lễ hội truyền thống'),
        ('Đua ghe Ngo', 'Đua ghe Ngo'),
        ('Hoạt động xã hội hiện tại', 'Hoạt động xã hội hiện tại'),
        ('Vị trí địa lý và cảnh quan', 'Vị trí địa lý và cảnh quan'),
        ('Ý nghĩa và giá trị di sản', 'Ý nghĩa và giá trị di sản'),
        ('Giá trị lịch sử', 'Giá trị lịch sử'),
        ('Giá trị văn hóa', 'Giá trị văn hóa'),
        ('Giá trị kiến trúc nghệ thuật', 'Giá trị kiến trúc nghệ thuật'),
        ('Giá trị giáo dục', 'Giá trị giáo dục'),
        ('Giá trị du lịch', 'Giá trị du lịch'),
        ('Kết luận', 'Kết luận'),
    ]
    
    for _, title in section_titles:
        # Add section breaks when title appears after text (not at start or after newlines)
        text = re.sub(f'([a-zủúửửụ\\.])({re.escape(title)})', r'\1\n\n## \2\n\n', text)
    
    # Step 4: Fix list items - add proper bullet points
    list_prefixes = [
        'Chánh điện:',
        'Phước xá:',
        'Trường học:',
        'Tăng xá:',
        'Bảy ngôi tháp:',
        'Đào tạo cán bộ quân sự',
        'Đào tạo cán bộ lãnh đạo',
        'Giúp nước bạn',
        'Nuôi giấu cán bộ',
        'Nơi hoạt động bí mật',
        'Căn cứ cách mạng vững chắc',
        'Nơi cung cấp của cải',
        'Nơi tổ chức tuyên truyền',
        'Tết Chol Chnam Thmay:',
        'Lễ Sen Dolta:',
        'Lễ dân y Kathina:',
        'Giáo dục:',
        'Xóa đói giảm nghèo:',
        'Xây dựng nông thôn mới:',
    ]
    
    for prefix in list_prefixes:
        # Add list marker if appearing after text (not already in a list)
        text = re.sub(f'([^\\n\\-])({re.escape(prefix)})', r'\1\n- \2', text)
    
    # Step 5: Fix "bao gồm:" pattern to be followed by list
    text = re.sub(r'bao gồm:\s+([A-ZĐẤẾỐỤ])', r'bao gồm:\n\n- \1', text)
    
    # Step 6: Clean up excessive newlines (more than 2 consecutive)
    text = re.sub(r'\n{3,}', r'\n\n', text)
    
    # Step 7: Fix bold formatting that wraps around newlines
    # Remove patterns like **text\nmore but keep the bold
    text = re.sub(r'\*\*([^\*]+?)\s+và\s+', r'**\1** và ', text)
    
    return text

# Read the JSON file
with open('/Users/nguyennt/Documents/rag-fe/src/data/heritages.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Fix the first 5 items
for i in range(min(5, len(data))):
    if 'information' in data[i] and data[i]['information']:
        print(f"Fixing heritage item {data[i]['id']}: {data[i]['name']}")
        orig_len = len(data[i]['information'])
        data[i]['information'] = fix_markdown(data[i]['information'])
        new_len = len(data[i]['information'])
        print(f"  Length changed: {orig_len} -> {new_len}")

# Write back to file
with open('/Users/nguyennt/Documents/rag-fe/src/data/heritages.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print("\n✅ Done! Fixed markdown formatting for the first 5 heritage items.")

