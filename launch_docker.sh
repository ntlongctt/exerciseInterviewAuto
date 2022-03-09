#!/usr/bin/env bash
USAGE="Usage: launch_playwright.sh <environment=(in the list below)>"

ENVIRONMENT=${1}

grep -w -q ${ENVIRONMENT} config/envList
checkEnv=$?
set -euo pipefail

if [[ ${checkEnv} -ne 0 ]] ; then
    echo $USAGE
    cat config/envList
    exit 1
fi

#remove all file in video folder of Playwright FW.
rm -rf playwright/results/videos/*

NODE_ENV="${NODE_ENV:-""}"

TEST_FILES="${TEST_FILES:-"playwright/features/**/*.feature"}"
PLAYWRIGHT_RETRIES=${PLAYWRIGHT_RETRIES:-2}
BROWSER="${BROWSER:-"Chrome"}"
PWVIDEO="${PWVIDEO:-1}"
CUCUMBER_PARALLEL=${CUCUMBER_PARALLEL:-0}


cat >playwright/results/reports/metaDataReportInfo.json <<EOF
    {
      "Test Environment": "$ENVIRONMENT",
      "Browser": "$BROWSER",
      "Headless": "true",
    }
EOF

docker run -v "$(pwd)"/playwright/results/screenshots:/app/playwright/results/screenshots -v "$(pwd)"/playwright/results/videos:/app/playwright/results/videos -v "$(pwd)"/playwright/results:/app/playwright/results --env BROWSER="${BROWSER}" --env TEST_FILES="$TEST_FILES" --env NODE_ENV="${NODE_ENV}" --env CUCUMBER_PARALLEL=${CUCUMBER_PARALLEL} taskworld/playwright ${ENVIRONMENT}
