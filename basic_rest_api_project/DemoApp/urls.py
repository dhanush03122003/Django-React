from django.urls import path
from DemoApp.views import api_get , api_delete , api_add , api_update , api_get_task_by_id
urlpatterns = [
    path('tasks/',api_get),
    path('task/delete/<int:pk>',api_delete),
    path('task/create' ,  api_add),
    path('task/update/<int:pk>' , api_update),
    path('task/<int:pk>' , api_get_task_by_id),


]