FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["DigitecToolWeb.Server/DigitecToolWeb.Server.csproj", "DigitecToolWeb.Server/"]
RUN dotnet restore "DigitecToolWeb.Server/DigitecToolWeb.Server.csproj"
COPY . .
WORKDIR "/src/DigitecToolWeb.Server"
RUN dotnet build "DigitecToolWeb.Server.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "DigitecToolWeb.Server.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "DigitecToolWeb.Server.dll"]
