from django.shortcuts import render, redirect
from django.http import JsonResponse
from django.contrib import messages
from .forms import ContactForm
from .models import Contact

def home(request):
    """Main portfolio page view"""
    form = ContactForm()
    
    if request.method == 'POST':
        form = ContactForm(request.POST)
        if form.is_valid():
            form.save()
            if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
                return JsonResponse({
                    'success': True,
                    'message': 'Thank you for your message! I will get back to you soon.'
                })
            messages.success(request, 'Thank you for your message! I will get back to you soon.')
            return redirect('home')
        else:
            if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
                return JsonResponse({
                    'success': False,
                    'errors': form.errors
                }, status=400)
    
    context = {
        'form': form,
    }
    return render(request, 'home.html', context)
