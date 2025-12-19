# Database Setup

## Schema

The database uses PostgreSQL with the following tables:

- `users` - Stores Telegram user information
- `bookings` - Stores bus booking reservations
- `search_history` - Tracks user search queries for analytics

## Setup

1. Create a PostgreSQL database:
```bash
createdb tikat_tikat
```

2. Run the schema:
```bash
psql -d tikat_tikat -f schema.sql
```

Or run migrations:
```bash
psql -d tikat_tikat -f migrations/001_initial_schema.sql
```

## Environment Variables

Set `DATABASE_URL` in your `.env` file:
```
DATABASE_URL=postgresql://user:password@localhost:5432/tikat_tikat
```

