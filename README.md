# Epe (Endpoint Exchange)

epe is a simple command line tool for interacting with an instance of the endpoint exchange. The goal is to provide a intuitive tool for consuming web services through a registry.

## Usage

```bash
epe [consume | bump | cache | provide | remove]
```

### consume
```bash
epe consume <name> [version] [-cv <consuming-version>] [-cn <consuming-name>]
```

Consume a web service named <name>. If a version it provided it will attempt to setup a contract with the specified version of the service, otherwise it will create a contract with the most recent supported version.

After setting up the new contract information about the contract, including the api key and active endpoints will be saved in your project's endpoints.json file.

By default epe will look at your package.json file to determine the version of your consuming application. If you do not have a package.json file as part of your application, or you want to manually provide a consuming name and version you can use the -cv (consuming version) and/or -cn (consuming name) args.

### cache
```bash
epe cache [-cn <consuming-name>] [-cv <consuming-version>]
```

Update the local cache of contracts and endpoints. These are for local reference only, the endpoints get resolved in real time by the lookup api, but these can be an extremely handy tool for local testing.

The api keys from the contracts will probably be the most useful thing to you, as you will need them for lookups.

By default epe will look at your package.json file to determine the version of your consuming application. If you do not have a package.json file as part of your application, or you want to manually provide a consuming name and version you can use the -cv (consuming version) and/or -cn (consuming name) args.

### remove
```bash
epe remove <name> <version>
```

Removes contracts with <version> of <name> web service. Version will accept semver version wildcards. For instance:

```bash
epe remove chat-service 1.x [-cn <consuming-name>] [-cv <consuming-version>]
```

would remove contracts with chat-service [1.0.0, 1.0.1, 1.0.2, 1.5.0] or any other version that starts with 1.

After the contract is removed it will update your endpoints.json file with a new cache.

### provide
```bash
epe provide [endpoint] [-pn <name>] [-pv <version>]
```

Adds the current version of your service as a provider in the endpoint exchange. This will allow consuming to begin creating contracts with your service.

By default epe will look at your package.json file to determine the version of your providing application. If you do not have a package.json file as part of your application, or you want to manually provide a consuming name and version you can use the -pv (provides version) and/or -pn (provides name) args.

### bump (bump-version)
```bash
epe <bump|bump-version> [major|minor|patch]
```

Increases the version of your current application by the specified type and then provides the new version. The default version bump type is 'patch' if nothing is defined.

Epe uses node's semver to determine its versioning. You can read the full documentation on the semver site, but here is a quick breakdown:

<major>.<minor>.<patch>

* Major - this is the first number of the version. Major versions should be increased when the new version is not backward compatible with earlier versions.
* Minor - this is the second number of the version. It should be increased when new non-breaking features are being added to the application.
* Patch - this is the third number of the version. It should be increased when the changes do not impact the interface, or usage, but have non-breaking changes to underlying implementation.

Examples:
```bash
#version 1.0.0
epe bump major # -> 2.0.0

#version 1.0.0
epe bump minor # -> 1.1.0

#version 1.0.0
epe bump patch # -> 1.0.1
```

Epe will look at your package.json file to determine the version of your providing application. If you do not have a package.json file bump will not do anything. Use provide instead, and specify the version to provide.
