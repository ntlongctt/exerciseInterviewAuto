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

NODE_ENV="${NODE_ENV:-""}"

TEST_FILES="${TEST_FILES:-"playwright/features/**/*.feature"}"
PLAYWRIGHT_RETRIES=${PLAYWRIGHT_RETRIES:-2}
BROWSER="${BROWSER:-"Chrome"}"
PWVIDEO="${PWVIDEO:-1}"
HEADLESS="${HEADLESS:-""}"
CUCUMBER_PARALLEL=${CUCUMBER_PARALLEL:-0}


cat >playwright/results/reports/metaDataReportInfo.json <<EOF
    {
      "Test Environment": "$ENVIRONMENT",
      "Browser": "$BROWSER",
      "Headless": "$HEADLESS",
    }
EOF

  env PLAYWRIGHT_RETRIES="${PLAYWRIGHT_RETRIES}" ENVIRONMENT="${ENVIRONMENT}" PWVIDEO=${PWVIDEO} yarn playwright --retry ${PLAYWRIGHT_RETRIES} --parallel ${CUCUMBER_PARALLEL} ${TEST_FILES}

