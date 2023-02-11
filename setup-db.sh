#!/bin/bash

echo "Setting up database..."
yarn workspace @dashboard/api run migrate dev
echo "Done setting up database."

echo "Seeding database..."
yarn workspace @dashboard/api run seed
echo "Done seeding database."

echo "Generating prisma client..."
yarn workspace @dashboard/api run generate
echo "Done generating prisma client."