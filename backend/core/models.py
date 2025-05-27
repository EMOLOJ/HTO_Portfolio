from django.db import models

# Create your models here.

class ResearchArea(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Research Area'
        verbose_name_plural = 'Research Areas'

class Publication(models.Model):
    title = models.CharField(max_length=200)
    abstract = models.TextField()
    year = models.PositiveIntegerField()
    authors = models.TextField(help_text="List of authors, separated by commas")
    pdf_url = models.URLField(blank=True, null=True, help_text="URL to the PDF file")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.title} ({self.year})"

    class Meta:
        ordering = ['-year', '-created_at']
        verbose_name = 'Publication'
        verbose_name_plural = 'Publications'

class Award(models.Model):
    name = models.CharField(max_length=200)
    year = models.PositiveIntegerField()
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name} ({self.year})"

    class Meta:
        ordering = ['-year', '-created_at']
        verbose_name = 'Award'
        verbose_name_plural = 'Awards'

class Teaching(models.Model):
    SEMESTER_CHOICES = [
        ('FALL', 'Fall'),
        ('SPRING', 'Spring'),
        ('SUMMER', 'Summer'),
    ]

    course_name = models.CharField(max_length=200)
    semester = models.CharField(max_length=6, choices=SEMESTER_CHOICES)
    year = models.PositiveIntegerField()
    notes = models.TextField(blank=True, help_text="Additional information about the course")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.course_name} ({self.semester} {self.year})"

    class Meta:
        ordering = ['-year', 'semester']
        verbose_name = 'Teaching'
        verbose_name_plural = 'Teaching'

class Experience(models.Model):
    company = models.CharField(max_length=200)
    position = models.CharField(max_length=200)
    start_date = models.DateField()
    end_date = models.DateField(null=True, blank=True, help_text="Leave empty if this is your current position")
    description = models.TextField()
    location = models.CharField(max_length=200)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.position} at {self.company}"

    class Meta:
        ordering = ['-start_date']
        verbose_name = 'Experience'
        verbose_name_plural = 'Experience'
