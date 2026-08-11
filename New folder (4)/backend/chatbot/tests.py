from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from .services.normalization import normalize_text
from .services.spell_correction import correct_spelling
from .services.intent_detector import detect_intent
from .services.similarity import calculate_similarity

class NLPTests(TestCase):
    def test_normalization(self):
        text = "  What IS Clin   Bio Sciences??? "
        result = normalize_text(text)
        self.assertEqual(result, "what is clin biosciences")

    def test_spell_correction(self):
        text = "wat is clin bioscince"
        result = correct_spelling(text)
        self.assertEqual(result, "what is clin biosciences")
        
        text2 = "what servises you provide"
        result2 = correct_spelling(text2)
        self.assertEqual(result2, "what services you provide")

    def test_intent_detection(self):
        text = "what services do you provide"
        intent = detect_intent(text)
        self.assertEqual(intent, "SERVICES")
        
        text2 = "where are you located"
        intent2 = detect_intent(text2)
        self.assertEqual(intent2, "LOCATION")

    def test_similarity(self):
        score = calculate_similarity("what is clin biosciences", "what is clin biosciences")
        self.assertEqual(score, 1.0)

class ChatAPITests(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_valid_message(self):
        response = self.client.post('/api/chat/', {'message': 'what servises does clin bioscince provide'}, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['intent'], 'SERVICES')

    def test_empty_message(self):
        response = self.client.post('/api/chat/', {'message': '   '}, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_unknown_question(self):
        response = self.client.post('/api/chat/', {'message': 'what is the weather today?'}, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['intent'], 'UNKNOWN')
