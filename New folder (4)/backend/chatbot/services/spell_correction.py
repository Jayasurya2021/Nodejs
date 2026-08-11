# Simple typo dictionary
TYPO_DICTIONARY = {
    "wat": "what",
    "servises": "services",
    "servise": "service",
    "contct": "contact",
    "locaton": "location",
    "bioscince": "biosciences",
    "biosciense": "biosciences",
    "compny": "company",
    "cn": "can",
    "u": "you"
}

def correct_spelling(text):
    """
    Corrects spelling based on a simple typo dictionary.
    Replaces matched words with their corrected counterparts.
    """
    words = text.split()
    corrected_words = []
    
    for word in words:
        if word in TYPO_DICTIONARY:
            corrected_words.append(TYPO_DICTIONARY[word])
        else:
            corrected_words.append(word)
            
    return " ".join(corrected_words)
