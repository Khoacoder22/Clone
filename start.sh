#!/bin/sh
echo "Running database migrations..."
npx medusa db:migrate

echo "Seeding database..."
npx medusa seed || echo "Seeding failed, continuing..."

echo "Starting Medusa development server..."
yarn dev