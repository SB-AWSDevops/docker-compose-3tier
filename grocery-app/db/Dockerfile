# Use official PostgreSQL image
FROM postgres:15

# # Use environment variables from .env (Docker will load them automatically)
# ENV POSTGRES_USER=$POSTGRES_USER
# ENV POSTGRES_PASSWORD=$POSTGRES_PASSWORD
# ENV POSTGRES_DB=$POSTGRES_DB

# Use a volume to persist database data
VOLUME [ "/var/lib/postgresql/data" ]

# Expose PostgreSQL port
EXPOSE 5432