FROM node:14
FROM mcr.microsoft.com/playwright:focal
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY . .
RUN yarn
RUN yarn build
ENV HEADLESS=true
ENTRYPOINT ["./launch_playwright.sh"]
