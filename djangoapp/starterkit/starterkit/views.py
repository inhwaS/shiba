from django.shortcuts import render
from django.http import JsonResponse
from django.http import HttpResponse
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
import time

def api_view(request):
    print("======================== api_view ===============================")
    json_content = voiceTotext('5gvnf-qo2uz.wav')
    return HttpResponse(json_content)

def video_view(request):
    print("======================== video_view ===============================")
    time.sleep(3)
    print("video view::: show video")
    return HttpResponse("success")

import speech_recognition as sr
from os import path
import json


global content

#audio -> text
#the audio should be .wav

def voiceTotext(file_name):
    voice_file = path.join(path.dirname(path.realpath(__file__)),file_name)

    r = sr.Recognizer()

    with sr.AudioFile(voice_file) as source:
        audio = r.record(source)

    try:
        content = r.recognize_google(audio)  #default: en-US
        print("Google Speech Recognition:" + content)
    except sr.UnknownValueError:
        print("Google Speech Recognition could not understand audio")
    except sr.RequestError as e:
        print("Google Speech Recognition error; {0}".format(e))


    # Filter out stop words
    stop_words = set(stopwords.words('english'))
    filtered_content = [word for word in content.split() if word.lower() not in stop_words]

    real_content = {}
    real_content['content'] = ' '.join(filtered_content)  # Convert the list back to string

    # print(real_content['content'])
    # {'content':'the knife was the most commonly used tool
    #             to sharpen the wooden writing instrument known
    #             as the pencil which historians believe was invented
    #             in the 15th or 16th century but whittling the Woodway
    #             to eventually produce a point was a time-consuming tedious
    #             and inexact process as pencils became more ubiquitous in
    #             everyday life it became apparent that a faster'}

    json_content = json.dumps(real_content)

    return json_content

# if __name__ == '__main__':
#
#     voiceTotext('5gvnf-qo2uz.wav')
