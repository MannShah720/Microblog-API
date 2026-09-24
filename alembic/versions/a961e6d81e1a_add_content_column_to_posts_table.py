"""add content column to posts table

Revision ID: a961e6d81e1a
Revises: 0a0685f1a8f9
Create Date: 2026-09-24 22:25:31.825414

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'a961e6d81e1a'
down_revision: Union[str, Sequence[str], None] = '0a0685f1a8f9'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    op.add_column('posts', sa.Column('content', sa.String(), nullable=False))
    pass


def downgrade() -> None:
    """Downgrade schema."""
    p.drop_column('posts', 'content')
    pass
