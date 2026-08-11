INTENT_KEYWORDS = {
    "GREETING": ["hello", "hi", "hey", "greetings", "good morning", "good afternoon"],
    "COMPANY_INFO": ["company", "about", "who are you", "what is clin biosciences", "tell me about"],
    "SERVICES": ["service", "services", "what do you do", "what do you provide", "solutions", "offerings", "work"],
    "MISSION": ["mission", "goal", "objective"],
    "VISION": ["vision", "future", "aim"],
    "CONTACT": ["contact", "email", "phone", "reach you", "get in touch", "call", "message"],
    "LOCATION": ["location", "located", "where are you", "address", "headquarters", "office"],
    "INDUSTRIES": ["industries", "sectors", "fields", "who do you work with"],
    "CAREERS": ["career", "careers", "jobs", "hiring", "work for you", "vacancies"],
    "THANK_YOU": ["thank you", "thanks", "appreciate"],
    "FAQ": ["faq", "frequently asked questions"]
}

def detect_intent(text):
    """
    Detects the intent based on exact or partial keyword matches.
    """
    best_intent = "UNKNOWN"
    max_matches = 0
    
    text_words = set(text.split())
    
    for intent, keywords in INTENT_KEYWORDS.items():
        matches = 0
        for keyword in keywords:
            if keyword in text:
                matches += 2 # Higher weight for full phrase match
            
            # Check individual word matches if keyword is multi-word
            kw_words = set(keyword.split())
            if kw_words.issubset(text_words):
                matches += 1
                
        if matches > max_matches:
            max_matches = matches
            best_intent = intent
            
    if max_matches > 0:
        return best_intent
        
    return "UNKNOWN"
