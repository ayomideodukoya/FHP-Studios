FROM python:3.12-slim

ENV PYTHONUNBUFFERED=1
ENV PYTHONDONTWRITEBYTECODE=1

WORKDIR /app

RUN apt-get update \
    && apt-get install -y --no-install-recommends gcc libpq-dev \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY alembic.ini .
COPY .env .
COPY alembic alembic
COPY app app

ENV PORT=10000

CMD ["sh", "-c", "PYTHONPATH=. python app/pre_start.py && uvicorn app.main:app --host 0.0.0.0 --port $PORT"]
