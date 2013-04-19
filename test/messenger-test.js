// プラグイン名変えたら色々と書きなおす必要がありますよっと
buster.testCase("tt.js test", {
    "setUp": function() {
        this.msgr = new Msgr();
    },
    "function test": {
        "constructor": function() {
            assert.isFunction(Msgr);
        },
        "method": function() {
            assert.isFunction(this.msgr.send);
            assert.isFunction(this.msgr.on);
            assert.isFunction(this.msgr.off);
            assert.isFunction(this.msgr.list);
            assert.isFunction(this.msgr.clear);
        }
    },
    "send on test": function() {
        var spy = sinon.spy();

        this.msgr.on("hoge", spy)
        this.msgr.send("hoge");
        assert.calledOnce(spy);
    },
    "send off test": function() {
        var spy = sinon.spy();

        this.msgr.on("hoge", spy);
        this.msgr.off("hoge", spy);
        this.msgr.send("hoge");
        refute.calledOnce(spy);
    },
    "list test": function() {
        var callbacks = {
                "hoge": function() {},
                "fuga": function() {},
                "piyo": function() {}};

        Object.keys(callbacks).forEach(function(name) {
            this.msgr.on(name, callbacks[name]);
        }, this);

        assert(this.msgr.list("hoge").indexOf(callbacks["hoge"]) > -1);
        assert(this.msgr.list("fuga").indexOf(callbacks["fuga"]) > -1);
        assert(this.msgr.list("piyo").indexOf(callbacks["piyo"]) > -1);

        var list = this.msgr.list();

        Object.keys(list).forEach(function(name) {
            assert(list[name].indexOf(callbacks[name]) > -1);
        });
    },
    "clear test": function() {
        this.msgr.on("hoge", function() {});
        this.msgr.on("hoge", function() {});
        this.msgr.on("hoge", function() {});

        this.msgr.clear("hoge");
        assert.equals(this.msgr.list("hoge").length, 0);
    }
});
