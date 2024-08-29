# Dockerfile in the root of your backend

# Use the official Maven image as the base image
FROM maven:3.8.5-openjdk-17-slim as builder

# Set the working directory inside the container
WORKDIR /app

# Copy the pom.xml and download dependencies
COPY pom.xml ./
RUN mvn dependency:go-offline -B

# Copy the rest of the backend code
COPY . .

# Package the application
RUN mvn clean package -DskipTests

# Use a slim JDK runtime image for the final build
FROM openjdk:17-jdk-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the jar from the builder stage
COPY --from=builder /app/target/*.jar app.jar

# Expose the port your Spring Boot app runs on
EXPOSE 9090

# Run the application
CMD ["java", "-jar", "app.jar"]
