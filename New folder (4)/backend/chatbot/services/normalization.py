import re

def normalize_text(text):
    """
    Normalizes the input text:
    - Lowercase
    - Remove extra spaces
    - Remove punctuation (except maybe basic ones, but we strip mostly)
    - Normalize common company abbreviations
    """
    if not text:
        return ""
    
    # Lowercase
    text = text.lower()
    
    # Remove punctuation using regex
    text = re.sub(r'[^\w\s]', '', text)
    
    # Normalize common abbreviations
    text = text.replace("bio sciences", "biosciences")
    
    # Remove extra spaces
    text = " ".join(text.split())
    
    return text
