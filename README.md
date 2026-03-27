# Smart Agriculture Intelligence Platform

This repository is a starter implementation for a six-module capstone project that helps farmers decide what to grow, when to irrigate, how to detect plant disease, when to sell, and how to ask questions in their local language from one unified dashboard.

## Modules

1. **Crop Recommendation Engine**: Uses soil chemistry to recommend the best crop candidate.
2. **Smart Irrigation & Weather Analysis**: Converts weather and soil conditions into irrigation advice.
3. **Visual Plant Disease Detection**: Accepts a leaf image and returns a likely disease plus remedies.
4. **Market Intelligence & Yield Forecasting**: Projects short-term crop prices and expected revenue.
5. **Multilingual AI Agri-Bot**: Answers farmer questions in English, Hindi, or Tamil with domain-aware responses.
6. **Unified Dashboard**: A single frontend that surfaces the outputs of all modules.

## Starter Stack

- **Backend**: Django
- **Frontend**: React + Vite
- **Model integration style**: Each AI module has its own Django app and service layer so the team can swap placeholder logic for trained models later.

## Repository Layout

```text
backend/
  manage.py
  agri_platform/
  core/
  crop/
  irrigation/
  disease/
  market/
  chatbot/
docs/
  system-architecture.md
frontend/
  src/
  package.json
```

## Quick Start

### Backend

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

Backend runs at `http://127.0.0.1:8000`.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at `http://127.0.0.1:5173`.

If PowerShell does not recognize `npm` right after installing Node.js, open a new terminal or run:

```powershell
powershell -ExecutionPolicy Bypass -File .\run-dev.ps1
```

## Module 1 Status

Module 1 now has a live frontend form and a Django API integration.

- If no trained model exists, the backend uses a rule-based fallback recommender.
- If you train a model artifact, the same endpoint automatically switches to the trained classifier.

### Train Module 1

1. Put your crop dataset at `backend/data/crop_recommendation.csv`
2. Ensure it includes these columns:
   `nitrogen`, `phosphorus`, `potassium`, `ph`, `temperature_c`, `rainfall_mm`, `label`
3. From the `backend` folder, run:

```bash
python manage.py train_crop_model --dataset data/crop_recommendation.csv
```

This saves the trained model to `backend/models/crop_recommender.joblib`.

### Test Module 1

1. Start Django with `python manage.py runserver`
2. Start the frontend with `npm run dev`
3. Open the dashboard and submit the soil form
4. Check whether the result shows `fallback` or `trained` mode

## Module 2 Status

Module 2 now has a live frontend form and a Django API integration.

- If no trained regressor exists, the backend uses a rule-based irrigation planner.
- If you train the regressor artifact, the same endpoint automatically switches to the trained model.
- If `OPENWEATHER_API_KEY` is configured on the backend, Module 2 can use OpenWeatherMap-assisted live weather inputs.

### Train Module 2

1. Put your irrigation dataset at `backend/data/irrigation_training.csv`
2. Ensure it includes these columns:
   `crop`, `growth_stage`, `soil_moisture_pct`, `rainfall_forecast_mm`, `temperature_c`, `humidity_pct`, `area_hectares`, `target_water_depth_mm`
3. From the `backend` folder, run:

```bash
python manage.py train_irrigation_model --dataset data/irrigation_training.csv
```

This saves the trained model to `backend/models/irrigation_regressor.joblib`.

### Configure Live Weather For Module 2

Set one of these environment variables before starting Django:

```powershell
$env:OPENWEATHER_API_KEY="your_api_key_here"
```

or

```powershell
$env:OPENWEATHERMAP_API_KEY="your_api_key_here"
```

### Test Module 2

1. Start Django with `python manage.py runserver`
2. Start the frontend with `npm run dev`
3. Open the dashboard and fill in the irrigation planner
4. Optionally enable live weather and provide a location
5. Check whether the result shows `fallback` or `trained` mode and whether weather came from `manual` or `live`

## Suggested Team Ownership

- **Member 1** owns `backend/crop/services.py`
- **Member 2** owns `backend/irrigation/services.py`
- **Member 3** owns `backend/disease/services.py`
- **Member 4** owns `backend/market/services.py`
- **Member 5** owns `backend/chatbot/services.py`
- **Member 6** owns the frontend plus final integration work

## Integration Plan

1. Replace the placeholder crop recommender with a trained DNN or TabNet model.
2. Connect irrigation planning to OpenWeatherMap and a trained regressor.
3. Swap the disease placeholder with a CNN inference pipeline using uploaded images.
4. Connect market forecasting to historical mandi or commodity price datasets and an LSTM or GRU model.
5. Replace the chatbot templates with a real RAG pipeline and multilingual LLM endpoint.
6. Add authentication, persistence, and farmer records in Django models.

## Current Scope

This starter is intentionally lightweight. The Django endpoints already model the integration contracts and return meaningful demo responses, while the frontend explains the workflow and system architecture in a form the team can extend.
