# Stage 1: Build the application
FROM maven:3.9.6-eclipse-temurin-21 AS builder
WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests

# Stage 2: Minimal runtime environment
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

# Copy only the built JAR
COPY --from=builder /app/target/shortener-backend-0.0.1-SNAPSHOT.jar app.jar

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
