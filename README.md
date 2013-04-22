"Messenger.js"
--------

## usage

    // initialize
    var msgr = new Msgr();

    // メッセージに対して、関数を登録
    msgr.on("hoge", function() {
        // do anything     
    });

    // メッセージを送信。登録された関数が実行される。
    msgr.send("hoge");

    // 関数を登録して解除する
    var callback = function() {
            // do anything
        };

    msgr.on("hoge", callback);
    msgr.off("hoge", callback);

    // 登録されたリストを取得
    msgr.list("hoge");  // return Array
    // 全取得
    msgr.list();        // return Object

    // メッセージに対する関数を解除
    msgr.clear("hoge");

    // すべての関数を解除
    msgr.reset();


    // singleton
    var msgr_1 = new Msgr();
    var msgr_2 = new Msgr(); // === msgr_1 = true

    // インスタンス間をまたいでやり取りする
    msgr_1.on("hoge", function() {
        // do anything
    });

    msgr_2.send("hoge"); // msgr_1で登録した関数が実行される


## License

Messenger.js is licensed under the terms of the MIT License.
