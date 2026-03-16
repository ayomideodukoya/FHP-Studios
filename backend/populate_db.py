import sys
import os

# Add the parent directory to the Python path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from database import SessionLocal, engine
import models
import datetime

def init_db():
    print("Creating tables...")
    models.Base.metadata.create_all(bind=engine)

    print("Adding sample events...")
    db = SessionLocal()

    # Check if events already exist
    existing_events = db.query(models.Event).first()
    if existing_events:
        print("Events already exist. Skipping population.")
        db.close()
        return

    now = datetime.datetime.now()

    events = [
        models.Event(
            title="StoryTime With StoryTide",
            description="Join us for an immersive live storytelling experience where creatives share their journeys, failures, and triumphs. Open mic available after main speakers.",
            date_time=now + datetime.timedelta(days=14, hours=18), # 14 days from now at 6 PM
            location="FHP Studios, Plot 32 Oba Ogunji Road, Ogba, Lagos",
            image_url="https://images.unsplash.com/photo-1544531586-fde5298cdd40?q=80&w=800&auto=format&fit=crop"
        ),
        models.Event(
            title="Thoroughly Equipped",
            description="A spoken word and poetry night designed to inspire and provoke thought. Come witness words come alive in a space built for connection.",
            date_time=now + datetime.timedelta(days=21, hours=19),
            location="FHP Studios, Plot 32 Oba Ogunji Road, Ogba, Lagos",
            image_url="https://images.unsplash.com/photo-1525926477800-7a3cefaeeeae?q=80&w=800&auto=format&fit=crop"
        ),
        models.Event(
            title="Creative Entrepreneurship Panel",
            description="Learn how to turn your creative passion into a sustainable business. Featuring local successful founders from Lagos.",
            date_time=now + datetime.timedelta(days=30, hours=10),
            location="FHP Studios, Plot 32 Oba Ogunji Road, Ogba, Lagos",
            image_url="https://images.unsplash.com/photo-1515169067868-5387ec356754?q=80&w=800&auto=format&fit=crop"
        ),
        models.Event(
            title="Community Movie Marathon",
            description="A relaxed evening connecting with fellow creatives over classic indie films and popcorn.",
            date_time=now + datetime.timedelta(days=7, hours=17),
            location="FHP Studios, Plot 32 Oba Ogunji Road, Ogba, Lagos",
            image_url="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=800&auto=format&fit=crop"
        )
    ]

    for event in events:
        db.add(event)

    db.commit()
    print("Sample events successfully added!")
    db.close()

if __name__ == "__main__":
    init_db()
