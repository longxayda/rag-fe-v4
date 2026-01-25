#!/usr/bin/env python3
import json
import re

def fix_markdown(text):
    """Fix markdown formatting issues in the text"""
    if not text:
        return text
    
    # Step 1: Fix wrong bold syntax: ****text**** or ******text**** -> **text**
    text = re.sub(r'\*{4,}([^\*]+)\*{4,}', r'**\1**', text)
    
    # Step 2: Fix headings with multiple asterisks
    text = re.sub(r'###\s+\*+', r'## ', text)
    
    # Step 3: Fix list items that should have bullet points
    # Pattern: Start of line or after newlines, followed by text with colon
    list_items = [
        'Chánh điện:',
        'Phước xá:',
        'Trường học:',
        'Tăng xá:',
        'Bảy ngôi tháp:',
        'Đào tạo cán bộ',
        'Giúp nước bạn',
        'Nuôi giấu cán bộ',
        'Nơi hoạt động bí mật',
        'Căn cứ cách mạng',
        'Nơi cung cấp',
        'Nơi tổ chức tuyên truyền',
        'Giáo dục:',
        'Xóa đói giảm nghèo:',
        'Xây dựng nông thôn',
    ]
    
    for item in list_items:
        # Add list marker if not already present
        text = re.sub(f'([^\n-])({re.escape(item)})', r'\1\n\n- \2', text)
    
    # Step 4: Add spacing around sections
    # Make sure section titles have proper breaks
    text = re.sub(r'([a-zủúửửụ\.])([A-ZĐẤẾỐỤ][a-zủúửửụ]+\s+quan)', r'\1\n\n## \2', text)
    text = re.sub(r'([a-zủúửửụ\.])(Kiến trúc)', r'\1\n\n## \2', text)
    text = re.sub(r'([a-zủúửửụ\.])(Lịch sử)', r'\1\n\n## \2', text)
    text = re.sub(r'([a-zủúửửụ\.])(Lễ hội)', r'\1\n\n## \2', text)
    text = re.sub(r'([a-zủúửửụ\.])(Hoạt động)', r'\1\n\n## \2', text)
    text = re.sub(r'([a-zủúửửụ\.])(Ý nghĩa)', r'\1\n\n## \2', text)
    text = re.sub(r'([a-zủúửửụ\.])(Giá trị)', r'\1\n\n## \2', text)
    text = re.sub(r'([a-zủúửửụ\.])(Kết luận)', r'\1\n\n## \2', text)
    text = re.sub(r'([a-zủúửửụ\.])(Di tích)', r'\1\n\n## \2', text)
    
    # Step 5: Clean up multiple consecutive newlines (more than 2)
    text = re.sub(r'\n{3,}', r'\n\n', text)
    
    # Step 6: Fix cases where bold ends and section begins:  **Textotherstuff -> **Text\n\notherstuff
    text = re.sub(r'\*\*([A-ZĐẤẾỐỤ][a-zủúửửụ]+)\s+và\s+', r'**\1** và ', text)
    text = re.sub(r'\*\*([^*]+)\*\*([A-ZĐẤẾỐỤ][a-z])', r'**\1**\n\n## \2', text)
    
    return text

# Read the JSON file
with open('/Users/nguyennt/Documents/rag-fe/src/data/heritages.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Fix the first 5 items
for i in range(min(5, len(data))):
    if 'information' in data[i] and data[i]['information']:
        print(f"Fixing heritage item {data[i]['id']}: {data[i]['name']}")
        data[i]['information'] = fix_markdown(data[i]['information'])

# Write back to file
with open('/Users/nguyennt/Documents/rag-fe/src/data/heritages.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print("\nDone! Fixed markdown formatting for the first 5 heritage items.")

