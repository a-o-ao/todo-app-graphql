# バックエンド

## ローカル環境構築

```shell
# backendディレクトリで実施
cd backend
npm install
npm start
```

以下のURLで起動する<br>
http://localhost:3000/


## データベース起動
```shell
# ルートディレクトリで実施
docker-compose up -d db
```

## テスト実行

### unit
```shell
# backendディレクトリで実施
npm run test
```

### e2e
```shell
# backendディレクトリで実施
npm run test:e2e
```

## ビルド
```shell
# backendディレクトリで実施
npm run build
```
