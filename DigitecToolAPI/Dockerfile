FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
USER app
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["DigitecToolAPI/DigitecToolAPI.csproj", "DigitecToolAPI/"]
RUN dotnet restore "DigitecToolAPI/DigitecToolAPI.csproj"
COPY . .
WORKDIR "/src/DigitecToolAPI"
RUN dotnet build "DigitecToolAPI.csproj" -c $BUILD_CONFIGURATION -o /app/build
FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "DigitecToolAPI.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "DigitecToolAPI.dll"]