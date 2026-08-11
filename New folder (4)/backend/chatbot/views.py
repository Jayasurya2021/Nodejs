from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .services.chatbot_service import process_message

class ChatAPIView(APIView):
    def post(self, request):
        message = request.data.get('message', '').strip()
        
        if not message:
            return Response(
                {
                    "success": False, 
                    "error": "Message cannot be empty."
                }, 
                status=status.HTTP_400_BAD_REQUEST
            )
            
        if len(message) > 500:
            return Response(
                {
                    "success": False, 
                    "error": "Message is too long."
                }, 
                status=status.HTTP_400_BAD_REQUEST
            )
            
        try:
            # Process the message through our NLP pipeline
            result = process_message(message)
            return Response(result, status=status.HTTP_200_OK)
        except Exception as e:
            # Handle unexpected errors
            return Response(
                {
                    "success": False,
                    "error": "An internal error occurred while processing your message."
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
