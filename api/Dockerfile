FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src
COPY global.json Directory.Build.props ./
COPY Fink.Api/Fink.Api.csproj Fink.Api/
COPY Fink.Domain/Fink.Domain.csproj Fink.Domain/
COPY Fink.Infrastructure/Fink.Infrastructure.csproj Fink.Infrastructure/
RUN dotnet restore Fink.Api/Fink.Api.csproj
COPY Fink.Api/ Fink.Api/
COPY Fink.Domain/ Fink.Domain/
COPY Fink.Infrastructure/ Fink.Infrastructure/
RUN dotnet publish Fink.Api/Fink.Api.csproj -c Release -o /app/publish --no-restore

FROM mcr.microsoft.com/dotnet/aspnet:10.0-alpine AS runtime
WORKDIR /app
COPY --from=build /app/publish ./
RUN mkdir -p /data/uploads && chown -R "$APP_UID" /data/uploads
USER $APP_UID
EXPOSE 8080
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD ["wget", "-q", "-O", "/dev/null", "http://127.0.0.1:8080/health"]
ENTRYPOINT ["dotnet", "Fink.Api.dll"]
