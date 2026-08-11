def levenshtein_distance(s1, s2):
    if len(s1) < len(s2):
        return levenshtein_distance(s2, s1)
    if len(s2) == 0:
        return len(s1)
    
    previous_row = range(len(s2) + 1)
    for i, c1 in enumerate(s1):
        current_row = [i + 1]
        for j, c2 in enumerate(s2):
            insertions = previous_row[j + 1] + 1
            deletions = current_row[j] + 1
            substitutions = previous_row[j] + (c1 != c2)
            current_row.append(min(insertions, deletions, substitutions))
        previous_row = current_row
    
    return previous_row[-1]

def calculate_similarity(text1, text2):
    """
    Calculates a basic similarity score between 0 and 1.
    Uses word overlap as a simple metric.
    """
    words1 = set(text1.split())
    words2 = set(text2.split())
    
    if not words1 or not words2:
        return 0.0
        
    intersection = words1.intersection(words2)
    union = words1.union(words2)
    
    # Jaccard similarity
    return len(intersection) / len(union)

def find_best_intent_by_similarity(text, intent_keywords, threshold=0.4):
    """
    Fallback method to find intent using similarity if exact match fails.
    """
    best_intent = "UNKNOWN"
    max_score = 0.0
    
    for intent, keywords in intent_keywords.items():
        for keyword in keywords:
            score = calculate_similarity(text, keyword)
            if score > max_score:
                max_score = score
                best_intent = intent
                
    if max_score >= threshold:
        return best_intent
        
    return "UNKNOWN"
