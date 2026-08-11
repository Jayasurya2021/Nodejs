from .normalization import normalize_text
from .spell_correction import correct_spelling
from .intent_detector import detect_intent, INTENT_KEYWORDS
from .similarity import find_best_intent_by_similarity
from ..data.company_knowledge import COMPANY_KNOWLEDGE

def generate_response(intent):
    """
    Retrieves the appropriate response from the knowledge base based on the detected intent.
    """
    if intent == "GREETING":
        return "Hello! 👋 Welcome to Clin Biosciences. How can I help you today?"
        
    elif intent == "COMPANY_INFO" or intent == "ABOUT":
        info = COMPANY_KNOWLEDGE["company"]
        return f"{info['name']} is {info['description']}"
        
    elif intent == "MISSION":
        return COMPANY_KNOWLEDGE["company"]["mission"]
        
    elif intent == "VISION":
        return COMPANY_KNOWLEDGE["company"]["vision"]
        
    elif intent == "SERVICES":
        services = COMPANY_KNOWLEDGE["services"]
        response = "Clin Biosciences provides the following services:\n"
        for s in services:
            response += f"- **{s['name']}**: {s['description']}\n"
        return response
        
    elif intent == "CONTACT":
        contact = COMPANY_KNOWLEDGE["contact"]
        return f"You can contact Clin Biosciences through:\nEmail: {contact['email']}\nPhone: {contact['phone']}\nWebsite: {contact['website']}"
        
    elif intent == "LOCATION":
        locs = COMPANY_KNOWLEDGE["locations"][0]
        regional = ", ".join(locs["regional_offices"])
        return f"Our headquarters are located in {locs['headquarters']}. We also have regional offices in {regional}."
        
    elif intent == "INDUSTRIES":
        inds = ", ".join(COMPANY_KNOWLEDGE["industries"])
        return f"We primarily work in the following industries: {inds}."
        
    elif intent == "CAREERS":
        return COMPANY_KNOWLEDGE["careers"][0]
        
    elif intent == "THANK_YOU":
        return "You're welcome! Let me know if you have any other questions."
        
    return "I'm sorry, I don't have enough information about that. You can ask me about Clin Biosciences, our services, contact details, locations, or other available information."

def process_message(message):
    """
    Coordinates the entire NLP pipeline and returns the final response.
    """
    # 1. Normalization
    normalized = normalize_text(message)
    
    # 2. Spelling Correction
    corrected = correct_spelling(normalized)
    
    # 3. Intent Detection
    intent = detect_intent(corrected)
    
    # 4. Fallback Similarity Matching if unknown
    if intent == "UNKNOWN":
        intent = find_best_intent_by_similarity(corrected, INTENT_KEYWORDS)
        
    # 5. Generate Response
    reply = generate_response(intent)
    
    return {
        "success": True,
        "intent": intent,
        "normalized_message": corrected,
        "reply": reply
    }
