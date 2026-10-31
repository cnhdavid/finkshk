FROM node:26-bookworm-slim AS node

FROM mcr.microsoft.com/dotnet/sdk:10.0

COPY --from=node /usr/local/bin/node /usr/local/bin/node
COPY --from=node /usr/local/lib/node_modules /usr/local/lib/node_modules

RUN ln -s ../lib/node_modules/npm/bin/npm-cli.js /usr/local/bin/npm \
  && ln -s ../lib/node_modules/npm/bin/npx-cli.js /usr/local/bin/npx \
  && apt-get update \
  && apt-get install -y --no-install-recommends ca-certificates curl git \
  && curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg -o /usr/share/keyrings/githubcli-archive-keyring.gpg \
  && echo "deb [signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" > /etc/apt/sources.list.d/github-cli.list \
  && apt-get update \
  && apt-get install -y --no-install-recommends gh \
  && rm -rf /var/lib/apt/lists/*

RUN npm install -g @anthropic-ai/claude-code \
  && dotnet tool install dotnet-ef --tool-path /usr/local/share/dotnet-tools --version 10.0.14 \
  && ln -s /usr/local/share/dotnet-tools/dotnet-ef /usr/local/bin/dotnet-ef

RUN useradd --create-home --shell /bin/bash vscode \
  && mkdir -p /workspace/web/node_modules /home/vscode/.nuget \
  && chown -R vscode:vscode /workspace /home/vscode

USER vscode
