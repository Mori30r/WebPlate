FROM python:3.10.12

WORKDIR /app

COPY ./requirements.txt /app/

RUN pip install --no-cache-dir -r requirements.txt

COPY . /app/

EXPOSE 8000

CMD [ "gunicorn", "--bind", "0.0.0.0:8000", "mealdelivery.wsgi:application", "--log-level=DEBUG", "--access-logfile", "gunicorn.log", "--access-logformat", "%(h)s %(l)s %(u)s %(t)s \"%(r)s\" %(s)s %(b)s \"%(f)s\" \"%(a)s\"", "--timeout", "60" ]
