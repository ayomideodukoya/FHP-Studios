#!/bin/bash
set -e

# Run migrations
alembic upgrade head

# Start Uvicorn
uvicorn main:app --host 0.0.0.0 --port ${PORT:-10000}
