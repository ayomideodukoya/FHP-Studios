from database import engine, Base
import models_initial

# Recreate the initial DB schema
Base.metadata.create_all(bind=engine)
