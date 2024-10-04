#!/bin/bash

echo "----------------- Running database migrations -----------------"

RETRY_COUNT=0
MAX_RETRIES=1

while [ $RETRY_COUNT -le $MAX_RETRIES ]; do
    python manage.py migrate
    MIGRATION_STATUS=$?

    if [ $MIGRATION_STATUS -eq 0 ]; then
        echo "----------------- Migrations Succeeded -----------------"
        break
    else
        echo "Migration failed. Attempting retry $RETRY_COUNT of $MAX_RETRIES."
        RETRY_COUNT=$((RETRY_COUNT+1))
    fi

    if [ $RETRY_COUNT -gt $MAX_RETRIES ]; then
        echo "Migration failed after retries, exiting."
        exit 1
    fi

    # Optional: wait a bit before retrying
    sleep 5
done

echo "----------------- Continuing with Application Startup -----------------"
gunicorn mealdelivery.wsgi:application --log-level=DEBUG --access-logfile gunicorn.log --access-logformat '%(h)s %(l)s %(u)s %(t)s \"%(r)s\" %(s)s %(b)s \"%(f)s\" \"%(a)s\"' --timeout 60 --bind 0.0.0.0:8000
