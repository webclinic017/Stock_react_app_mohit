from celery.schedules import crontab
from datetime import timedelta

CELERY_BEAT_SCHEDULE = {
    'get_token': {
        'task': 'app.tasks.get_token_task',
        # 'schedule': crontab(),
        # 'schedule': crontab(minute=2),
        # 'schedule': timedelta(seconds=200),
        # 'schedule': timedelta(minutes=1),
        'schedule': timedelta(hours=4),
    }
}
