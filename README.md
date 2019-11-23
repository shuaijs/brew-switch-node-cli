# brew-switch-node-cli

Switch node version via brew installed list

nrm -- NPM registry manager
===

[![NPM version][npm-image]][npm-url]

`nrm` can help you easy and fast switch between different npm registries,
now include: `npm`, `cnpm`, `taobao`, `nj(nodejitsu)`.

## How to configure yarn to use private registry ?
just add .yarnrc in your project’s directory and write there:
`registry “http://your.registry”`

Or you can configure it in your HOME directory's .yarnrc


## Install

```
$ npm install -g nrm
```

## Example
```
$ nrm ls

* npm -----  https://registry.npmjs.org/
  yarn ----- https://registry.yarnpkg.com
  cnpm ----  http://r.cnpmjs.org/
  taobao --  https://registry.npm.taobao.org/
  nj ------  https://registry.nodejitsu.com/
  skimdb -- https://skimdb.npmjs.com/registry

```

```
$ nrm use cnpm  //switch registry to cnpm

    Registry has been set to: http://r.cnpmjs.org/

```

## Usage

```
Usage: nrm [options] [command]

  Commands:

    ls                                    List all the registries
    current                               Show current registry name
    use <registry>                        Change registry to registry
    add <registry> <url> [home]           Add one custom registry
    login <registry> [value]              Set authorize information for a registry with a base64 encoded string or username and pasword
      -a  --always-auth                     Set is always auth
      -u  --username <username>             Your user name for this registry
      -p  --password <password>             Your password for this registry
      -e  --email <email>                   Your email for this registry
    set-hosted-repo <registry> <value>    Set hosted npm repository for a custom registry to publish packages
    del <registry>                        Delete one custom registry
    home <registry> [browser]             Open the homepage of registry with optional browser
    test [registry]                       Show the response time for one or all registries
    publish [<tarball>|<folder>]          Publish package to current registry if current registry is a custom registry.  if you\'re not using custom registry, this command will run npm publish directly
      -t --tag [tag]                        Add tag
      -a --access <public|restricted>       Set access
      -o --otp [otpcode]                    Set otpcode
      -dr --dry-run                         Set is dry run
    help                                  Print this help

  Options:

    -h, --help     output usage information
    -V, --version  output the version number
```

## LICENSE
MIT