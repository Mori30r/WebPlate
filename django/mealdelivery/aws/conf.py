# S3 Bucket
import os

AWS_S3_ENDPOINT_URL = "https://" + "storage.iran.liara.space"
AWS_STORAGE_BUCKET_NAME = "web-plate"

AWS_ACCESS_KEY_ID = os.getenv("AWS_ACCESS_KEY_ID")
AWS_SECRET_ACCESS_KEY =  os.getenv("AWS_SECRET_ACCESS_KEY")
AWS_S3_OBJECT_PARAMETERS = {
    "CacheControl": "max-age=86400",
}
AWS_LOCATION = "static"
DEFAULT_FILE_STORAGE = "mealdelivery.aws.utils.MediaRootS3BotoStorage"
STATICFILES_STORAGE = "mealdelivery.aws.utils.StaticRootS3BotoStorage"



STATIC_URL = "/static/"

MEDIA_URL = "/media/"
