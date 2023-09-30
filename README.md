[![Production Deployment](https://github.com/DRincs-Productions/drincs-website/actions/workflows/firebase.yml/badge.svg)](https://github.com/DRincs-Productions/drincs-website/actions/workflows/firebase.yml)

# Fast editor with GitHub Codespaces 
wiki: https://docs.github.com/en/codespaces/getting-started/quickstart

# Install Node in WLS2
More Info: https://learn.microsoft.com/it-it/windows/dev-environment/javascript/nodejs-on-wsl

```shell
sudo apt install curl
curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash
```
```shell
restart `wsl --shutdown`
```
```shell
command -v nvm
nvm ls
nvm install node
nvm ls
node -v
npm i
```

# Deploy
```shell
npm start
```

after F5

# Interface
The interface was developed with [MUI](https://mui.com/components/).
