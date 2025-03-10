# Stage 1: Build the application
FROM maven:3.9.6-eclipse-temurin-21 AS builder
WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests

# Stage 2: Minimal runtime environment
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

# Install dependencies (optional, but useful for some cases)
RUN apk add --no-cache tzdata

# Copy only the built JAR
COPY --from=builder /app/target/shortener-backend-0.0.1-SNAPSHOT.jar app.jar

# Copy the .env file
COPY .env .env

# Expose the application's port
EXPOSE 8080

# Run the application, ensuring environment variables are passed
ENTRYPOINT ["java", "-jar", "app.jar"]
