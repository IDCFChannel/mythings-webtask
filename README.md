# myThings x Hackey x webtask.ioのサンプル

## 使い方

ローカルでIDCF Channelに`HTTP POST /data`するNode.jsのプログラムを用意する。

```js
'use strict';

var request = require('request');

module.exports = function(ctx, cb) {
    request.post({
        url: 'http://' + ctx.data.host + '/data/' + ctx.data.uuid,
        headers: {
            'meshblu_auth_uuid': ctx.data.uuid,
            'meshblu_auth_token': ctx.data.token
        },
        form: {
            'time': new Date().toISOString()
        }
    }, function(err, response, body){
        cb(null, response);
    });
};
```

ローカルのファイルからcreateする場合。

```bash
$ wt create slack.js --name slack
```

GitHubのリポジトリからcreateする場合。

```bash
$ wt create https://raw.githubusercontent.com/IDCFChannel/mythings-webtask/master/slack.js --name slack
```

`wt create`コマンドで表示されるURLをローカルで手動実行してテストする。

```bash
$ curl "https://webtask.it.auth0.com/api/run/{container}/{name}?key={key}&host={url}&uuid={uuid}&token={token}&webtask_no_cache=1"
```

動作したらURLをHackeyのアクションに追加する。
