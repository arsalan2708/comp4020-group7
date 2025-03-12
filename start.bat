@echo off

@echo off

:: Step 1: Create virtual environment if not exists
if not exist env (
    python -m venv env
    echo Virtual environment created.
)

:: Step 2: Activate virtual environment
call env\Scripts\activate
echo Virtual environment activated.

:: Step 3: Install requirements
if exist requirements.txt (
    pip install -r requirements.txt
    echo Requirements installed.
) else (
    echo No requirements.txt found.
)


:: Step 4: Run the Flask app
python back-end\flask\app.py

pause