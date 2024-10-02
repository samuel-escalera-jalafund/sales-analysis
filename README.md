# Sales analysis

## Getting Started

Follow these steps to set up and run the project on your local machine:

### Prerequisites
Make sure you have the following software installed in your development environment:

- Docker and Docker Compose
- Node.js and npm
- Prisma

### Project Configuration

1. Clone the repository:

```
git clone git@github.com:samuel-escalera-jalafund/sales-analysis.git
cd ales-analysis/
```
2. Start the Docker containers (Database):

The project uses PostgreSQL as a database, which you can run using Docker Compose. 
To raise the database container, run the following command:


```
docker-compose up -d
```

This will create and run the database in the background.

3. Configure Prisma:

Once the database is ready, run the Prisma migrations to create the necessary tables in the database:


```
npx prisma migrate dev --name init
```

Then, generate the Prisma client to be able to interact with the database from the code:


```
npx prisma generate
```

4. Run the Project:

Finally, it raises the development server with:


```
npm run dev
```

Now the project will be running at http://localhost:3000/.
