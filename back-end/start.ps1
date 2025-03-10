Write-Host "Activating virtual environment..."
.\env\Scripts\activate
Write-Host "Virtual environment activated."
Read-Host "Press Enter to continue..."

Write-Host "Starting Flask application..."
python flask/app.py
Read-Host "Press Enter to continue..."

deactivate