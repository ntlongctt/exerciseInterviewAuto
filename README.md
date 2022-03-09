
I create a file to contain the exercise 2:
```
playwright/exercise/copyProject.feature
```

Please navigate to this feature file to review the exercise 2


For exercise 1, I create this automation framework with 'Playwright'


Should use the VSCode to open the framework, there is a setting for cucumber format
Please install the plugin:
```
Cucumber (Gherkin) Full Support
```

How to run the code

1. Install Node js
2. Install Yarn (optional)
3. Run the command to install package:
```
  yarn
```
If you do not install yarn, you can use npm to install package
```
  npm install
```

4. Run a command to create the folder artifacts.
In this folder, we will execute some script to generate a bootstrap report (with some chart and the log is more detail)

```
yarn build
```

5. Run the command:
```
./launch_playwright.sh staging.taskworld
```
This comment to execute the bash script 'launch_playwright.sh'. Because this is a bash script, you need to run on Linux env (Ex: MacOS)

6. If you want to run on Windows, you should run this command:
```
yarn cucumber-js playwright/features/**/*.feature
```

- Or you can install the Linux env simulator on cmd to run the bash script 'launch_playwright.sh'
- I recommend that you should use Linux env to run the bash script, because this bash script has a lot of configuration to modify the run, like changing the environment if needed.

7. Run the command to generate new report html:

```
yarn createBddHtmlReport
```

Run on Docker:

1. Install Docker

2. Build a docker image. Using the command as below:

```
docker build . -t taskworld/playwright
```

3. Run the command:

```
./launch_docker.sh staging.taskworld
```
