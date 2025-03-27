# Use an official OpenJDK runtime as a parent image
FROM eclipse-temurin:21-jdk

# Set the working directory inside the container
WORKDIR /app

# Copy the built JAR file into the container
COPY target/server-0.0.1-SNAPSHOT.jar app.jar

# Expose the application port
EXPOSE 9090

# Run the Spring Boot application
ENTRYPOINT ["java", "-jar", "app.jar"]
