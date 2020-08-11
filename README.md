### Setup

install dynamodb local .jar files

```
$ sls dynamodb install
```

### Install

```
$ yarn install
```

### Development

```
$ sls offline start
```

### issue

```
$ pgrep -f "DynamoDBLocal.jar" | xargs kill
```
