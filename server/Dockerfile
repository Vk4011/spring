# Stage 1: Build
FROM maven:3.9.9-openjdk-21 AS build
WORKDIR /app
COPY pom.xml .
# First copy only POM to download dependencies (cacheable layer)
RUN mvn dependency:go-offline
COPY src ./src
RUN mvn clean package -DskipTests

# Stage 2: Runtime
FROM openjdk:21-jdk-slim
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]