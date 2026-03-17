"""add new booking form fields

Revision ID: b63d66635f79
Revises: f1b6ab4a35ef
Create Date: 2026-03-17 11:04:24.279857

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'b63d66635f79'
down_revision: Union[str, Sequence[str], None] = 'f1b6ab4a35ef'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # Use batch_alter_table for SQLite compatibility when altering tables
    with op.batch_alter_table('bookings', schema=None) as batch_op:
        batch_op.add_column(sa.Column('brand_name', sa.String(length=100), nullable=True))
        batch_op.add_column(sa.Column('guest_size', sa.String(length=50), nullable=True))
        batch_op.add_column(sa.Column('duration', sa.String(length=50), nullable=True))
        batch_op.add_column(sa.Column('addons', sa.Text(), nullable=True))
        batch_op.add_column(sa.Column('external_vendors', sa.Boolean(), nullable=True))
        batch_op.add_column(sa.Column('vision_notes', sa.Text(), nullable=True))
        batch_op.add_column(sa.Column('attribution', sa.String(length=100), nullable=True))

    # After adding nullable columns, we would typically update them to be NOT NULL if they are required.
    # However, for an existing database with existing rows, it's safer to keep them nullable
    # or provide default values. We'll leave them as nullable to match the migration.


def downgrade() -> None:
    with op.batch_alter_table('bookings', schema=None) as batch_op:
        batch_op.drop_column('attribution')
        batch_op.drop_column('vision_notes')
        batch_op.drop_column('external_vendors')
        batch_op.drop_column('addons')
        batch_op.drop_column('duration')
        batch_op.drop_column('guest_size')
        batch_op.drop_column('brand_name')
