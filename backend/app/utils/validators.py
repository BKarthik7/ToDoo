def validate_todo(data):
    return 'title' in data and isinstance(data['title'], str) and len(data['title']) > 0
