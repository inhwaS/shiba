from django.shortcuts import render
from django.http import JsonResponse

def api_view(request):
    print("api_view !!");
    if request.method == 'POST':
        # handle POST request here
        return JsonResponse({'message': 'POST request received'})
    else:
        return JsonResponse({'message': 'Invalid request method'})
